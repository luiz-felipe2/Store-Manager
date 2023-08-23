const express = require('express');
const router = require('./routes');

const app = express();

// fazendo com que o app possa usar json nas requisicoes.
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use(router);

module.exports = app;
