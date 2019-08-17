const express = require('express')
const app = express()

app.use(express.json()) //for express use json format

class Pokemon {
    constructor(name, type) {
        this.name = name
        this.type = type
        this.id = null
        this.type2 = null
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

function isSufficientParam(v) {
    return v !== undefined && v !== '' && v !== null
}

function isPokemonExitsted(id) {
    return pokemons[id - 1] !== undefined && pokemons[id - 1] !== null
}

let pokemons = []

pokemons.push(createPokemon('Kirlia', 'Psychic'))
pokemons.push(createPokemon('Ralts', 'Psychic'))

app.get('/', (req, res) => res.send({ message: 'Hello world'}))

app.get('/pokemons', (req, res) => res.send(pokemons))

app.post('/pokemons', (req, res) => {
    if (!isSufficientParam(req.body.name) || !isSufficientParam(req.body.type)) {
        res.status(400).send({ error: 'Insufficient parameters: name and type are required parameter' })
        return //return for make sure is end API stage in this case
    }

    let p = createPokemon(req.body.name, req.body.type)
    pokemons.push(p)
    res.sendStatus(201)
})

app.get('/pokemons/:id', (req, res) => {
    if (!isSufficientParam(req.params.id)) {
        res.status(400).send({ error: 'Insufficient parameters: id are required parameter' })
        return
    }

    let id = req.params.id
    let p = pokemons[id - 1]
    if (p === undefined) {
        res.status(400).send({ error: 'The pokemon could not be found' })
        return
    }
    res.send(p)
})

app.put('/pokemons/:id', (req, res) => {
    if (!isSufficientParam(req.body.type2)) {
        res.status(400).send({ error: 'Insufficient parameters: type2 are required parameter' })
        return
    }

    if (!isSufficientParam(req.params.id)) {
        res.status(400).send({ error: 'Insufficient parameters: id are required parameter' })
        return
    }

    let id = req.params.id
    let p = pokemons[id - 1]
    if (p === undefined) {
        res.status(400).send({ error: 'Cannot update pokemon: Pokemon is not found' })
        return
    }

    p.type2 = req.body.type2
    pokemons[id - 1] = p //make sure for save stage in Update Pokemon
    res.sendStatus(200)
})

app.delete('/pokemons/:id', (req, res) => {
    if (!isSufficientParam(req.params.id)) {
        res.status(400).send({ error: 'Insufficient parameters: id are required parameter' })
        return
    }
    let id = req.params.id
    if (!isPokemonExitsted(id)) {
        res.status(400).send({ error: 'Cannot delete pokemon: Pokemon is not found' })
        return
    }

    delete pokemons[id - 1]
    res.sendStatus(204)
})

module.exports = app

