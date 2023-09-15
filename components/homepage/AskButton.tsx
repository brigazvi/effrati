import Link from "next/link"

export default function AskButton() {
  return (
    <Link
      href={`/ask`}
      className="fixed bottom-4 left-4 w-10 aspect-square grid place-items-center bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
    >
      <div className="material-symbols-outlined">add</div>
    </Link>
  )
}
