// const http = require('http') // carga modulo

const { response } = require("express")

const express = require('express')
const app = express()
const logger = require('./loggerMiddleware')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(logger)

const notes = 
    [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }
]


// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type': 'aplication/json'})
//     response.end(JSON.stringify(notes))
// }), 

app.get('/', (request, response) => {
    response.send('<h1>Hola mundo <h1/>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})


app.get('/api/notes/:id', (request, response) => {
    const id = Number( request.params.id)
    console.log(id)
    const note = notes.find(note => note.id === id)
    if (note) {

        response.send(note)
    }else {
        response.send(404).end()
    }
})


app.delete(
    'api/notes/:id', (request, response) => {
        const id = Number(request.params.id)
        const notes = notes.filter(note.id !== id)
        response.status(204).end()
    }
)

app.post('api/notes', (request, response) => {
    const note = request.body
    const ids = note.map(note => note.id)
    const idMax = Math.max(...ids)

    const newNote = {
        id: idMax + 1,
        content: note.content,
        important: typeof note.import !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    const notes = [...notes, newNote]

    request.json(newNote)
})

app.use((request, response) => {
    response.status(404).json({
        error: "NOT FOUND"
    })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log("Server running on port $(PORT)");
})

// api rest
// .get
// .post
// .del
// .put/api/notes/2 