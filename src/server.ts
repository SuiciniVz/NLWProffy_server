import express from 'express';

const app = express();
app.use(express.json())

// GET: Busca ou atualiza uma informação
// POST: Cria alguma informação
// PUT: Atualiza uma informação ja existente
// DELETE: Deleta uma informação ja existente

app.get('/', (req, res) => {
  return res.json({message: 'Hello world'});
});

app.listen(3333);