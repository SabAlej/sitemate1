const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const port = 3000;
const dataFile = '../data/data.json';

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('API works');
});

app.get('/issues', (req, res) => {
  fs.readFile(dataFile, (err, data) => {
    if (err) {
      console.error(err);
      res.status(502).json({ message: 'Error reading data' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/create', (req, res) => {
  const newIssue = req.body;
  fs.readFile(dataFile, (err, data) => {
    if (err) {
      console.error(err);
      res.status(502).json({ message: 'Error reading data' });
    } else {
      const jsonData = JSON.parse(data);
      jsonData.push(newIssue);
      fs.writeFile(dataFile, JSON.stringify(jsonData), err => {
        if (err) {
          console.error(err);
          res.status(502).json({ message: 'Error writing data' });
        } else {
          res.json(newIssue);
        }
      });
    }
  });
});

app.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedIssue = req.body;
  fs.readFile(dataFile, (err, data) => {
    if (err) {
      console.error(err);
      res.status(502).json({ message: 'Error reading data' });
    } else {
      const jsonData = JSON.parse(data);
      const index = jsonData.findIndex(issue => issue.id === id);
      jsonData[index] = updatedIssue;
      fs.writeFile(dataFile, JSON.stringify(jsonData), err => {
        if (err) {
          console.error(err);
          res.status(502).json({ message: 'Error writing data' });
        } else {
          res.json(updatedIssue);
        }
      });
    }
  });
});

app.delete('/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(dataFile, (err, data) => {
    if (err) {
      console.error(err);
      res.status(502).json({ message: 'Error reading data' });
    } else {
      const jsonData = JSON.parse(data);
      const index = jsonData.findIndex(issue => issue.id === id);
      jsonData.splice(index, 1);
      fs.writeFile(dataFile, JSON.stringify(jsonData), err => {
        if (err) {
          console.error(err);
          res.status(502).json({ message: 'Error writing data' });
        } else {
          res.json({ message: 'Issue deleted' });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
