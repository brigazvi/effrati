"use client"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Spinner from "@/components/homepage/Spinner"
import supabase from "@/utils/supabase"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [err, setErr] = useState("")
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      if (res.data.session?.user) {
        router.push(`/admin`)
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <div className="h-screen bg-gradient-to-b from-blue-200 to-blue-300 p-4 flex flex-col justify-center items-center gap-4">
      <h2 className="font-bold text-xl">התחברות למערכת</h2>
      <form
        action=""
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          if (
            emailRef.current?.value !== undefined &&
            passwordRef.current?.value !== undefined
          ) {
            setIsLoading(true)
            supabase.auth
              .signInWithPassword({
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
              })
              .then((res) => {
                if (res.error) {
                  setIsLoading(false)
                  console.log(res.error)
                  setErr(res.error.message)
                } else {
                  setErr("התחברת בהצלחה")
                  setTimeout(() => {
                    router.push(`/admin`)
                  }, 1000)
                  console.log(res)
                }
              })
          } else {
            setErr("אם אפשר בבקשה למלא את כל פרטי ההתחברות")
          }
        }}
      >
        <input
          ref={emailRef}
          type="email"
          name="email"
          id="email"
          placeholder="אימייל"
          className="rounded-lg px-4 py-2 text-center border-b-4 border-slate-400 focus:border-blue-600 focus:outline-none"
        />
        <input
          ref={passwordRef}
          type="password"
          name="password"
          id="password"
          placeholder="סיסמה"
          className="rounded-lg px-4 py-2 text-center border-b-4 border-slate-400 focus:border-blue-600 focus:outline-none"
        />
        {err && <div className="text-center">{err}</div>}
        {isLoading ? (
          <Spinner />
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold hover:bg-blue-600 px-4 py-2 rounded-lg self-center"
          >
            כניסה
          </button>
        )}
      </form>
    </div>
  )
}
