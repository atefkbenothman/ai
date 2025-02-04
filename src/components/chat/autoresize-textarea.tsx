"use client"

import { cn } from "@/lib/utils"
import { TextareaHTMLAttributes, useEffect, useRef } from "react"

interface AutoResizeTextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  > {
  name: string
  value: string
  onChange: (message: string) => void
}

export function AutoResizeTextArea({
  className,
  name,
  value,
  onChange,
  ...props
}: AutoResizeTextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextArea = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    resizeTextArea()
  }, [value])

  return (
    <textarea
      {...props}
      ref={textareaRef}
      name={name}
      rows={1}
      required
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
        resizeTextArea()
      }}
      className={cn(
        "max-h-60 min-h-4 resize-none font-medium text-white",
        className,
      )}
    />
  )
}
