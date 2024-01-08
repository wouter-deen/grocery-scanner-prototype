"use client";
import Input from "@/components/ui/Input";
import {TabSelector} from "@/components/ui/tabs/TabSelector";
import {useState} from "react";
import Tab from "@/components/ui/tabs/Tab";
import IconButton from "@/components/ui/buttons/IconButton";
import {FaMinus, FaPlus} from "react-icons/fa6";
import Button from "@/components/ui/buttons/Button";

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);
  const [toggle, setToggle] = useState(0);

  return (
    <main className="px-4 py-4 sm:px-8 sm:py-8">
      <h3 className="text-5xl sm:text-6xl font-bold">Your Food</h3>
      <Input id="search" type="search" className="max-w-md mt-2 sm:text-xl" placeholder="Search..."/>
      <TabSelector currentTab={currentTab} tabs={["Vegetables", "Fruit", "Meat", "Diary", "Carbs", "Oil", "Seasoning"]} setCurrentTab={setCurrentTab}/>

      <Tab currentTab={currentTab} index={0}>
        <p>Tomaat</p>
      </Tab>

      <Tab currentTab={currentTab} index={1}>
        <p>Appel</p>
      </Tab>

      <Tab currentTab={currentTab} index={2}>
        <p>Kippetie</p>
      </Tab>

      <Tab currentTab={currentTab} index={3}>
        <p>Melk</p>
      </Tab>

      <Tab currentTab={currentTab} index={4}>
        <p>Brood</p>
      </Tab>

      <Tab currentTab={currentTab} index={5}>
        <p>Ongekraakte nafta</p>
      </Tab>

      <Tab currentTab={currentTab} index={6}>
        <p>Peper</p>
      </Tab>

      {/*The add to inventory functionality should only work on the tablet, so it should be hidden on the phone app*/}
      <div className="hidden sm:flex justify-center absolute bottom-8 left-1/2">
        <div className="backdrop-blur-md bg-black/10 w-fit relative -left-1/2 px-4 py-3 rounded-lg">
          <div className="flex justify-center space-x-3 mb-2">
            <IconButton icon={FaPlus} className={toggle === 0 ? "bg-lime-600" : "bg-neutral-400"} onClick={() => setToggle(0)}/>
            <IconButton icon={FaMinus} className={toggle === 1 ? "bg-lime-600" : "bg-neutral-400"} onClick={() => setToggle(1)}/>
          </div>
          <Button className="bg-lime-600">Open Scanner</Button>
        </div>
      </div>
    </main>
  )
}
