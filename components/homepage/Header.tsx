"use client"

import { Dispatch, SetStateAction, useRef, useState } from "react"
import bgImg from "../../public/portrait.jpg"
import Image from "next/image"
import SearchBar from "./SearchBar"

type HeaderProps = {
  searchQuestions: (searchText: string) => void
  mode: Mode
  setMode: Dispatch<SetStateAction<Mode>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setQuestions: Dispatch<SetStateAction<question[]>>
  setSearchText: Dispatch<SetStateAction<string>>
  searchText: string
}

export default function Header({
  mode,
  setMode,
  setIsLoading,
  setQuestions,
  searchText,
  setSearchText,
  searchQuestions,
}: HeaderProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)
  let timer: NodeJS.Timeout
  // const timer = {
  //   setup() {},
  // }

  return (
    // header container:
    <div
      className={`p-4 text-white h-96 shrink-0 overflow-clip transition-all duration-500 ease-out bg-center bg-cover font-bold leading-3 text-2xl flex items-end  ${
        mode === "search" && "searchMode"
      } relative`}
    >
      {/* image */}
      <Image
        alt="תמונה של הרב ברוך אפרתי"
        src={bgImg.src}
        fill
        quality={100}
        className="object-cover z-[0]"
      />

      {/* darkener: */}
      <div
        className={`bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.7)] ease-out duration-500 h-full w-full absolute z-[1] top-0 right-0 ${
          mode === "search" && "bg-[rgba(0,0,0,0.6)] backdrop-blur-lg"
        }`}
      />

      {/* elements of header: */}
      <div className="flex items-center gap-4 justify-end grow z-10">
        {/* headline: */}
        <div
          className={`transition-transform duration-500 bottom-4 right-4 absolute ease-in-out origin-right"  ${
            mode === "search" ? "translate-x-96 " : "translate-x-0"
          }`}
        >
          <h1>שאלות ותשובות ביהדות</h1>
          <h2 className="font-light text-xl">עם הרב ברוך אפרתי</h2>
        </div>

        {/* search input: */}
        <SearchBar
          mode={mode}
          searchText={searchText}
          searchQuestions={searchQuestions}
          setSearchText={setSearchText}
          searchInputRef={searchInputRef}
          setIsLoading={setIsLoading}
          setQuestions={setQuestions}
        />

        {/* search Icon */}
        <button
          onClick={() => {
            if (mode === "browse") {
              setMode("search")
              if (searchInputRef.current !== undefined) {
                searchInputRef.current?.focus()
              }
            } else {
              if (searchInputRef.current) {
                setSearchText(searchInputRef.current.value)
                searchQuestions(searchInputRef.current.value)
              }
            }
          }}
          className={`material-symbols-outlined header-icon`}
        >
          search
        </button>

        {/* exit search button */}
        <button
          className={`absolute header-icon top-4 left-4 material-symbols-outlined  transition-transform duration-[500ms] ease-out ${
            mode === "search" ? "translate-x-0" : "-translate-x-96"
          }`}
          onClick={() => setMode("browse")}
        >
          close
        </button>
      </div>
    </div>
  )
}
