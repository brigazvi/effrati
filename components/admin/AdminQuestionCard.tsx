import Link from "next/link"

export default function AdminQuestionCard({
  question,
}: {
  question: question
}) {
  return (
    <Link href={`/admin/edit/${question.id}`}>
      <div className="bg-white whitespace-pre-line rounded-lg p-4">
        {question.fullquestion}
      </div>
    </Link>
  )
}
