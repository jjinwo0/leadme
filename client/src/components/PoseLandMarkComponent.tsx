import React, { useRef, useEffect, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs';

const PoseLandMarkerComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        async function initBlazePose() {
            await tf.ready();
            await tf.setBackend('webgl');
            const detector = await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, {
                runtime: 'tfjs',
                modelType: 'full'
            });
            setDetector(detector);
        }
        initBlazePose();
    }, []);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            if (videoRef.current) {
                videoRef.current.src = url;
                videoRef.current.load();
                videoRef.current.play();
            }
        }
    };

    const extractKeypoints = async () => {
        if (isProcessing || !videoRef.current || !detector || !canvasRef.current){
            console.log("videoRef.current = " + videoRef.current);
            console.log("detector = " + detector);
            console.log("canvasRef.current = " + canvasRef.current);
            return;
        }

        setIsProcessing(true);
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        

        if (!context) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const processFrame = async () => {
            if (!videoRef.current || videoRef.current.paused || videoRef.current.ended) {
                setIsProcessing(false);
                return;
            }

            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const poses = await detector.estimatePoses(canvas);
            console.log(poses);
            
            if (poses.length > 0) {
                console.log(poses[0].keypoints);  // 콘솔에 키포인트 출력
                drawSkeleton(context, poses[0].keypoints);
            }

            requestAnimationFrame(processFrame);
        };

        processFrame();
    };

    const drawSkeleton = (context: CanvasRenderingContext2D, keypoints: poseDetection.Keypoint[]) => {
        const adjacentPairs = poseDetection.util.getAdjacentPairs(poseDetection.SupportedModels.BlazePose);

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        context.fillStyle = 'red';
        context.strokeStyle = 'red';
        context.lineWidth = 2;

        keypoints.forEach((keypoint) => {
            if (keypoint.score && keypoint.score > 0.5) {
                const { x, y } = keypoint;
                context.beginPath();
                context.arc(x, y, 3, 0, 2 * Math.PI);
                context.fill();
            }
        });

        adjacentPairs.forEach(([i, j]) => {
            const kp1 = keypoints[i];
            const kp2 = keypoints[j];

            if (kp1.score && kp1.score > 0.5 && kp2.score && kp2.score > 0.5) {
                context.beginPath();
                context.moveTo(kp1.x, kp1.y);
                context.lineTo(kp2.x, kp2.y);
                context.stroke();
            }
        });
    };

    return (
        <div style={{ position: 'relative' }}>
            <input type="file" accept="video/*" onChange={handleFileUpload} />
            <button onClick={extractKeypoints}>Extract Keypoints</button>
            <video
                ref={videoRef}
                style={{ width: "640px", height: "480px" }}
                controls
            />
            <canvas
                ref={canvasRef}
                style={{ position: "absolute", left: 0, top: 0 }}
            />
        </div>
    );
};

export default PoseLandMarkerComponent;
