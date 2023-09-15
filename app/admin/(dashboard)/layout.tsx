"use client"

import NavBar from "@/components/admin/NavBar"
import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Spinner from "@/components/homepage/Spinner"
import supabase from "@/utils/supabase"

export default function Dashboard({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      if (res.data.session?.user) {
        setIsLoading(false)
      } else {
        router.push(`/admin/login`)
      }
    })
  }, [])

  return (
    <div className="bg-slate-200 min-h-screen h-full flex flex-col">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <NavBar />
          {children}
        </>
      )}
    </div>
  )
}
