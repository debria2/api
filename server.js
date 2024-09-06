const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Dados de exemplo
const tendencias = [
    { id: 1, nome: 'Moda minimalista', descricao: 'Estilo simples e clean.' },
    { id: 2, nome: 'Cores neon', descricao: 'Estilo vibrante e chamativo.' },
];

// Endpoint para listar tendências
app.get('/tendencias', (req, res) => {
    res.json(tendencias);
});

// Endpoint para obter uma tendência específica
app.get('/tendencias/:id', (req, res) => {
    const tendencia = tendencias.find(t => t.id === parseInt(req.params.id));
    if (!tendencia) return res.status(404).send('Tendência não encontrada.');
    res.json(tendencia);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
