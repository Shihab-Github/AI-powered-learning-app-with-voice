"use client"

import React from "react"
import { Loader2 } from "lucide-react"

export const LoadingOverlay = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-white">
        <div className="loading-shadow">
          <Loader2 className="w-12 h-12 text-[#663820] animate-spin" />
          <h2 className="loading-title">Synthesizing Book...</h2>
          <p className="text-[var(--text-secondary)] text-center">
            We&#39;re processing your PDF and preparing the interactive experience.
          </p>
        </div>
      </div>
    </div>
  )
}
