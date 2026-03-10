const express = require('express');
const router = express.Router();
const clientPromise = require("../banco-de-dados/config");
const { ObjectId } = require("mongodb");

router.get('/', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("jplima_db"); 
    const contatos = await db.collection("pokemon").find({}).toArray();
    res.json(contatos);
  } catch (err) {
    console.error("Erro ao buscar contatos:", err);
    res.status(500).json({ error: "Erro ao buscar contatos" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const client = await clientPromise;
    const db = client.db("jplima_db");

    const pokemon = await db
      .collection("pokemon")
      .findOne({ _id: new ObjectId(id) });

    if (!pokemon) {
      return res.status(404).json({ error: "pokemon não encontrado." });
    }

    res.json(pokemon);
  } catch (err) {
    console.error("Erro ao buscar pokemon:", err);
    res.status(500).json({ error: "Erro ao buscar pokemon." });
  }
});

router.get('/download/:id', async (req, res) => {
   const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const client = await clientPromise;
    const db = client.db("jplima_db");

    const pokemon = await db
      .collection("pokemon")
      .findOne({ _id: new ObjectId(id) });

    if (!pokemon) {
      return res.status(404).json({ error: "pokemon não encontrado." });
    }
   
  // Configura o header para download
  res.setHeader("Content-Disposition", "attachment; filename=exemplo.txt");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  res.send(pokemon);
  
  } catch (err) {
    console.error("Erro ao buscar times:", err);
    res.status(500).json({ error: "Erro ao buscar times." });
  }

});

router.post("/", async (req, res) => {
  const funcionario = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("joao-pedro-paim");

    const result = await db.collection("brasileiro").insertOne(funcionario);

    res.status(201).json({
      message: "Funcionário inserido com sucesso!",
      id: result.insertedId,
    });
  } catch (err) {
    console.error("Erro ao inserir funcionário:", err);
    res.status(500).json({ error: "Erro ao inserir funcionário." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const client = await clientPromise;
    const db = client.db("jplima_db");

    const result = await db
      .collection("pokemon")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "pokemon não encontrado." });
    }

    res.json({ message: "pokemon deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar pokemon:", err);
    res.status(500).json({ error: "Erro ao deletar pokemon." });
  }
});

router.post("/", async (req, res) => {
  const funcionario = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");

    const result = await db.collection("funcionarios").insertOne(funcionario);

    res.status(201).json({
      message: "Funcionário inserido com sucesso!",
      id: result.insertedId,
    });
  } catch (err) {
    console.error("Erro ao inserir funcionário:", err);
    res.status(500).json({ error: "Erro ao inserir funcionário." });
  }
});


module.exports = router;