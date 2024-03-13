const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;
const data = fs.readFileSync('../data/data.json');

app.get('/', (req, res) => {
  res.send('API works');
});

app.get('/issues', (req, res) => {
  if (data) {
    res.send(JSON.parse(data));
  } else {
    res.send('No data found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
