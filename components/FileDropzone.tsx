"use client"

import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { LucideIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileDropzoneProps {
  value?: File | null
  onChange: (file: File | null) => void
  onRemove: () => void
  icon: LucideIcon
  title: string
  hint: string
  accept?: Record<string, string[]>
  maxSize?: number
  className?: string
}

export const FileDropzone = ({
  value,
  onChange,
  onRemove,
  icon: Icon,
  title,
  hint,
  accept,
  maxSize,
  className,
}: FileDropzoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0])
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  })

  if (value) {
    return (
      <div className={cn("upload-dropzone upload-dropzone-uploaded relative border-2 border-dashed border-[#8B7355]", className)}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="upload-dropzone-remove absolute top-2 right-2"
        >
          <X className="w-5 h-5" />
        </button>
        <Icon className="upload-dropzone-icon" />
        <p className="upload-dropzone-text truncate max-w-[90%]">{value.name}</p>
        <p className="upload-dropzone-hint">Click to change file</p>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "upload-dropzone border-2 border-dashed border-[#8B7355]/30",
        isDragActive && "bg-gray-50 border-[#8B7355]",
        className
      )}
    >
      <input {...getInputProps()} />
      <Icon className="upload-dropzone-icon" />
      <p className="upload-dropzone-text">{title}</p>
      <p className="upload-dropzone-hint">{hint}</p>
    </div>
  )
}
