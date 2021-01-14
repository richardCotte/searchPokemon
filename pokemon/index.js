const button = document.querySelector('button');

async function fetchPokeName(name) {
    if (name == "") {
        return null;
    };
    button.disabled = true;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
        alert("Pokemon not found");
        button.disabled = false;
        return null;
    };
    const pokemon = await response.json();
    button.disabled = false;
    return pokemon;
};

function addPokemonToDom(pokemon) {
    const body = document.querySelector("body");
    const poke_card = document.querySelector('.poke-card');
    console.log(poke_card);
    const new_poke_card = poke_card.cloneNode(true);
    body.appendChild(new_poke_card);
    new_poke_card.classList.remove("hidden");
    const poke_name = new_poke_card.querySelector('.name');
    const poke_weight = new_poke_card.querySelector('.weight');
    const poke_types = new_poke_card.querySelector('.types');
    const poke_sprite = new_poke_card.querySelector('.sprite');
    poke_name.textContent = pokemon.name;
    poke_weight.textContent = `${pokemon.weight}kg`;
    poke_sprite.setAttribute("src", pokemon.sprites.front_default);
    poke_types.textContent = "";
    pokemon.types.forEach((type) => {
        const pokemonSpan = document.createElement('span');
        pokemonSpan.textContent = `${type.type.name}`;
        pokemonSpan.setAttribute("class", "type");
        poke_types.appendChild(pokemonSpan);
    });
}

async function search() {
    var search_name = document.getElementById("poke-search").value;
    console.log("Founding " + search_name);
    const pokemon = await fetchPokeName(search_name);
    if (pokemon){
        addPokemonToDom(pokemon);
    };
};

button.addEventListener('click', search);