import {ReactNode} from "react";

export default function Tab({currentTab, number, children}: Props) {
  return (
    <div className={`${currentTab !== number && "hidden"}`}>
      {children}
    </div>
  )
}

type Props = {
  currentTab: number,
  number: number,
  children: ReactNode
}