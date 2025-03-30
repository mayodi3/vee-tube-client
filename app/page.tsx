"use client";

import { useState } from "react";
import SearchBar from "@/components/search-bar";
import VideoGrid from "@/components/video-grid";
import type { VideoInfo } from "@/lib/types";
import { Heart } from "lucide-react";

export default function Home() {
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">
              VeeTube Downloader
            </h1>
          </div>
          <p className="text-muted-foreground">
            Search and download VeeTube videos and audio
          </p>
        </div>

        <SearchBar onSearchResults={setVideos} onSearching={setIsSearching} />

        <VideoGrid videos={videos} isLoading={isSearching} />
      </div>
    </main>
  );
}
