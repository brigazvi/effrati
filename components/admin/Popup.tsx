import { Dispatch, ReactNode, SetStateAction } from "react"

type PopupProps = {
  children: ReactNode
  setPopup: Dispatch<SetStateAction<boolean>>
}
export default function Popup({ children, setPopup }: PopupProps) {
  return (
    <div
      className="grid place-items-center bg-[rgba(0,0,0,0.6)] absolute h-screen w-screen top-0 right-0 backdrop-blur-sm"
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          console.log("click to close")
          setPopup(false)
        } else {
          console.log("just click")
        }
      }}
    >
      <div className="bg-white flex flex-col items-center gap-2 p-6 relative rounded-lg shadow-lg ">
        <button
          className="material-symbols-outlined absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 p-1 hover:text-blue-600 rounded-full shadow-md bg-white"
          onClick={() => setPopup(false)}
        >
          close
        </button>
        {children}
      </div>
    </div>
  )
}
