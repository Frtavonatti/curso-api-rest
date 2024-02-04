const API_URL = "https://api.thecatapi.com/v1/images/search?limit=3"
const API_KEY = "live_gTmJb4C012uusw2Ge6O8HeXMrl6YGYJPXWyxIRP4ugyUR9mhYvJ7dHI5fcQtjOsX"
const KEY_EXAMPLE = ` https://api.thecatapi.com/v1/images/search?limit=3&breed_ids=beng&api_key=${API_KEY}` 

const image1 = document.querySelector("#img1")
const image2 = document.querySelector("#img2")
const image3 = document.querySelector("#img3")

document.addEventListener("DOMContentLoaded", fetchData)

// fetch(URL)
// .then(response => response.json())
// .then(data => {
//     image.src = data[0].url
// })

async function fetchData () {
  try {
      const response = await fetch(KEY_EXAMPLE)
      const data = await response.json()
      console.log(data)
      image1.src = data[0].url
      image2.src = data[1].url
      image3.src = data[2].url
  } catch (error) {
      console.error(error)
  }
}

const button = document.createElement("button")
button.innerText = "New Cat"
document.body.appendChild(button)
button.addEventListener("click", fetchData)