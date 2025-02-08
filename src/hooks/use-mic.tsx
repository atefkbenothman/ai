import { useCallback, useEffect, useState, useRef } from "react"

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: (event: SpeechRecognitionErrorEvent) => void
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

export function useMic(onTextOutput: (newString: string) => void) {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [text, setText] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const micRef = useRef<SpeechRecognition | null>(null)

  const updateText = useCallback(
    (newText: string) => {
      const trimmedText = newText.trim()
      setText(trimmedText)
      onTextOutput(trimmedText)
    },
    [onTextOutput],
  )

  const createSpeechRecognition = useCallback(() => {
    if ("webkitSpeechRecognition" in window) {
      return new window.webkitSpeechRecognition()
    } else if ("SpeechRecognition" in window) {
      // return new window.SpeechRecognition()
      return null
    } else {
      setError("Speech recognition is not supported in this browser.")
      return null
    }
  }, [])

  const startRecording = useCallback(() => {
    const mic = createSpeechRecognition()
    if (!mic) return

    mic.continuous = true
    mic.interimResults = true
    mic.lang = "en-US"

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ")
      updateText(transcript)
    }

    mic.onerror = (event) => {
      console.error("Speech recognition error", event.error)
      setError(`Speech recognition error: ${event.error}`)
      stopRecording()
    }

    try {
      mic.start()
      micRef.current = mic
      setIsRecording(true)
      setError(null)
    } catch (err) {
      console.error("Error starting speech recognition:", err)
      setError(
        "Error starting speech recognition. Please make sure you have granted microphone permissions.",
      )
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [createSpeechRecognition])

  useEffect(() => {
    return () => {
      if (micRef.current) {
        micRef.current.stop()
      }
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (micRef.current) {
      micRef.current.stop()
      micRef.current = null
    }
    setIsRecording(false)
  }, [])

  return {
    isRecording,
    text,
    error,
    startRecording,
    stopRecording,
  }
}
