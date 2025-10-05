const express = require('express');
const ProdutoDAO = require('./Produto');
const Logger = require('./Logger');

const app = express();
const PORT = 3000;

app.use(express.json());

const produtoDAO = new ProdutoDAO();

// Rota GET - listar produtos
app.get('/produtos', async (req, res) => {
  try {
    const produtos = await produtoDAO.findAll();
    res.json(produtos);
  } catch (err) {
    Logger.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// Rota POST - adicionar produto
app.post('/produtos', async (req, res) => {
  try {
    const result = await produtoDAO.insertOne(req.body);
    res.status(201).json({ message: "Produto inserido", id: result.insertedId });
  } catch (err) {
    Logger.error(err);
    res.status(500).json({ error: "Erro ao inserir produto" });
  }
});

// Rota GET - buscar produto por ID
app.get('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await produtoDAO.findById(id);

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.json(produto);

  } catch (err) {
    if (err.name === 'BSONError') {
      return res.status(400).json({ error: "ID inválido" });
    }
    Logger.error(err);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

// Rota DELETE por id
app.delete('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await produtoDAO.deleteById(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json({ message: "Produto deletado com sucesso" });

  } catch (err) {
    if (err.name === 'BSONError') {
      return res.status(400).json({ error: "ID inválido" });
    }
    Logger.error(err);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
});


app.listen(PORT, () => {
  Logger.info(`Servidor rodando em http://localhost:${PORT}`);
});