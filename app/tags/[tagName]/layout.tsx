import BackButton from "@/components/BackButton"
import { ReactNode } from "react"

type LayoutProps = { children: ReactNode; params: { tagName: string } }

export default function Layout({ children, params }: LayoutProps) {
  return (
    <div className="bg-blue-100 h-screen">
      <div className="p-4 pb-0">
        <BackButton />
        <h2 className="text-xl font-bold">{decodeURI(params.tagName)}</h2>
      </div>
      {children}
    </div>
  )
}
