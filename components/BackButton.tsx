"use client"

import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()
  return (
    <div
      onClick={() => router.back()}
      className="material-symbols-outlined rotate-180 icon-button self-start "
    >
      arrow_back
    </div>
  )
}
