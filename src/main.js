const numberOfImages = 2
const API_KEY = "live_ZWpJzXJApNGoH22LkJzraLUtJNvge83hs6ZNyqlXY7VUKt6jbM3l55d6NDzh5xoQ"
const API_URL = `https://api.thecatapi.com/v1/images/search?limit=${numberOfImages}&api_key=${API_KEY}`
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`

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
    newButton.onclick = async () => {
      saveFavorites(imageID)
      // TAREA: Recargar solo la imagen que guardé en favoritos
      loadImages()
    }
    
    const newArticle = document.createElement("article")
    newArticle.append(newImage, newButton)
    section.append(newArticle)
  }
}

async function loadImages () {
  try {
    // Limpiar la sección de imagenes random antes de renderizarlas
    section.innerHTML = "<h2> Random Cats </h2>";

    const response = await fetch(API_URL)
    const data = await response.json()
    console.log("Loades images:")
    console.log(data)
    
    render(data)

  } catch (error) {
    console.error(error)
  }
}

let idArray = []; //Array para guardar id´s de favoritos y usar en la función deleteAllFavorites

async function saveFavorites(id) {
  try {
    console.log(id)

    if (!idArray.includes(id)) {
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
    } else {
      console.log("El id ya está en favoritos")
    }

    getFavorites()

  } catch (error) {
    console.error(error);
    spanError.innerText = error;
  }
}

async function renderFavorites (data) {
  favoriteSection.innerHTML = "<h2> Favorite Cats </h2>";  // Limpiar la sección de favoritos antes de renderizar

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

      idArray = []; // Limpiar el array de id's antes de llenarlo con los nuevos favoritos

      // Guardar id´s en un array
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
    });

  } catch (error) {
    console.error(error);
    spanError.innerText = error
  }
}

function deleteAllFavourites () {
  idArray.forEach(element => {
    deleteFavorites(element)
  });

  favoriteSection.innerHTML = "<h2> Favorite Cats </h2>";  // Limpiar la sección de favoritos
  console.log("DELETED SUCCESSFULLY")
}

const button = document.createElement("button")
button.innerText = "Reload"
document.body.appendChild(button)
button.addEventListener("click", loadImages)