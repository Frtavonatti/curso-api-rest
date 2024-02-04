const API_URL = "https://api.thecatapi.com/v1/images/search?limit=3"
const API_KEY = "live_ZWpJzXJApNGoH22LkJzraLUtJNvge83hs6ZNyqlXY7VUKt6jbM3l55d6NDzh5xoQ"
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites?limit=3&api_key=${API_KEY}`


const spanError = document.querySelector("#errorHandler")
const image1 = document.querySelector("#img1")
const image2 = document.querySelector("#img2")
const image3 = document.querySelector("#img3")
const image4 = document.querySelector("#img4")

document.addEventListener("DOMContentLoaded", async function() {
  await fetchData();
  await saveFavorites()
  await getFavorites();
});

let imageID;

async function fetchData () {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    image1.src = data[0].url
    image2.src = data[1].url
    image3.src = data[2].url
    
    imageID = data[0].id;
    console.log(imageID);

  } catch (error) {
    console.error(error)
  }
}

async function saveFavorites() {
  try {
    const response = await fetch(API_URL_FAVORITES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        image_id: imageID,
        sub_id: 'user-123',
      }),
    });
  } catch (error) {
    console.error(error);
    spanError.innerText = error;
  }
}

async function getFavorites () {
  try {
      const response = await fetch(API_URL_FAVORITES)
      const data = await response.json()
      console.log(data);
  } catch (error) {
      console.error(error)
      spanError.innerText = error
  }
}

const button = document.createElement("button")
button.innerText = "Reload"
document.body.appendChild(button)
button.addEventListener("click", fetchData)