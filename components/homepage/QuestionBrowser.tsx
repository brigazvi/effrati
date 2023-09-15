"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Header from "./Header"
import List from "../QuestionsList"
import supabase from "@/utils/supabase"
import loadQuestions from "@/utils/loadQuestions"
import { LOAD_CHUNK_SIZE } from "@/utils/GLOBAL_CONSTS"
import QuestionsList from "../QuestionsList"

export default function QuestionBrowser() {
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions]: [question[], any] = useState([])
  const [searchText, setSearchText] = useState("")
  const [mode, setMode]: [Mode, Dispatch<SetStateAction<Mode>>] =
    useState<Mode>("browse")

  function getQuestions() {
    return supabase
      .from("questions")
      .select()
      .eq("answered", true)
      .eq("private", false)
      .order("id", { ascending: false })
      .limit(LOAD_CHUNK_SIZE)
  }

  function getMoreQuestions() {
    return supabase
      .from("questions")
      .select()
      .eq("answered", true)
      .eq("private", false)
      .order("id", { ascending: false })
      .range(questions.length, questions.length + LOAD_CHUNK_SIZE - 1)
  }

  function searchQuestions(searchText: string) {
    console.log("searching...")
    return supabase
      .from("questions")
      .select()
      .eq("answered", true)
      .eq("private", false)
      .filter("fullquestion", "like", `*${searchText}*`)
      .order("id", { ascending: false })
      .limit(LOAD_CHUNK_SIZE)
  }

  function searchMoreQuestions(searchText: string) {
    return supabase
      .from("questions")
      .select()
      .eq("answered", true)
      .eq("private", false)
      .filter("fullquestion", "like", `*${searchText}*`)
      .order("id", { ascending: false })
      .range(questions.length, questions.length + LOAD_CHUNK_SIZE - 1)
  }

  useEffect(
    () => loadQuestions(false, setQuestions, setIsLoading, getQuestions),
    []
  )
  useEffect(() => {
    loadQuestions(false, setQuestions, setIsLoading, getQuestions)
  }, [mode])
  ///////////////////////////////////////////////////////////////////////////
  return (
    <>
      <Header
        mode={mode}
        setMode={setMode}
        setIsLoading={setIsLoading}
        setQuestions={setQuestions}
        searchText={searchText}
        setSearchText={setSearchText}
        searchQuestions={(s) => {
          loadQuestions(false, setQuestions, setIsLoading, () => {
            return searchQuestions(s)
          })
        }}
      />
      <div className="grow flex flex-col">
        <QuestionsList
          questions={questions}
          setQuestions={setQuestions}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          getMoreQuestions={() => {
            if (mode === "browse") {
              return getMoreQuestions()
            } else {
              return searchMoreQuestions(searchText)
            }
          }}
        />
      </div>
    </>
  )
}
//////////////////////////////////////////////////////////////////////////
