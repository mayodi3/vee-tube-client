// export interface VideoInfo {
//     id: string;
//     title: string;
//     thumbnail_url: string;
//     watch_url: string;
//     duration?: number;
//     author?: string;
// }

// export interface DownloadProgress {
//     progress: number;
//     status: 'starting' | 'downloading' | 'completed' | 'error';
//     filename: string | null;
//     error?: string;
// }

// export interface DownloadResponse {
//     download_id: string;
// }


export interface VideoInfo {
    id: string
    title: string
    thumbnail_url: string
    watch_url: string
    duration?: number
    author?: string
  }
  
  export interface DownloadProgress {
    progress: number
    status: "starting" | "downloading" | "completed" | "error"
    filename: string | null
    error?: string
    title?: string 
  }
  
  export interface DownloadResponse {
    download_id: string
  }
  
  