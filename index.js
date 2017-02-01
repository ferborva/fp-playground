const express = require('express');
const path = require('path');
const usersRouter = require('./apis/users/router');

const app = express();
const port = 3000;

// Define statics file
app.use('/web', express.static(path.join(__dirname, 'webs')));

// Define API subrouters
app.use('/api/users', usersRouter);

app.listen(port, () => {
  process.stdout.write(`Server started on port ${port} \n\n`);
});
