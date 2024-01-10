"use client";
import Input from "@/components/ui/Input";
import {TabSelector} from "@/components/ui/tabs/TabSelector";
import {useState} from "react";
import Tab from "@/components/ui/tabs/Tab";
import IconButton from "@/components/ui/buttons/IconButton";
import {FaMinus, FaPlus} from "react-icons/fa6";
import Button from "@/components/ui/buttons/Button";
import food from "../food.json"

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);
  const [toggle, setToggle] = useState(0);
  const [inv, setInv] = useState<any[]>(food);

  async function runScan() {
    //Uploading the file
    const input = document.getElementById("camInput");
    // @ts-ignore
    const file = input?.files[0];
    const formdata = new FormData();
    formdata.append("imagedata", file)
    formdata.append("access_token", "omlvnTGU7oOAG0POpTRgWOe0Xm1BE_YGeMoDLjv4eMI")

    const uploadUrl = "https://upload.gyazo.com/api/upload"

    const data = await fetch(uploadUrl, {
      method: "POST",
      body: formdata
    })

    const uploadRes = await data.json();

    // For ClarifAI
    const pat = 'c1d7cdd443654f16bc7a64d3d77d3b88';
    const userId = 'clarifai';
    const appId = 'main';
    const modelId = 'food-item-recognition';
    const modelVersionId = '1d5fd481e0cf4826aa72ec3ff049e044';
    const imgUrl = uploadRes.url;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": userId,
        "app_id": appId
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": imgUrl
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + pat
      },
      body: raw
    };

    const req = await fetch("https://api.clarifai.com/v2/models/" + modelId + "/versions/" + modelVersionId + "/outputs", requestOptions);
    const aiRes = await req.json();
    const productName = aiRes.outputs[0].data.concepts[0].name;

    if (toggle === 0) {
      alert(productName + " was added to your storage.");
    } else alert(productName + " was removed from your storage.");

    let icon = "❓";
    switch (productName) {
      case "orange":
        icon = "🍊";
        break;
      case "tomato":
        icon = "🍅";
        break;
    }

    let category = "Vegetables";
    switch (productName) {
      case "orange":
        category = "Fruit";
        break;
    }

    if (toggle === 0) {
      setInv(prevInv => {
        // Use map to update the specific category
        return prevInv.map(categoryObj => {
          if (categoryObj.name === category) {
            // Use spread operator to create a new category object
            return {
              ...categoryObj,
              items: [
                // Keep the existing items and add the new item
                ...categoryObj.items,
                {
                  name: productName.charAt(0).toUpperCase() + productName.slice(1),
                  icon: icon,
                  amount: "1 pcs",
                },
              ],
            };
          }
          // Return unchanged category objects
          return categoryObj;
        });
      });
    } else {
      setInv(prevInv => {
        return prevInv.map(categoryObj => {
          if (categoryObj.name === category) {
            return {
              ...categoryObj,
              items: categoryObj.items.filter((item: any) => item.name.toLowerCase() !== productName.toLowerCase()),
            };
          }
          return categoryObj;
        });
      });
    }
  }

  // @ts-ignore
  return (
    <main className="px-4 py-4 sm:px-8 sm:py-8">
      <h3 className="text-5xl sm:text-6xl font-bold">Your Food</h3>
      <TabSelector currentTab={currentTab} tabs={inv.map(cat => cat.name)}
                   setCurrentTab={setCurrentTab}/>
      <Input id="search" type="search" className="max-w-md mt-2 sm:text-xl" placeholder="Search..."/>

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
          <div className="flex justify-center space-x-3 mb-2">
            <IconButton icon={FaPlus} className={toggle === 0 ? "bg-lime-600" : "bg-slate-400"}
                        onClick={() => setToggle(0)}/>
            <IconButton icon={FaMinus} className={toggle === 1 ? "bg-lime-600" : "bg-slate-400"}
                        onClick={() => setToggle(1)}/>
          </div>
          <Button className="bg-lime-600" onClick={() => document.getElementById("camInput")?.click()}>Open
            Scanner</Button>
          {/* @ts-ignore */}
          <input type="file" accept="image/*" capture="camera" className="hidden" id="camInput"
                 onChangeCapture={() => runScan()}/>
        </div>
      </div>


    </main>
  )
}
