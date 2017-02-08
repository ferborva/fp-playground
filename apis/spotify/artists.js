const request = require('superagent');

const getArtists = (artist) => {
  // Abstract call to spotify. Only logs to the server console
  request
    .get('https://api.spotify.com/v1/search')
    .query({ type: 'artist' })
    .query({ q: artist })
    .end((err, res) => process.stdout.write(JSON.stringify(res.body)));

  return [];
};

exports = module.exports = {
  getArtists,
};
