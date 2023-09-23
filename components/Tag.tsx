"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import supabase from "@/utils/supabase"
import { useEffect, useState } from "react"

export default function Tag({
  tagId,
  action,
}: {
  tagId: string
  action: "navigate" | (() => void)
}) {
  const router = useRouter()
  const [tag, setTag] = useState<tag>({
    id: "0",
    name: "",
    description: "",
    image_url: "",
  })

  useEffect(() => {
    supabase
      .from("tags")
      .select()
      .eq("id", tagId)
      .single()
      .then((res) => {
        console.log("res:", res.data)
        console.log("error:", res.error)
        setTag(res.data)
      })
  }, [])

  if (tag.name.trim().length) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation()
          if (action === "navigate") {
            router.push(`/tags/${tag.id}`)
          } else {
            action()
          }
        }}
        className="tag"
      >
        {tag.name}
      </div>
    )
  }
}
