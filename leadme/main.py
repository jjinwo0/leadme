from fastapi import FastAPI
from pydantic import BaseModel
from video_processor import download_video, process_video

app = FastAPI()

class Video(BaseModel):
    url: str

@app.get("/")
async def read_root():
    return "This is root path from MyAPI"

@app.post("/videoUrl")
async def saveVideoData(video: Video):
    # 비디오 다운로드 및 처리
    video_path = download_video(video.url, 'downloaded_video.mp4')
    keypoints = process_video(video.url, video_path)
    return {"url": video.url, "keypoints": keypoints}
