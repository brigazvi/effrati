import Tag from "@/components/Tag"
import BackButton from "@/components/BackButton"
import { cookies } from "next/headers"
import supabase from "@/utils/supabase"

export const dynamic = "force-dynamic"

export const generateStaticParams = async () => {
  const res = await supabase.from("questions").select()
  const data = res.data || []
  return data.map((q: question) => ({ id: String(q.id) }))
}

export default async function QuestionPage({
  params,
}: {
  params: { id: string }
}) {
  const res = await supabase
    .from("questions")
    .select()
    .eq("id", decodeURIComponent(params.id))
    .single()

  const question: question = res.data || {
    answer: "error",
    answered: false,
    fullquestion: "error",
    id: "error",
    promo: "error",
    tags: ["error"],
    title: "error",
  }

  return (
    <div className="bg-slate-200 min-h-screen flex flex-col gap-2 p-4">
      <BackButton />
      <div className="flex flex-wrap gap-y-2 items-center justify-between gap-x-8">
        <h2 className="text-xl font-bold">{question.title}</h2>
        <div className="flex flex-wrap gap-2 justify-end ms-auto">
          {question?.tags?.map((tag) => {
            return <Tag tagName={tag} key={tag} action="navigate" />
          })}
        </div>
      </div>
      <div className="bg-blue-600 rounded-es-none max-w-2xl ml-10 self-start rounded-lg p-4 text-white whitespace-pre-line">
        {question.fullquestion}
      </div>
      <div className="bg-white rounded-lg rounded-ee-none max-w-2xl self-end mr-10 p-4 whitespace-pre-line">
        {question.answer}
      </div>
    </div>
  )
}
