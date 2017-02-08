const express = require('express');
const parseArgs = require('minimist');
const path = require('path');

/**
 * Import APIS
 */
const usersRouter = require('./apis/users/router');

/**
 * Parse process arguments on app load
 */
const argvParserOpts = {
  default: {
    port: 4200,
  },
};
const argv = parseArgs(process.argv.slice(2), argvParserOpts);

/**
 * Init Express app
 */
const app = express();


/**
 * Define statics url served
 */
app.use('/web', express.static(path.join(__dirname, 'public')));


/**
 * Setup Subrouters
 */
app.use('/api/users', usersRouter);


/**
 * Start the server
 */
app.listen(argv.port, () => {
  process.stdout.write(`Server started on port ${argv.port} \n\n`);
});
