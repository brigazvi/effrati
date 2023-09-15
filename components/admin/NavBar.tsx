import { useRouter, usePathname } from "next/navigation"
import BackButton from "../BackButton"
import supabase from "@/utils/supabase"

export default function NavBar() {
  const router = useRouter()
  const pathName = usePathname()

  return (
    <div className="bg-white flex justify-between p-4 sticky top-0 z-30">
      <BackButton />
      <button
        className={`material-symbols-outlined icon-button ${
          pathName === `/admin` && ` filled`
        }`}
        onClick={() => router.push("/admin")}
      >
        home
      </button>
      <button
        className={`material-symbols-outlined icon-button ${
          pathName === `/admin/unanswered` && ` filled`
        }`}
        onClick={() => router.push("/admin/unanswered")}
      >
        quiz
      </button>
      <button
        className={`material-symbols-outlined icon-button ${
          pathName === `/admin/answered` && ` filled`
        }`}
        onClick={() => router.push("/admin/answered")}
      >
        library_add_check
      </button>
      <button
        onClick={() => {
          supabase.auth.signOut().then(() => {
            router.push(`/admin/login`)
          })
        }}
        className="material-symbols-outlined rotate-180 icon-button"
      >
        logout
      </button>
    </div>
  )
}
