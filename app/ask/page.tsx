"use client"
import BackButton from "@/components/BackButton"
import Tag from "@/components/Tag"
import Spinner from "@/components/homepage/Spinner"
import { useRouter } from "next/navigation"
import { MutableRefObject, useRef, useState } from "react"
import supabase from "@/utils/supabase"

export default function Ask() {
  const router = useRouter()
  const [isSending, setIsSending] = useState<boolean>(false)
  const [isLoadingNewTag, setIsLoadingNewTag] = useState<boolean>(false)
  const [addedTagsIds, setAddedTagsIds] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const titleRef = useRef<HTMLInputElement>(null)
  const fullQuestionRef = useRef<HTMLTextAreaElement>(null)
  const [err, setErr] = useState("")

  return (
    <div className="bg-slate-200 h-screen p-4 flex flex-col gap-4">
      <BackButton />
      <h2 className="text-xl font-bold">מה השאלה?</h2>
      <div className="flex flex-col gap-4 grow">
        <input
          autoComplete="off"
          ref={titleRef}
          type="text"
          name="title"
          id="title"
          placeholder="כותרת"
          className="rounded-lg px-4 py-2 block border-b-4 border-slate-400 focus:border-blue-600 focus:outline-none"
        />
        <textarea
          ref={fullQuestionRef}
          name="fullQuestion"
          id="fullQuestion"
          cols={30}
          rows={10}
          placeholder="תוכן השאלה"
          className="rounded-lg p-4 grow block border-b-4 border-slate-400 focus:border-blue-600 focus:outline-none"
        ></textarea>

        {/* adding tags: */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (newTag.trim().length) {
              setIsLoadingNewTag(true)
              supabase
                .from("tags")
                .select("*")
                .eq("name", newTag)
                .single()
                .then((res) => {
                  if (res.error === null && res.data) {
                    setAddedTagsIds((prev) => [...prev, res.data.id])
                    setIsLoadingNewTag(false)
                  } else {
                    supabase
                      .from("tags")
                      .insert({ name: newTag })
                      .select("*")
                      .single()
                      .then((res) => {
                        setAddedTagsIds((prev) => [...prev, res.data.id])
                        setIsLoadingNewTag(false)
                      })
                  }
                  setNewTag(``)
                })
            }
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            autoComplete="off"
            name="newTag"
            value={newTag}
            id="newTag"
            placeholder="הוסף תגית חדשה"
            className="input grow"
            onInput={(e) => {
              setNewTag(e.currentTarget.value)
            }}
          />
          {isLoadingNewTag ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              className="material-symbols-outlined aspect-square bg-blue-400 hover:bg-blue-500 text-white grid place-items-center rounded-lg"
            >
              add
            </button>
          )}
        </form>

        {/* added tags */}
        <div className="flex gap-2 flex-wrap">
          {addedTagsIds.map((tag) => {
            return (
              <Tag
                tagId={tag}
                key={tag}
                action={() => {
                  setAddedTagsIds((prev) => prev.filter((t) => t !== tag))
                  setNewTag("")
                }}
              />
            )
          })}
        </div>

        {/* error handling */}
        <div>{err}</div>

        {isSending ? (
          <Spinner />
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsSending(true)
              if (
                titleRef?.current?.value.trim() !== "" &&
                fullQuestionRef?.current?.value.trim() !== ""
              ) {
                supabase
                  .from("questions")
                  .insert({
                    title: titleRef?.current?.value,
                    fullquestion: fullQuestionRef?.current?.value,
                    private: false,
                    answered: false,
                    tags: addedTagsIds,
                  })
                  .then(() => {
                    setErr("ההודעה נשלחה בהצלחה")
                    setIsSending(false)
                    setTimeout(() => {
                      router.push("/")
                    }, 1000)
                  })
              } else {
                setIsSending(false)
                setErr("אנא מלא את כל השדות")
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 flex items-center text-white rounded-lg ps-3 pe-2 gap-2 py-2 self-end"
          >
            שלח את השאלה לרב
            <span className="material-symbols-outlined rotate-180 grid place-items-center">
              send
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
