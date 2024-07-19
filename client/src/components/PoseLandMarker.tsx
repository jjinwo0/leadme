import React, { useEffect, useRef, useState } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

const PoseLandmarkerComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [poseLandmarker, setPoseLandmarker] = useState<any>(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [landmarkData, setLandmarkData] = useState<any[]>([]);
  const [videoName, setVideoName] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    const initializePoseLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task",
          delegate: "CPU",
        },
        runningMode: "VIDEO",
        numPoses: 2,
      });
      setPoseLandmarker(poseLandmarker);
    };

    initializePoseLandmarker();
  }, []);

  const enableCam = async () => {
    if (!poseLandmarker) {
      console.log("Wait! poseLandmarker not loaded yet.");
      return;
    }

    setWebcamRunning((prev) => !prev);

    if (!webcamRunning) {
      const constraints = { video: { frameRate: { ideal: 30, max: 30 } } }; // 30fps로 설정
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      if (videoRef.current) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  };

  const sendDataToBackend = async () => {
    console.log(landmarkData);
    try {
      const response = await fetch("http://localhost:8080/api/v1/landmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoName, landmarks: landmarkData }),
      });
      if (response.ok) {
        console.log("Data sent successfully");
      } else {
        console.error("Failed to send data");
      }
    } catch (error) {
      console.error("Error sending data", error);
    }
  };

  const predictWebcam = () => {
    if (!poseLandmarker || !videoRef.current || !canvasRef.current) return;

    const canvasCtx = canvasRef.current.getContext("2d");
    if (!canvasCtx) return;

    const drawingUtils = new DrawingUtils(canvasCtx);

    const detectAndDraw = async () => {
      const startTimeMs = performance.now();
      const results = await poseLandmarker.detectForVideo(
        videoRef.current,
        startTimeMs
      );
      canvasCtx.save();
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
      // 캔버스 좌우 반전
      canvasCtx.scale(-1, 1);
      canvasCtx.translate(-canvasRef.current!.width, 0);

      for (const landmark of results.landmarks) {
        const visibleLandmarks = landmark.map((point: any) => {
          if (point.x >= 0 && point.x <= 1 && point.y >= 0 && point.y <= 1) {
            return point;
          } else {
            return null;
          }
        });

        // 유효한 랜드마크 데이터를 수집
        setLandmarkData((prevData) => [...prevData, visibleLandmarks]);

        drawingUtils.drawLandmarks(
          visibleLandmarks.filter((lm) => lm !== null),
          {
            radius: (data: any) =>
              DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
          }
        );
        drawingUtils.drawConnectors(
          visibleLandmarks.filter((lm) => lm !== null),
          PoseLandmarker.POSE_CONNECTIONS
        );
      }

      canvasCtx.restore();
    };

    if (webcamRunning) {
      const id = setInterval(detectAndDraw, 1000 / 30); // 30fps
      setIntervalId(id);
    }
  };

  useEffect(() => {
    if (webcamRunning && videoRef.current) {
      videoRef.current.addEventListener("loadeddata", predictWebcam);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadeddata", predictWebcam);
      }
    };
  }, [webcamRunning]);

  const extractVideoId = (url: string): string | null => {
    const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([^\?&\/]+)/;
    const match = url.match(pattern);
    return match ? match[1] : null;
  };

  const playYoutube = () => {
    const id = extractVideoId(youtubeUrl);
    if (id) {
      setVideoId(id);
    } else {
      alert('유효한 유튜브 URL을 입력하세요.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="비디오 제목을 입력하세요"
        value={videoName}
        onChange={(e) => setVideoName(e.target.value)}
      />
      <button onClick={enableCam}>
        {webcamRunning ? "종료하기" : "연습하기"}
      </button>
      <button onClick={sendDataToBackend}>
        백엔드로 저장된 키포인트 배열 전송하기
      </button>
      <div style={{ position: "relative" }}>
        <video
          ref={videoRef}
          style={{ width: "640px", height: "480px", transform: "scaleX(-1)" }}
          autoPlay
          playsInline
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={{ position: "absolute", left: 0, top: 0 }}
        />
      </div>


      <input type="text" placeholder="유튜브 URL을 입력하세요" value={youtubeUrl}
      onChange={(e) => setYoutubeUrl(e.target.value)}></input>

      <button onClick={playYoutube}>유트브 영상 조회</button>
      
      {videoId && (
          <div className="video-container">
            <iframe
              width="360"
              height="640"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-iframe"
            ></iframe>
          </div>
        )}


    </div>
  );
};

export default PoseLandmarkerComponent;
