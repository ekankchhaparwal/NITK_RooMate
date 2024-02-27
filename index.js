const express = require('express');
const bodyParser =  require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());

const authorization = require('./routes/authorization');
const register = require('./routes/register')

app.use('/routes/authorization/', authorization);
app.use('/routes/register/', register);



app.listen(PORT, () => console.log(`Serve running on port: http://localhost:${PORT}`))