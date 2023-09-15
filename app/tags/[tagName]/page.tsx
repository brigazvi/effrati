"use client"
import List from "@/components/QuestionsList"
import { useEffect, useState } from "react"
import supabase from "@/utils/supabase"
import { LOAD_CHUNK_SIZE } from "@/utils/GLOBAL_CONSTS"
import loadQuestions from "@/utils/loadQuestions"

type tagsPageProps = {
  params: { tagName: string }
}

export default function tagsPage({ params }: tagsPageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions]: [question[], any] = useState([])

  /**gets the first chunk of questions of a specified Tag */
  function getTagQuestions() {
    return supabase
      .from("questions")
      .select()
      .eq("answered", true)
      .eq("private", false)
      .contains("tags", [decodeURIComponent(params.tagName)])
      .order("id", { ascending: false })
      .limit(LOAD_CHUNK_SIZE)
  }

  /** gets more tag related questions from supabase. returns a promise.*/
  function getMoreTagQuestions() {
    return supabase
      .from("questions")
      .select()
      .eq("answered", true)
      .eq("private", false)
      .order("id", { ascending: false })
      .contains("tags", [decodeURIComponent(params.tagName)])
      .range(questions.length, questions.length + LOAD_CHUNK_SIZE - 1)
  }

  useEffect(() => {
    loadQuestions(false, setQuestions, setIsLoading, getTagQuestions)
  }, [])

  return (
    <List
      questions={questions}
      isLoading={isLoading}
      setQuestions={setQuestions}
      setIsLoading={setIsLoading}
      getMoreQuestions={getMoreTagQuestions}
    />
  )
}
