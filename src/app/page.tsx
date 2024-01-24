"use client";
import Input from "@/components/ui/Input";
import {TabSelector} from "@/components/ui/tabs/TabSelector";
import {ChangeEvent, useState} from "react";
import Tab from "@/components/ui/tabs/Tab";
import Button from "@/components/ui/buttons/Button";
import food from "../food.json"
import {runScan} from "@/lib/Scanner";

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);
  const [inv, setInv] = useState<any[]>(food);

  function runFilter(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target.value.toLowerCase();

    const filteredInv = food.map(categoryObj => ({
      ...categoryObj,
      items: categoryObj.items.filter(item => item.name.toLowerCase().includes(input)),
    }));

    setInv(filteredInv);
  }

  // @ts-ignore
  return (
    <main className="px-4 py-4 sm:px-8 sm:py-8">
      <h3 className="text-5xl sm:text-6xl font-bold">Your Food</h3>
      <TabSelector currentTab={currentTab} tabs={inv.map(cat => cat.name)}
                   setCurrentTab={setCurrentTab}/>
      <Input
        id="search"
        type="search"
        className="max-w-md mt-2 sm:text-xl"
        placeholder="Search..."
        onChange={(event) => runFilter(event)}
      />

      {inv.map((category, i) => (
        <Tab currentTab={currentTab} index={i} key={i}>
          <ul>
            {/* @ts-ignore */}
            {category.items.map((item, j) => (
              <li className="grid grid-cols-3 gap-4 max-w-xs text-xl bg-slate-100 shadow-md rounded-lg px-4 py-2 mt-2" key={j}>
                <div className="text-4xl">{item.icon}</div>
                <div className="mt-1.5">{item.name}</div>
                <div className="mt-1.5 text-right">{item.amount}</div>
              </li>
            ))}
          </ul>
        </Tab>
      ))}

      {/*The add to inventory functionality should only work on the tablet, so it should be hidden on the phone app*/}
      <div className="hidden sm:flex justify-center absolute bottom-8 left-1/2">
        <div className="bg-slate-100 w-fit relative -left-1/2 px-4 py-3 rounded-lg">
          <Button className="bg-lime-600" onClick={() => document.getElementById("camInput")?.click()}>Open
            Scanner</Button>
          {/* @ts-ignore */}
          <input type="file" accept="image/*" capture="camera" className="hidden" id="camInput"
                 onChangeCapture={() => runScan(setInv)}/>
        </div>
      </div>


    </main>
  )
}
