"use client";

import {Dispatch, SetStateAction} from "react";

export function TabSelector({tabs, currentTab, setCurrentTab}: Props) {
  function switchTab(targetTab: number) {
    setCurrentTab(targetTab);
  }

  return (
    <ul className="flex flex-wrap text-sm sm:text-lg font-medium text-center text-gray-500 mt-4">
      {tabs.map((tab, i) => (
        <li className="me-2" key={i}>
          <p className={`inline-block px-3 py-2 rounded-lg active ${currentTab === i ? "text-white bg-lime-600 cursor-default" : "hover:text-gray-900 hover:bg-gray-100 cursor-pointer"}`} onClick={() => switchTab(i)}>
            {tab}
          </p>
        </li>
      ))}
    </ul>
  )
}

type Props = {
  tabs: string[],
  currentTab: number,
  setCurrentTab: Dispatch<SetStateAction<number>>
}
