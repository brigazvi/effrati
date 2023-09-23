import QuestionBrowser from "@/components/homepage/QuestionBrowser"
import AskButton from "../components/homepage/AskButton"

export default async function Home() {
  return (
    <div className="bg-blue-100 dark:bg-slate-950 min-h-screen h-full flex flex-col">
      <QuestionBrowser />
      <AskButton />
    </div>
  )
}
