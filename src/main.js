const numberOfImages = 2
const API_KEY = "live_ZWpJzXJApNGoH22LkJzraLUtJNvge83hs6ZNyqlXY7VUKt6jbM3l55d6NDzh5xoQ"
const API_URL = `https://api.thecatapi.com/v1/images/search?limit=${numberOfImages}&api_key=${API_KEY}`
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`

// TAREAS:
// 1) AGREGAR ARTICLE PARA IR MOSTRANDO LAS IMAGENES GUARDADAS EN FAVORITO EN EL NAVEDADOR
// 2) AGREGAR FUNCIONALIDAD (button) PARA PODER BORRER IMAGENES DE FAVORITOS (y que se eliminen del navegador)

const spanError = document.querySelector("#errorHandler")
const section = document.querySelector("#randomCats")
const favoriteSection = document.querySelector("#favorites")

document.addEventListener("DOMContentLoaded", async function() {
  await loadImages();
  await getFavorites();
});

async function render (data) {
  for (let index = 0; index < data.length; index++) {
    const newImage = document.createElement("img")
    const element = data[index];
    newImage.src = element.url
    const imageID = element.id
    newImage.width = 150

    const newButton = document.createElement("button")
    newButton.innerText = "Agregar a favoritos"
    newButton.onclick = () => saveFavorites(imageID)
    
    const newArticle = document.createElement("article")
    newArticle.append(newImage, newButton)
    section.append(newArticle)
  }
}

async function loadImages () {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    console.log("Loades images")
    console.log(data)

    render(data)

  } catch (error) {
    console.error(error)
  }
}

//Array para guardar id´s de favoritos y usar en la función deleteAllFavorites
let idArray = []; 

async function saveFavorites(id) {
  try {
    console.log(id)
    const response = await fetch(API_URL_FAVORITES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        image_id: id,
        sub_id: 'user-123',
      }),
    });

    getFavorites()

  } catch (error) {
    console.error(error);
    spanError.innerText = error;
  }
}

async function renderFavorites (data) {
  for (let index = 0; index < data.length; index++) {
    const newImage = document.createElement("img")
    const element = data[index];
    newImage.src = element.image.url
    const imageID = element.id
    newImage.width = 150

    const newButton = document.createElement("button")
    newButton.innerText = "Eliminar de favoritos"
    newButton.onclick = () => {
      deleteFavorites(imageID)
      newArticle.remove()
    }
    const newArticle = document.createElement("article")
    newArticle.append(newImage, newButton)
    favoriteSection.append(newArticle)
  }
}

async function getFavorites () {
  try {
      const response = await fetch(API_URL_FAVORITES)
      const data = await response.json()
      console.log("Favorites:")
      console.log(data)

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        idArray.push(element.id)
      }

      renderFavorites(data)

  } catch (error) {
      console.error(error)
      spanError.innerText = error
  }
}

async function deleteFavorites(id) {
  try {
    const response = await fetch(API_URL_FAVORITES_DELETE(id), {
      method: 'DELETE',
    },
    console.log("DELETED SUCCESSFULLY")
    );
  } catch (error) {
    console.error(error);
    spanError.innerText = error
  }
}

function deleteAllFavourites () {
  idArray.forEach(element => {
    deleteFavorites(element)
  });
  console.log("DELETE SUCCESSFULL")
}

const button = document.createElement("button")
button.innerText = "Reload"
document.body.appendChild(button)
button.addEventListener("click", loadImages)