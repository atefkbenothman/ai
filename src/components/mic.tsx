"use client"

import { useEffect } from "react"
import { Mic as MicIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMic } from "@/hooks/use-mic"

type MicProps = {
  onTextOutput: (text: string) => void
}

export function Mic({ onTextOutput }: MicProps) {
  const { isRecording, error, startRecording, stopRecording } =
    useMic(onTextOutput)

  const handleToggleMic = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`absolute bottom-1.5 right-1 size-6 rounded-sm ${isRecording ? "bg-red-500" : ""}`}
      onClick={handleToggleMic}
    >
      <MicIcon size={16} />
    </Button>
  )
}
