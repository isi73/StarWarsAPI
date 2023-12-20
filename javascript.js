//////////////////////////////////////////////////////////////
//Este codigo es el bueno, para cargar los cards directamente
/////////////////////////////////////////////////////////////
const formulario = document.getElementById("busqueda");
const inputNombre = document.getElementById("nombre");
const divResultados = document.querySelector(".resultados");
const urlCharacters = "https://akabab.github.io/starwars-api/api/all.json";
const plantillaPersonajes = document.querySelector("#template-card").content;

async function getCharactersByName(name) {
    const urlFetch = urlCharacters + "?name=" + name;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

function pintarPersonajes(personajes) {
    // Limpia el contenido actual de divResultados


    const fragment = document.createDocumentFragment();

    personajes.forEach(personaje => {
        // Clona la plantilla antes de asignar valores
        const clone = plantillaPersonajes.cloneNode(true);

        clone.querySelector("h4").textContent = personaje.name;
        clone.querySelector(".especie span").textContent = personaje.species;
        if (Number(personaje.born) < 0) {
            const bornValue = Math.abs(Number(personaje.born));
            clone.querySelector(".born span").textContent = bornValue + " BBY"; // Otra cosa que quieres escribir
        } else {
            clone.querySelector(".born span").textContent = personaje.born + "ABY";
        }
        clone.querySelector(".planeta a").textContent = personaje.homeworld;
        clone.querySelector(".genero span").textContent = personaje.gender;
        clone.querySelector("img").setAttribute("src", personaje.image);
        clone.querySelector("img").setAttribute("alt", personaje.name);
        clone.querySelector(".planeta a").setAttribute("href", "https://starwars.fandom.com/wiki/" + personaje.homeworld);

        fragment.appendChild(clone);
    });

    // Agrega el fragmento al div de resultados
    divResultados.appendChild(fragment);
}

// Llama a getCharactersByName al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    getCharactersByName().then(characters => {
        console.log(characters);
        pintarPersonajes(characters);
    });
});