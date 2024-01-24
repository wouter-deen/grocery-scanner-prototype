import {Dispatch, SetStateAction} from "react";

export async function runScan(setInv: Dispatch<SetStateAction<any[]>>) {
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

  alert(productName + " was added to your storage.");

  let category = "Vegetables";

  // Hard coded icons for now
  let icon = "❓";
  switch (productName) {
    case "orange":
      icon = "🍊";
      category = "Fruit";
      break;
    case "tomato":
      icon = "🍅";
      category = "Vegetables";
      break;
    case "cucumber":
      icon = "🥒";
      category = "Vegetables";
      break;
    case "broccoli":
      icon = "🥦";
      category = "Vegetables";
      break;
    case "carrot":
      icon = "🥕";
      category = "Vegetables";
      break;
    case "banana":
      icon = "🍌";
      category = "Fruit";
      break;
    case "apple":
      icon = "🍎";
      category = "Fruit";
      break;
    case "strawberry":
      icon = "🍓";
      category = "Fruit";
      break;
    case "grape":
      icon = "🍇";
      category = "Fruit";
      break;
    case "lemon":
      icon = "🍋";
      category = "Fruit";
      break;
    case "avocado":
      icon = "🥑";
      category = "Vegetables";
      break;
  }


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
}