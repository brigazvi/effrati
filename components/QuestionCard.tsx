"use client"
import Link from "next/link"
import Tag from "./Tag"
import { useRouter } from "next/navigation"

export default function QuestionCard({ question }: { question: question }) {
  const router = useRouter()
  return (
    <Link href={`/question/${question.id}`}>
      <div className="bg-white p-4 rounded-lg shadow shadow-blue-200 border-blue-200 border text-right">
        <h4 className="whitespace-pre-line">{question.fullquestion}</h4>
        <div className="mt-2 flex gap-2 flex-wrap">
          {question.tags &&
            question.tags.map((tag) => {
              return <Tag tagName={tag} action="navigate" key={tag} />
            })}
        </div>
      </div>
    </Link>
  )
}
