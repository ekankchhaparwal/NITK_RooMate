


const express = require('express');
const bodyParser =  require('body-parser');

const usersRoutes =  require('./routes/users.js');


const app = express();
const PORT = 5000;

app.use(express.json());
app.use(bodyParser.json());

app.use('/users',usersRoutes);




app.listen(PORT, () => console.log(`Serve running on port: http://localhost:${PORT}`))