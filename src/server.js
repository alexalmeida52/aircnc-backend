const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes.js')
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/semana09db';
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('✅ Conectado ao MongoDB com sucesso'))
.catch((err) => console.error('❌ Erro ao conectar no MongoDB:', err));

const app = express()
const server = http.Server(app)
const io = socketio(server)

const connectedUsers = {}

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`)
    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers
    return next()
})

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta: ${PORT}`);
});