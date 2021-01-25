const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generateHTML = pokemons => {
  return lisPokemons = pokemons.reduce((accumalator, { name, id, types }) => {
     const elementsTypes = types.map(typeinfo => typeinfo.type.name);
       accumalator += 
       `<li class="card ${elementsTypes[0]}">
         <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />
         <h2 class="card-title">${id}. ${name}</h2>
         <p class="card-subtitle">${elementsTypes.join(` | `)}</p>
       </li>`;
       return accumalator;
   }, '')

};

const insertPokemonsIntoDom = pokemons => {
  const listUl = document.querySelector('[data-js="pokedex"]');
  listUl.innerHTML = pokemons;
};


let pokemonPromisses = [];

for (let i = 1; i <= 150; i++) {
  pokemonPromisses.push(fetch(getPokemonUrl(i))
    .then(response => response.json())
    .then(pokemon => pokemon));
}

Promise.all(pokemonPromisses)
  .then(generateHTML).then(insertPokemonsIntoDom);  