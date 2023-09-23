import BackButton from "@/components/BackButton"
import supabase from "@/utils/supabase"
import { ReactNode } from "react"

type LayoutProps = { children: ReactNode; params: { tagId: string } }

export default async function Layout({ children, params }: LayoutProps) {
  const { data: tag, error } = await supabase
    .from("tags")
    .select("*")
    .eq("id", params.tagId)
    .single()
  return (
    <div className="bg-blue-100 h-screen">
      <div className="p-4 pb-0">
        <BackButton />
        <h2 className="text-xl font-bold">{tag.name}</h2>
        <p>{tag.description}</p>
      </div>
      {children}
    </div>
  )
}
