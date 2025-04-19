// import { type NextRequest, NextResponse } from "next/server"

// export async function GET(request: NextRequest) {
//     const searchParams = request.nextUrl.searchParams
//     const downloadId = searchParams.get("id")

//     if (!downloadId) {
//         return new NextResponse("Missing download ID", { status: 400 })
//     }

//     // Update this to your actual backend URL
//     const API_BASE_URL = "http://localhost:8000"

//     try {
//         const response = await fetch(`${API_BASE_URL}/download/${downloadId}/file`)

//         if (!response.ok) {
//             throw new Error(`Download failed: ${response.statusText}`)
//         }

//         const blob = await response.blob()

//         // Get the filename from the Content-Disposition header if available
//         const contentDisposition = response.headers.get("Content-Disposition")
//         let filename = "download"

//         if (contentDisposition) {
//             const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/)
//             if (filenameMatch && filenameMatch[1]) {
//                 filename = filenameMatch[1]
//             }
//         }

//         // Return the file as a stream
//         return new NextResponse(blob, {
//             headers: {
//                 "Content-Type": "application/octet-stream",
//                 "Content-Disposition": `attachment; filename="${filename}"`,
//             },
//         })
//     } catch (error) {
//         console.error("Error downloading file:", error)
//         return new NextResponse("Download failed", { status: 500 })
//     }
// }


import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const downloadId = searchParams.get("id")
  const requestedFilename = searchParams.get("filename") || "download"
  const type = searchParams.get("type") || "video"

  if (!downloadId) {
    return new NextResponse("Missing download ID", { status: 400 })
  }

  // Update this to your actual backend URL
  const API_BASE_URL = "http://35.238.56.13:8000"

  try {
    const response = await fetch(`${API_BASE_URL}/download/${downloadId}/file`)

    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`)
    }

    const blob = await response.blob()

    // Determine the correct file extension based on type and content type
    let filename = requestedFilename
    const contentType = response.headers.get("Content-Type") || ""

    // If the filename doesn't already have an extension, add one based on content type
    if (!filename.includes(".")) {
      if (type === "video" || contentType.includes("video")) {
        filename += ".mp4"
      } else if (type === "audio" || contentType.includes("audio")) {
        filename += ".m4a"
      }
    }

    // Get the filename from the Content-Disposition header if available
    const contentDisposition = response.headers.get("Content-Disposition")
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/)
      if (filenameMatch && filenameMatch[1]) {
        // Use the backend filename only if we don't have a better one
        if (requestedFilename === "download") {
          filename = filenameMatch[1]
        }
      }
    }

    // Determine the correct MIME type
    let mimeType = "application/octet-stream"
    if (type === "video") {
      mimeType = "video/mp4"
    } else if (type === "audio") {
      mimeType = "audio/m4a"
    }

    // Return the file as a stream with the correct filename and MIME type
    return new NextResponse(blob, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Error downloading file:", error)
    return new NextResponse("Download failed", { status: 500 })
  }
}

