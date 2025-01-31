"use client"

import { cn } from "@/lib/utils"
import { TextareaHTMLAttributes, useEffect, useRef, useState } from "react"


interface AutoResizeTextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> {
  name: string
}


export default function AutoResizeTextArea({ className, name, ...props }: AutoResizeTextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [value, setValue] = useState<string>("")

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
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        resizeTextArea()
      }}
      className={cn("text-white font-bold resize-none min-h-4 max-h-60", className)}
    />
  )
}