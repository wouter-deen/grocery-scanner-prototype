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

  function runScan() {
    const file = document.querySelector('input[type=file]')?.files[0];

    const PAT = 'c1d7cdd443654f16bc7a64d3d77d3b88';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
// Change these to whatever model and image URL you want to use
    const MODEL_ID = 'food-item-recognition';
    const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044';
    const IMAGE_URL = window.URL.createObjectURL(file)
    alert(IMAGE_URL)

///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.text())
      .then(result => alert(result))
      .catch(error => alert('error: ' + error));
  }

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
            <IconButton icon={FaPlus} className={toggle === 0 ? "bg-lime-600" : "bg-neutral-400"}
                        onClick={() => setToggle(0)}/>
            <IconButton icon={FaMinus} className={toggle === 1 ? "bg-lime-600" : "bg-neutral-400"}
                        onClick={() => setToggle(1)}/>
          </div>
          <Button className="bg-lime-600" onClick={() => document.getElementById("camInput")?.click()}>Open Scanner</Button>
          <input type="file" accept="image/*" capture="camera" className="hidden" id="camInput" onChangeCapture={() => runScan()}/>
        </div>
      </div>

      <img/>

    </main>
  )
}
