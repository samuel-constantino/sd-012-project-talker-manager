const express = require('express');

const bodyParser = require('body-parser');

const { talkerRouter, loginRouter } = require('./routes');

const { error } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);

app.use('/', loginRouter);

app.use(error);

app.listen(PORT, () => {
  console.log('Online');
});
