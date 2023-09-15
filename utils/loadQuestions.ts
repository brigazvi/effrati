import { Dispatch, SetStateAction } from "react"
import { PostgrestFilterBuilder } from "@supabase/postgrest-js"

/** load a bunch of questions to the state */
export default function loadQuestions(
  /**does the function adds to the existing array? */
  additional: boolean,
  /**the setState function of the questions array. */
  setQuestions: Dispatch<SetStateAction<question[]>>,
  /**the setState function of the loading state. */
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  /**a function that should contain the supabase query. should return a PostgrestFilterBuilder promise */
  fetchPromiseFromDb: () => PostgrestFilterBuilder<any, any, any[], unknown>
) {
  if (!additional) {
    setQuestions([])
  }
  setIsLoading(true)
  fetchPromiseFromDb().then((res) => {
    if (res.data) {
      if (additional) {
        setQuestions((prev: question[]) => [...prev, ...res.data])
      } else {
        setQuestions(res.data || [])
      }
      setIsLoading(false)
    } else {
      console.log(res.error.message)
      setIsLoading(false)
    }
  })
}
