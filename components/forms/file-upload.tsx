"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn, formatFileSize, isAudioFile, isVideoFile } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
  accept?: string
  maxSize?: number
  className?: string
}

const ACCEPTED_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/m4a",
  "audio/x-m4a",
  "audio/mp4",
  "audio/webm",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]

const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB

export function FileUpload({
  onFileSelect,
  selectedFile,
  accept = ".mp3,.mp4,.wav,.m4a,.webm",
  maxSize = MAX_FILE_SIZE,
  className,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    setError(null)

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Invalid file type. Please upload an audio or video file (MP3, MP4, WAV, M4A, WebM).")
      return false
    }

    if (file.size > maxSize) {
      setError(`File too large. Maximum size is ${formatFileSize(maxSize)}.`)
      return false
    }

    return true
  }

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      onFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const removeFile = () => {
    onFileSelect(null)
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const getFileIcon = (file: File) => {
    if (isAudioFile(file.name)) return "🎵"
    if (isVideoFile(file.name)) return "🎬"
    return "📄"
  }

  return (
    <div className={cn("w-full", className)}>
      {!selectedFile ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "dropzone cursor-pointer",
            isDragOver && "drag-over border-primary bg-primary/5"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-4">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
              isDragOver ? "bg-primary/20" : "bg-muted"
            )}>
              <Upload className={cn(
                "w-8 h-8 transition-colors",
                isDragOver ? "text-primary" : "text-foreground/50"
              )} />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-foreground">
                {isDragOver ? "Drop your file here" : "Drag & drop your interview file"}
              </p>
              <p className="text-sm text-foreground/60 mt-1">
                or click to browse
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {["MP3", "MP4", "WAV", "M4A", "WebM"].map((format) => (
                <span
                  key={format}
                  className="px-3 py-1 rounded-full bg-muted text-xs text-foreground/60"
                >
                  {format}
                </span>
              ))}
            </div>
            <p className="text-xs text-foreground/40">
              Maximum file size: {formatFileSize(maxSize)}
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-2xl border border-border/50 bg-muted/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-2xl">
              {getFileIcon(selectedFile)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-foreground/60" />
                <p className="font-medium text-foreground truncate">
                  {selectedFile.name}
                </p>
              </div>
              <p className="text-sm text-foreground/60 mt-1">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile()
                }}
                className="text-foreground/50 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-500">{error}</p>
        </motion.div>
      )}
    </div>
  )
}
