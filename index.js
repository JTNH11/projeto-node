const express = require('express');
const app = express();

// Middleware pra aceitar JSON
app.use(express.json());

// Importa suas rotas
const rotas = require('./rotas/brasileirao.js');

// Usa as rotas
app.use('/times', rotas);

// Rota base (só pra teste)
app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

// Porta do servidor
const PORT = 3000;

// Liga o servidor
app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:" + PORT);
});