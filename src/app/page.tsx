"use client";
import Input from "@/components/ui/Input";
import {TabSelector} from "@/components/ui/tabs/TabSelector";
import {useState} from "react";
import Tab from "@/components/ui/tabs/Tab";

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <main className="px-4 py-4 sm:px-8 sm:py-8">
      <h3 className="text-5xl sm:text-6xl font-bold">Your Food</h3>
      <Input id="search" type="search" className="max-w-md mt-2 sm:text-xl" placeholder="Search..."/>
      <TabSelector currentTab={currentTab} tabs={["Vegetables", "Fruit", "Meat", "Diary", "Carbs", "Oil", "Seasoning"]} setCurrentTab={setCurrentTab}/>

      <Tab currentTab={currentTab} number={0}>
        <p>Brie</p>
      </Tab>
    </main>
  )
}
