const express = require('express')
const routes = require('./src/routes')
const cors = require('cors');
require('dotenv-safe').config();
const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Api rodando em http://localhost:${port}`)
})