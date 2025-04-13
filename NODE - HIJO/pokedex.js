const Pokedex = require('pokedex.js')

const pokedex = new Pokedex('en')

console.log(pokedex.name('Pikachu').getPokemonAsJson())

console.log(pokedex.id(26).getPokemonAsJson)