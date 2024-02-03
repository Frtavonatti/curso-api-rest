const URL = "https://api.thecatapi.com/v1/images/search"
const image = document.querySelector("img")

//Solicitar data a la API con Promesas
// fetch(URL)
// .then(response => response.json())
// .then(data => {
//     image.src = data[0].url
// })

//Solicitar data a la API con Async/Await
async function fetchData() {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      image.src = data[0].url;
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  }
  fetchData();

//Crear nuevo boton
const button = document.createElement("button")
button.innerText = "New Cat"
document.body.appendChild(button)