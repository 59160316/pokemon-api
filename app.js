const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) //for express use json format

class Pokemon {
    constructor(name, type) {
        this.name = name
        this.type = type
        this.id = null
    }
}

function generateNewId(num) {
    let newId = num + 1
    return newId
}

function createPokemon(name, type) {
    let p = new Pokemon(name, type)
    p.id = generateNewId(pokemons.length)
    return p
}

let pokemons = []

pokemons.push(createPokemon('Kirlia', 'Psychic'))
pokemons.push(createPokemon('Ralts', 'Psychic'))

app.get('/', (req, res) => res.send('Hello World'))

app.get('/pokemons', (req, res) => res.send(pokemons))

app.post('/pokemons', (req, res) => {
    let p = createPokemon(req.body.name, req.body.type)
    pokemons.push(p)
    res.sendStatus(201)
})


app.listen(port, () => console.log(`Example app listening on port ${port}`))