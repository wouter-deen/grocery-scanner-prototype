import {ReactNode} from "react";

export default function Tab({currentTab, index, children}: Props) {
  return (
    <div className={`${currentTab !== index && "hidden"}`}>
      {children}
    </div>
  )
}

type Props = {
  currentTab: number,
  index: number,
  children: ReactNode
}