"use client"
import Spinner from "@/components/homepage/Spinner"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import supabase from "@/utils/supabase"
import Popup from "@/components/admin/Popup"
import Tag from "@/components/Tag"

export default function EditPage({
  params,
}: {
  params: { questionId: string }
}) {
  const router = useRouter()
  const [title, setTitle] = useState<string>("")
  const [fullQuestion, setFullQuestion] = useState<string>("")
  const [answer, setAnswer] = useState<string>("")
  const [addedTagsIds, setAddedTagsIds] = useState<string[]>([])
  const [newTag, setNewTag] = useState<string>("")
  const [err, setErr] = useState<string>("")
  const [isSending, setIsSending] = useState<boolean>(false)
  const [isLoadingNewTag, setIsLoadingNewTag] = useState(false)
  const [popup, setPopup] = useState<boolean>(false)

  useEffect(() => {
    supabase
      .from("questions")
      .select("*")
      .eq("id", params.questionId)
      .single()
      .then((res) => {
        setTitle(res.data.title)
        setFullQuestion(res.data.fullquestion)
        setAddedTagsIds(res.data.tags || [])
        setAnswer(res.data.answer)
      })
  }, [])
  return (
    <div className="p-4 grow">
      <div className="flex flex-col h-full gap-4">
        <div className="flex">
          {/* title: */}
          <input
            autoComplete="off"
            type="text"
            name="title"
            id="title"
            className="input grow"
            value={title}
            placeholder="כותרת"
          />
          {/* delete-question button: */}
          <button
            className={`material-symbols-outlined aspect-square hover:text-red-500`}
            onClick={() => {
              setPopup(true)
            }}
          >
            delete
          </button>
          {popup && (
            <Popup setPopup={setPopup}>
              <>
                <h2 className="font-medium">השאלה תימחק לתמיד</h2>
                <button
                  className="bg-red-500 hover:bg-red-600 self-stretch rounded-lg px-2 py-1 text-white"
                  onClick={() => {
                    supabase
                      .from("questions")
                      .delete()
                      .eq("id", params.questionId)
                      .select()
                      .then((res) => {
                        if (res.error) {
                          setErr(res.error.message)
                        } else {
                          setErr("השאלה נמחקה בהצלחה")
                          router.back()
                        }
                      })
                  }}
                >
                  מחק
                </button>
              </>
            </Popup>
          )}
        </div>

        {/* full question */}
        <textarea
          name="fullQuestion"
          className="input grow"
          id="fullQuestion"
          value={fullQuestion}
          placeholder="שאלה"
          onInput={(e) => {
            setFullQuestion(e.currentTarget.value)
          }}
        />

        {/* answer */}
        <textarea
          name="answer"
          className="input grow"
          id="answer"
          value={answer}
          placeholder="תשובה"
          onInput={(e) => {
            setAnswer(e.currentTarget.value)
          }}
        />

        {/* tags */}
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
        <div className="flex gap-2">
          {addedTagsIds.map((tagId) => (
            <Tag
              action={() =>
                setAddedTagsIds((prev) => prev.filter((t) => t !== tagId))
              }
              tagId={tagId}
              key={tagId}
            />
          ))}
        </div>

        {/* sending and errors */}
        <div className="flex items-center justify-end">
          <span className="me-auto">{err}</span>
          {isSending ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <button
              onClick={() => {
                if (answer.trim()) {
                  setIsSending(true)
                  supabase
                    .from("questions")
                    .update({
                      title,
                      tags: addedTagsIds,
                      fullquestion: fullQuestion,
                      answer,
                      answered: true,
                    })
                    .eq("id", params.questionId)
                    .then((res) => {
                      if (res.error) {
                        setIsSending(false)
                        setErr(res.error.message)
                      } else {
                        setErr("התשובה נשמרה בהצלחה")
                        setTimeout(() => {
                          router.push(`/admin`)
                        }, 1000)
                      }
                    })
                } else {
                  setErr("יש להזין תשובה לפני שמירה")
                }
              }}
              className="bg-blue-600 rounded-lg hover:bg-blue-700 text-white p-2 ps-3 self-end flex items center gap-2"
            >
              <span>שמור</span>
              <span className="material-symbols-outlined">save</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
