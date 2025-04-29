"use client"
import { DotLottiePlayer } from "@dotlottie/react-player"
import "@dotlottie/react-player/dist/index.css"

interface LottieAnimationProps {
  src: string
  height?: number | string
  width?: number | string
  loop?: boolean
  autoplay?: boolean
  className?: string
}

export default function LottieAnimation({
  src,
  height = "auto",
  width = "100%",
  loop = false,
  autoplay = true,
  className = "",
}: LottieAnimationProps) {
  return (
    <div
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        width: typeof width === "number" ? `${width}px` : width,
      }}
      className={className}
    >
      <DotLottiePlayer src={src} autoplay={autoplay} loop={loop} style={{ height: "100%", width: "100%" }} />
    </div>
  )
}
