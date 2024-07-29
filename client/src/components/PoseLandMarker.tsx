import React, { useEffect, useRef, useState } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

import axios, { AxiosRequestConfig } from "axios";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
    player: any;
  }
}

const PoseLandmarkerComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const [poseLandmarker, setPoseLandmarker] = useState<any>(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [landmarkData, setLandmarkData] = useState<any[]>([]);
  const [videoName, setVideoName] = useState<string>("");

  // 유튜브 api 를 활용해 포즈 추출
  const youtubeRef = useRef<HTMLIFrameElement | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const detectionIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // 내 모습 추적하는 블레이즈 포즈 모델
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

  // ====================================================

  interface Keypoint {
    x: number;
    y: number;
    z: number;
    visibility: number;
  }

  interface ApiResponse {
    url: string;
    keypoints: Keypoint[][];
  }

  const client = axios.create({
    baseURL: "http://127.0.0.1:8080",
  });

  const connections = [
    [11, 12], // left shoulder to right shoulder
    [11, 13], // left shoulder to left elbow
    [13, 15], // left elbow to left writs

    [12, 14], // right shoulder to right elbow
    [14, 16], // right elbow to right writs

    [11, 23], // left shoulder to left hip
    [12, 24], // right shoulder to right hip
    [23, 24], // left hip to right hip

    [23, 24], // left hip to right hip
    [23, 25], // left hip to left knee
    [25, 27], // left knee to left ankle
    [24, 26], // right hip to right knee
    [26, 28], // right knee to right ankle

    [27, 29], // left ankle to left heel
    [29, 31], // left heel to left foot index
    [27, 31],

    [28, 30], // right ankle to rihgt heel
    [30, 32], // right heel to right foot index
    [28, 32],
  ];

  const getData = async (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse> => {
    try {
      const response = await client.get<ApiResponse>(url, config);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const playGuideLine = () => {
    const fetchData = async () => {
      const videoName = "1";
      const url = `/api/v1/landmarks/${videoName}`;
      const config: AxiosRequestConfig = {};

      try {
        const apiResponse = await getData(url, config);
        console.log(apiResponse);
        let lastTime = 0;

        const canvas = drawCanvasRef.current;
        const context = canvas?.getContext("2d");
        const keypoints = apiResponse.landmarks;

        let frameIndex = 0;

        // keypoints를 Canvas에 그리는 함수
        const drawKeypoints = (keypoints: Keypoint[]) => {
          if (!context) return;

          context.clearRect(0, 0, canvas.width, canvas.height);

          context.fillStyle = "red";
          keypoints.forEach((point) => {
            const x = point.x * canvas.width;
            const y = point.y * canvas.height;

            context.beginPath();
            context.arc(x, y, 5, 0, 2 * Math.PI);
            context.fill();
          });

          // keypoints를 선으로 연결합니다.
          context.strokeStyle = "blue";
          context.lineWidth = 2;
          connections.forEach(([startIdx, endIdx]) => {
            const startPoint = keypoints[startIdx];
            const endPoint = keypoints[endIdx];

            context.beginPath();
            context.moveTo(
              startPoint.x * canvas.width,
              startPoint.y * canvas.height
            );
            context.lineTo(
              endPoint.x * canvas.width,
              endPoint.y * canvas.height
            );
            context.stroke();
          });
        };

        // 애니메이션 함수
        const animate = (time: number) => {
          if (!lastTime) {
            lastTime = time;
          }

          const timeSinceLastFrame = time - lastTime;

          if (timeSinceLastFrame >= 1000 / 30) {
            // 1초에 30프레임
            console.log(frameIndex);
            drawKeypoints(keypoints[frameIndex]); // 현재 프레임의 keypoints를 그립니다.
            frameIndex = (frameIndex + 1) % keypoints.length; // 다음 프레임으로 이동 (loop)
            lastTime = time;
          }

          requestAnimationFrame(animate); // 다음 프레임을 요청합니다.
        };

        requestAnimationFrame(animate); // 애니메이션 시작
      } catch (err) {
        console.log("Error fetching data");
      } finally {
        console.log("Loading completed");
      }
    };

    fetchData();
  };
  ///////////////////////////////

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

      <button onClick={playGuideLine}> 재생 </button>

      <hr></hr>

      <canvas
        ref={drawCanvasRef}
        width={640}
        height={480}
        style={{ position: "absolute", left: 0, top: 0 }}
      />
    </div>
  );
};

export default PoseLandmarkerComponent;
