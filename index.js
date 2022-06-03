const page = document.querySelector('#pokedex-page')

const color = {
    grass: "#90EE90",
    poison: "#9370DB",
    water: "#87CEFA",
    fire: "#FFA500",
    flying: "#00BFFF",
    bug: "#9ACD32",
    normal: "#C0C0C0",
    electric: "#FFFF00",
    ground: "#EEE8AA",
    fairy: "#FFE4E1",
    fighting: "#D2691E",
    psychic: "#EE82EE",
    rock: "#CD853F",
    steel: "#778899",
    ice: "#00CED1",
    ghost: "#7B68EE",
    dragon: "#FA8072"
}

fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    .then(response => {
        return response.json()
    })
        .then(async data => {
           const box = document.querySelector('#pokemon-box')
           page.innerHTML = ''

           for (let i = 0; i < data.results.length; i++) {
                box.querySelector('#pokemon-name').innerHTML = data.results[i].name
                box.querySelector('#pokemon-name').style.textTransform = "capitalize"

                const pokemonImage = await fetch('https://pokeapi.co/api/v2/pokemon-form/' + data.results[i].name)
                const image = await pokemonImage.json()
                box.querySelector('#pokemon-img').src = image.sprites.front_default

                const pokemonType = await fetch('https://pokeapi.co/api/v2/pokemon-form/' + data.results[i].name)
                const type = await pokemonType.json()

                box.querySelector('#pokemon-type').innerHTML = ''
                for(let j = 0; j < type.types.length; j++) {
                    const nameType = document.createElement("span")
                    nameType.appendChild(document.createTextNode(type.types[j].type.name))
                    nameType.style.backgroundColor = color[type.types[j].type.name]
                    nameType.style.padding = "4px"
                    nameType.style.margin = "2px"
                    nameType.style.borderRadius = "4px"
                    box.querySelector('#pokemon-type').appendChild(nameType)
                }

                page.innerHTML += box.outerHTML
           }
       })