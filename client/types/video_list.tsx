import { Video } from "./video";
export interface VideoListFormProps {
    videos: Video[];
    setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
  }