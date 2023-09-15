import { Dispatch, RefObject, SetStateAction, useEffect } from "react"

type SearchBarProps = {
  setQuestions: Dispatch<SetStateAction<question[]>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  searchInputRef: RefObject<HTMLInputElement>
  searchText: string
  setSearchText: Dispatch<SetStateAction<string>>
  searchQuestions: (searchText: string) => void
  mode: Mode
}
export default function SearchBar({
  setQuestions,
  setIsLoading,
  searchInputRef,
  searchText,
  setSearchText,
  searchQuestions,

  mode,
}: SearchBarProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuestions([])
      searchQuestions(searchText)
    }, 1000)
    return () => clearTimeout(timer)
  }, [searchText])
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (searchInputRef.current) {
          setSearchText(searchInputRef.current.value)
          searchQuestions(e.currentTarget.search.value)
        }
      }}
      className={`grow`}
    >
      <input
        autoComplete="off"
        ref={searchInputRef}
        type="text"
        name="search"
        id="search"
        placeholder="מה ברצונך לחפש?"
        className={`w-full rounded-lg text-base text-black border-b-4  border-black focus:border-blue-600 focus:outline-none font-normal py-1 px-2 duration-500 ease-in-out transition-transform ${
          mode === "browse" ? "translate-x-[100vw]" : "translate-x-0"
        } `}
        onInput={(e) => {
          setQuestions([])
          setIsLoading(true)
          setSearchText(e.currentTarget.value)
        }}
      />
    </form>
  )
}
