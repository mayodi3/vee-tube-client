"use client";

import { useState } from "react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Video, Clock, Heart } from "lucide-react";
import Image from "next/image";
import type { VideoInfo } from "@/lib/types";
import { startDownload } from "@/lib/actions";
import DownloadProgress from "@/components/download-progress";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoGridProps {
  videos: VideoInfo[];
  isLoading: boolean;
}

const VideoGrid = ({ videos, isLoading }: VideoGridProps) => {
  const [downloads, setDownloads] = useState<Record<string, string>>({});

  const handleDownload = async (video: VideoInfo, type: "audio" | "video") => {
    // Sanitize the title for use in a filename
    const sanitizedTitle = video.title
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .substring(0, 100); // Limit length

    const downloadId = await startDownload(
      video.watch_url,
      type,
      sanitizedTitle
    );

    if (downloadId) {
      setDownloads((prev) => ({
        ...prev,
        [`${video.id}-${type}`]: downloadId,
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card
            key={index}
            className="overflow-hidden border-2 border-primary/10 rounded-xl"
          >
            <div className="relative aspect-video overflow-hidden bg-muted">
              <Skeleton className="h-full w-full" />
            </div>

            <CardHeader className="p-4">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>

            <CardFooter className="p-4 pt-0 flex flex-col gap-2">
              <div className="flex gap-2 w-full">
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
        <Heart className="h-16 w-16 text-primary/50 mb-4" />
        <h2 className="text-2xl font-bold text-primary">
          Search for VeeTube videos
        </h2>
        <p className="text-muted-foreground mt-2">
          Enter a search term to find videos
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <Card
          key={video.id}
          className="overflow-hidden group youtube-card border-2 border-primary/10 rounded-xl"
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={video.thumbnail_url || "/placeholder.svg"}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-300 card-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {video.duration && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formatDuration(video.duration)}
              </div>
            )}
          </div>

          <CardHeader className="p-4">
            <h3 className="font-semibold line-clamp-2 text-sm sm:text-base">
              {video.title}
            </h3>
          </CardHeader>

          <CardFooter className="p-4 pt-0 flex flex-col gap-2">
            <div className="flex gap-2 w-full">
              {downloads[`${video.id}-video`] ? (
                <DownloadProgress
                  downloadId={downloads[`${video.id}-video`]}
                  label="MP4"
                  icon={<Video className="h-4 w-4 mr-1" />}
                  type="video"
                  title={video.title}
                />
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 download-button bg-primary/5 hover:bg-primary/10 border-primary/20"
                  onClick={() => handleDownload(video, "video")}
                >
                  <Video className="h-4 w-4 mr-1" />
                  MP4
                </Button>
              )}

              {downloads[`${video.id}-audio`] ? (
                <DownloadProgress
                  downloadId={downloads[`${video.id}-audio`]}
                  label="M4A"
                  icon={<Music className="h-4 w-4 mr-1" />}
                  type="audio"
                  title={video.title}
                />
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 download-button bg-primary/5 hover:bg-primary/10 border-primary/20"
                  onClick={() => handleDownload(video, "audio")}
                >
                  <Music className="h-4 w-4 mr-1" />
                  M4A
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default VideoGrid;
