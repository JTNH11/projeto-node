const express = require('express');
const router = express.Router();
const clientPromise = require("../banco-de-dados/config");
const { ObjectId } = require("mongodb");

router.get('/', async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("jplima_db"); 
    const contatos = await db.collection("brasileiro").find({}).toArray();
    res.json(contatos);
  } catch (err) {
    console.error("Erro ao buscar time:", err);
    res.status(500).json({ error: "Erro ao buscar time" });
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

    const times = await db
      .collection("brasileiro")
      .findOne({ _id: new ObjectId(id) });

    if (!times) {
      return res.status(404).json({ error: "times não encontrado." });
    }

    res.json(times);
  } catch (err) {
    console.error("Erro ao buscar times:", err);
    res.status(500).json({ error: "Erro ao buscar times." });
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

    const times = await db
      .collection("brasileiro")
      .findOne({ _id: new ObjectId(id) });

    if (!times) {
      return res.status(404).json({ error: "time não encontrado." });
    }
   
    res.setHeader("Content-Disposition", "attachment; filename=exemplo.txt");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    res.send(times);
  
  } catch (err) {
    console.error("Erro ao buscar times:", err);
    res.status(500).json({ error: "Erro ao buscar times." });
  }
});

router.post("/", async (req, res) => {
  const times = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("jplima_db");

    const result = await db.collection("brasileiro").insertMany(times);

    res.status(201).json({
      message: "Time inserido com sucesso!",
      id: result.insertedId,
    });
  } catch (err) {
    console.error("Erro ao inserir times:", err);
    res.status(500).json({ error: "Erro ao inserir times." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const client = await clientPromise;
    const db = client.db("jplima_db");

    const result = await db
      .collection("brasileiro")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "time não encontrado." });
    }

    res.json({ message: "time deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar times:", err);
    res.status(500).json({ error: "Erro ao deletar times." });
  }
});

module.exports = router;