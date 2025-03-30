// "use client"

// import { useState, useEffect, type ReactNode } from "react"
// import { Progress } from "@/components/ui/progress"
// import { Button } from "@/components/ui/button"
// import { Download, AlertCircle } from "lucide-react"
// import { getDownloadProgress } from "@/lib/actions"

// interface DownloadProgressProps {
//   downloadId: string
//   label: string
//   icon: ReactNode
//   type: "audio" | "video"
//   title?: string
// }

// const DownloadProgress = ({ downloadId, label, icon, type, title }: DownloadProgressProps) => {
//   const [progress, setProgress] = useState(0)
//   const [status, setStatus] = useState<string>("starting")
//   const [error, setError] = useState<string | null>(null)
//   const [videoTitle, setVideoTitle] = useState<string | undefined>(title)

//   useEffect(() => {
//     if (!downloadId) return

//     const checkProgress = async () => {
//       const progressData = await getDownloadProgress(downloadId)

//       if (progressData) {
//         setProgress(progressData.progress)
//         setStatus(progressData.status)

//         if (progressData.title && !videoTitle) {
//           setVideoTitle(progressData.title)
//         }

//         if (progressData.error) {
//           setError(progressData.error)
//         }

//         // Continue polling if not completed or error
//         if (progressData.status !== "completed" && progressData.status !== "error") {
//           setTimeout(checkProgress, 1000)
//         }
//       }
//     }

//     checkProgress()
//   }, [downloadId, videoTitle])

//   const getDownloadUrl = () => {
//     // Sanitize the title for use in a filename
//     const sanitizedTitle = videoTitle
//       ? videoTitle
//           .replace(/[^\w\s-]/g, "")
//           .replace(/\s+/g, "_")
//           .substring(0, 100)
//       : "download"

//     const extension = type === "video" ? "mp4" : "m4a"
//     const filename = `${sanitizedTitle}.${extension}`

//     return `/api/download?id=${downloadId}&filename=${encodeURIComponent(filename)}&type=${type}`
//   }

//   if (error) {
//     return (
//       <Button variant="destructive" size="sm" className="flex-1" disabled>
//         <AlertCircle className="h-4 w-4 mr-1" />
//         Error
//       </Button>
//     )
//   }

//   if (status === "completed") {
//     return (
//       <a href={getDownloadUrl()} className="flex-1">
//         <Button variant="default" size="sm" className="w-full bg-green-600 hover:bg-green-700">
//           <Download className="h-4 w-4 mr-1" />
//           Download
//         </Button>
//       </a>
//     )
//   }

//   return (
//     <div className="flex-1 space-y-1">
//       <div className="flex items-center justify-between text-xs">
//         <span className="flex items-center">
//           {icon}
//           {label}
//         </span>
//         <span>{Math.round(progress)}%</span>
//       </div>
//       <Progress value={progress} className="h-2" />
//     </div>
//   )
// }

// export default DownloadProgress


"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Download, AlertCircle } from "lucide-react"
import { getDownloadProgress } from "@/lib/actions"

interface DownloadProgressProps {
  downloadId: string
  label: string
  icon: ReactNode
  type: "audio" | "video"
  title?: string
}

const DownloadProgress = ({ downloadId, label, icon, type, title }: DownloadProgressProps) => {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<string>("starting")
  const [error, setError] = useState<string | null>(null)
  const [videoTitle, setVideoTitle] = useState<string | undefined>(title)

  useEffect(() => {
    if (!downloadId) return

    const checkProgress = async () => {
      const progressData = await getDownloadProgress(downloadId)

      if (progressData) {
        setProgress(progressData.progress)
        setStatus(progressData.status)

        if (progressData.title && !videoTitle) {
          setVideoTitle(progressData.title)
        }

        if (progressData.error) {
          setError(progressData.error)
        }

        // Continue polling if not completed or error
        if (progressData.status !== "completed" && progressData.status !== "error") {
          setTimeout(checkProgress, 1000)
        }
      }
    }

    checkProgress()
  }, [downloadId, videoTitle])

  const getDownloadUrl = () => {
    // Sanitize the title for use in a filename
    const sanitizedTitle = videoTitle
      ? videoTitle
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "_")
          .substring(0, 100)
      : "download"

    const extension = type === "video" ? "mp4" : "m4a"
    const filename = `${sanitizedTitle}.${extension}`

    return `/api/download?id=${downloadId}&filename=${encodeURIComponent(filename)}&type=${type}`
  }

  if (error) {
    return (
      <Button variant="destructive" size="sm" className="flex-1" disabled>
        <AlertCircle className="h-4 w-4 mr-1" />
        Error
      </Button>
    )
  }

  if (status === "completed") {
    return (
      <a href={getDownloadUrl()} className="flex-1">
        <Button variant="default" size="sm" className="w-full bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
      </a>
    )
  }

  return (
    <div className="flex-1 space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center">
          {icon}
          {label}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

export default DownloadProgress

