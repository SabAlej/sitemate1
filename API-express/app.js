const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/api', (req, res) => {
  res.send('API works');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
