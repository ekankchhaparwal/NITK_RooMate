const express = require('express');
const bodyParser =  require('body-parser');
const fs = require('fs');
const path = require('path'); 
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());

const authorization = require('./routes/authorization');
const register = require('./routes/register')

app.use('/routes/authorization/', authorization);
app.use('/routes/register/', register);

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'frontend/screens/SignUpPage.html');
    fs.readFile(indexPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading index.html:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.send(data);
    });
  });

app.use(express.static('frontend'));
app.listen(PORT, () => console.log(`Serve running on port: http://localhost:${PORT}`))