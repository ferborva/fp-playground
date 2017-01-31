const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Define statics file
app.use('/web', express.static(path.join(__dirname, 'webs')));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  process.stdout.write(`Server started on port ${port}`);
});
