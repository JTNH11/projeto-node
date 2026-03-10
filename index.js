const express = require('express');
const app = express();
const contatosRoutes = require("./routes/contatos.js");
const fs = require('fs');
const data = fs.readFileSync("arquivo.txt");
const EventEmitter = require("events");
app.use(express.json());
const fsAssincrono = require('fs').promises;

fs.readFile('texto.txt', 'utf8', (err, data) => {
  if (err) {
    // console.error('Erro ao ler o arquivo:', err);
    return;
  }

  // console.log('Conteúdo do arquivo:', data);
});

fs.writeFile('arquivo5.txt', 'Olá, mundo!', (err) => {
  if (err) {
    // console.error('Erro ao escrever o arquivo:', err);
    return;
  }

  // console.log('Arquivo criado com sucesso!');
});

async function salvarUsuario() {
  const usuario = {
    nome: "Ana",
    idade: 25,
    email: "ana@email.com"
  };

  // converte objeto JS em JSON
  const json = JSON.stringify(usuario, null, 2);

  await fsAssincrono.writeFile('usuario.json', json);
  // console.log('Usuário salvo com sucesso!');
}

salvarUsuario();

async function lerUsuario() {
  const arquivo = await fsAssincrono.readFile('usuario.json', 'utf8');

  // converte JSON em objeto JS
  const usuario = JSON.parse(arquivo);

  // console.log(usuario.nome);   
  // console.log(usuario.idade);  
}

lerUsuario();

async function adicionarUsuario() {
  const dados = await fsAssincrono.readFile('usuarios.json', 'utf8');
  const usuarios = JSON.parse(dados);

  usuarios.push({ nome: "Maria", idade: 22 });

  await fsAssincrono.writeFile(
    'usuarios.json',
    JSON.stringify(usuarios, null, 2)
  );

  // console.log('Usuário adicionado!');
}

adicionarUsuario();


app.get("/download", (req, res) => {
  const conteudo = `Olá! Este é um arquivo TXT gerado dinamicamente com Node.js. Data: ${new Date().toLocaleString()}`;
 // Configura o header para download
  res.setHeader("Content-Disposition", "attachment; filename=exemplo.txt");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  res.send(conteudo);
});
app.use("/pokemon", contatosRoutes);
// app.get("/", (req, res) => {
//   res.send("Api rodando! Coloque as rotas corretamente");
// });

const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });

const stream = fs.createWriteStream("saida.txt");

stream.write("Node.js Streams\n");
stream.end();

module.exports = app;
