const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

// Pegando a URL do Mongo do ambiente ou usando uma padrão
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/semana09db';

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB com sucesso'))
.catch((err) => console.error('❌ Erro ao conectar no MongoDB:', err));

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta: ${PORT}`);
});