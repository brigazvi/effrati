"use client"
import QuestionCard from "./QuestionCard"
import Spinner from "./homepage/Spinner"
import { PostgrestFilterBuilder } from "@supabase/postgrest-js"
import { Dispatch, SetStateAction } from "react"
import loadQuestions from "@/utils/loadQuestions"

type listProps = {
  /**the state variable of the question the list should render */
  questions: question[]
  /**the setState function for changing the question list*/
  setQuestions: Dispatch<SetStateAction<question[]>>
  /**the state of the loading */
  isLoading: boolean
  /**the setState function for changing the loading state */
  setIsLoading: Dispatch<SetStateAction<boolean>>
  /**a function that should contain the supabase query for loading more questions. should return a PostgrestFilterBuilder promise  */
  getMoreQuestions: () => PostgrestFilterBuilder<any, any, any[], unknown>
}
//////////////////////////////////////////////////////////////////////////////

export default function QuestionsList({
  questions,
  setQuestions,
  isLoading,
  setIsLoading,
  getMoreQuestions,
}: any) {
  //////////////////////////////////////////////////////////////////////////
  return (
    <div className="grow p-4 flex flex-col gap-4">
      {/* list: */}
      {questions.map((question: question) => {
        return <QuestionCard key={question.id} question={question} />
      })}

      {/* button with spinner loading: */}
      {isLoading ? (
        <Spinner />
      ) : (
        <button
          onClick={() => {
            loadQuestions(true, setQuestions, setIsLoading, getMoreQuestions)
          }}
          className="self-center border-2 border-blue-500 rounded-lg px-3 py-1 bg-white text-blue-500 font-semibold hover:border-blue-700 hover:text-blue-700"
        >
          טען עוד שאלות
        </button>
      )}
    </div>
  )
}
///////////////////////////////////////////////////////////////////////////
