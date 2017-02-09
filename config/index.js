const fs = require('fs');

const twitterConfig = fs.readFileSync('./config/private/twitter.json', 'utf-8');

module.exports = exports = {
  twitterConfig,
};
