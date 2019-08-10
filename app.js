const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) //for express use json format

let pokemons = [
    { name: 'Kirlia', type: 'Psychic' },
    { name: 'Ralts', type: 'Psychic' },
    { name: 'Shiftry', type: 'Grass' }
]

app.get('/', (req, res) => res.send('Hello World'))

app.get('/pokemons', (req, res) => res.send(pokemons))

app.post('/pokemons', (req, res) => {
    pokemons.push(req.body)
    res.sendStatus(201)
})


app.listen(port, () => console.log(`Example app listening on port ${port}`))