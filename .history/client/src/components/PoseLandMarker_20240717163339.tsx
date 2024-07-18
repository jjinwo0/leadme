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

  useEffect(() => {
    const initializePoseLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
          delegate: "GPU",
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
      console.log("Wait! poseLandmaker not loaded yet.");
      return;
    }

    setWebcamRunning((prev) => !prev);

    if (!webcamRunning) {
      const constraints = { video: { frameRate: { ideal: 60, max: 60 } } }; // 15fps로 설정
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
        drawingUtils.drawLandmarks(landmark, {
          radius: (data: any) =>
            DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
        });
        drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
      }
      canvasCtx.restore();
    };

    if (webcamRunning) {
      const id = setInterval(detectAndDraw, 1000 / 30); // 15fps
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

  return (
    <div>
      <button onClick={enableCam}>
        {webcamRunning ? "Disable" : "Enable"} Webcam
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
    </div>
  );
};

export default PoseLandmarkerComponent;
