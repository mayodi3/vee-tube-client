// 'use server'

// import { VideoInfo, DownloadProgress, DownloadResponse } from '@/lib/types';

// // Update this to your actual backend URL
// const API_BASE_URL = 'http://localhost:8000';

// export async function searchVideos(query: string): Promise<VideoInfo[]> {
//     try {
//         const response = await fetch(`${API_BASE_URL}/search`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ query }),
//         });

//         if (!response.ok) {
//             throw new Error(`Search failed: ${response.statusText}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error searching videos:', error);
//         return [];
//     }
// }

// export async function startDownload(videoUrl: string, downloadType: 'audio' | 'video'): Promise<string | null> {
//     try {
//         const response = await fetch(`${API_BASE_URL}/download`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ video_url: videoUrl, download_type: downloadType }),
//         });

//         if (!response.ok) {
//             throw new Error(`Download failed: ${response.statusText}`);
//         }

//         const data: DownloadResponse = await response.json();
//         return data.download_id;
//     } catch (error) {
//         console.error('Error starting download:', error);
//         return null;
//     }
// }

// export async function getDownloadProgress(downloadId: string): Promise<DownloadProgress | null> {
//     try {
//         const response = await fetch(`${API_BASE_URL}/download/${downloadId}/progress`);

//         if (!response.ok) {
//             throw new Error(`Failed to get progress: ${response.statusText}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error getting download progress:', error);
//         return null;
//     }
// }

// export async function getVideoInfo(url: string): Promise<VideoInfo | null> {
//     try {
//         const response = await fetch(`${API_BASE_URL}/video-info?url=${encodeURIComponent(url)}`);

//         if (!response.ok) {
//             throw new Error(`Failed to get video info: ${response.statusText}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Error getting video info:', error);
//         return null;
//     }
// }


"use server"

import type { VideoInfo, DownloadProgress, DownloadResponse } from "@/lib/types"

// Update this to your actual backend URL
const API_BASE_URL = "http://35.238.56.13:8000"

export async function searchVideos(query: string): Promise<VideoInfo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error searching videos:", error)
    return []
  }
}

export async function startDownload(
  videoUrl: string,
  downloadType: "audio" | "video",
  videoTitle: string,
): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_url: videoUrl,
        download_type: downloadType,
      }),
    })

    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`)
    }

    const data: DownloadResponse = await response.json()

    // Store the video title in sessionStorage for later use
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`download-${data.download_id}-title`, videoTitle)
      sessionStorage.setItem(`download-${data.download_id}-type`, downloadType)
    }

    return data.download_id
  } catch (error) {
    console.error("Error starting download:", error)
    return null
  }
}

export async function getDownloadProgress(downloadId: string): Promise<DownloadProgress | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/download/${downloadId}/progress`)

    if (!response.ok) {
      throw new Error(`Failed to get progress: ${response.statusText}`)
    }

    const data = await response.json()

    // Add title from sessionStorage if available
    if (typeof window !== "undefined") {
      const title = sessionStorage.getItem(`download-${downloadId}-title`)
      if (title) {
        data.title = title
      }
    }

    return data
  } catch (error) {
    console.error("Error getting download progress:", error)
    return null
  }
}

export async function getVideoInfo(url: string): Promise<VideoInfo | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/video-info?url=${encodeURIComponent(url)}`)

    if (!response.ok) {
      throw new Error(`Failed to get video info: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error getting video info:", error)
    return null
  }
}

