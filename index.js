const express = require('express');
const parseArgs = require('minimist');
const path = require('path');
const morgan = require('morgan');

/**
 * Import APIS
 */
const usersRouter = require('./apis/users/router');
const spotifyRouter = require('./apis/spotify/router');
const twitterRouter = require('./apis/twitter/router');
const chuckRouter = require('./apis/chuck/router');

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
 * Setup basic middleware
 */
app.use(morgan('tiny'));

/**
 * Define statics url served
 */
app.use('/web', express.static(path.join(__dirname, 'public')));


/**
 * Setup Subrouters
 */
app.use('/api/users', usersRouter);
app.use('/api/spotify', spotifyRouter);
app.use('/api/twitter', twitterRouter);
app.use('/api/chuck', chuckRouter);


/**
 * Start the server
 */
app.listen(argv.port, () => {
  process.stdout.write(`Server started on port ${argv.port} \n\n`);
});
