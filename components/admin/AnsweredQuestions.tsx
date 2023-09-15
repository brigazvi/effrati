"use client"
import supabase from "@/utils/supabase"
import QuestionListAdmin from "./AdminList"
import { LOAD_CHUNK_SIZE } from "@/utils/GLOBAL_CONSTS"
import { useEffect, useState } from "react"
import loadQuestions from "@/utils/loadQuestions"

export default function AnsweredQuestions() {
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions]: [question[], any] = useState([])

  function getAnsweredQuestions() {
    return supabase
      .from("questions")
      .select()
      .eq("answered", true)
      .order("id", { ascending: false })
      .limit(LOAD_CHUNK_SIZE)
  }

  function getMoreAnsweredQuestions() {
    return supabase
      .from("questions")
      .select()
      .eq("answered", true)
      .order("id", { ascending: false })
      .range(questions.length, questions.length + LOAD_CHUNK_SIZE - 1)
  }

  useEffect(() => {
    loadQuestions(false, setQuestions, setIsLoading, getAnsweredQuestions)
  }, [])

  return (
    <QuestionListAdmin
      questions={questions}
      setQuestions={setQuestions}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      getMoreQuestions={getMoreAnsweredQuestions}
    />
  )
}
