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
    const poke_list = document.querySelector('.poke_list');
    const poke_card = document.querySelector('.poke-card');
    const new_poke_card = poke_card.cloneNode(true);
    poke_list.appendChild(new_poke_card);
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
    const poke_list = document.querySelector('.poke_list');
    let search_name = document.getElementById("poke-search").value;
    console.log("Founding " + search_name);
    const pokemon = await fetchPokeName(search_name);
    tablo.push(pokemon);
    console.log(tablo);
    poke_list.textContent ="";
    if (pokemon) {
        tablo.forEach (addPokemonToDom);
    };
};

let tablo = [];
button.addEventListener('click', search);