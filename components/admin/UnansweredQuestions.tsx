"use client"
import supabase from "@/utils/supabase"
import QuestionListAdmin from "./AdminList"
import AdminList from "./AdminList"
import { LOAD_CHUNK_SIZE } from "@/utils/GLOBAL_CONSTS"
import { useState } from "react"

export default function UnansweredQuestions() {
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions]: [question[], any] = useState([])

  function getUnansweredQuestions() {
    return supabase
      .from("questions")
      .select()
      .eq("answered", false)
      .order("id", { ascending: true })
      .limit(LOAD_CHUNK_SIZE)
  }

  function getMoreUnansweredQuestions() {
    return supabase
      .from("questions")
      .select()
      .eq("answered", false)
      .order("id", { ascending: true })
      .range(questions.length, questions.length + LOAD_CHUNK_SIZE - 1)
  }

  return (
    <QuestionListAdmin
      questions={questions}
      setQuestions={setQuestions}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      getMoreQuestions={getMoreUnansweredQuestions}
    />
  )
}
