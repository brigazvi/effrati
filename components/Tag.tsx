"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Tag({
  tagName,
  action,
}: {
  tagName: string
  action: "navigate" | (() => void)
}) {
  const router = useRouter()

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        if (action === "navigate") {
          router.push(`/tags/${tagName}`)
        } else {
          action()
        }
      }}
      className="tag"
    >
      {tagName}
    </div>
  )
}
