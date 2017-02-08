const request = require('superagent');
const Future = require('ramda-fantasy').Future;

const getArtists = name =>
  Future((reject, resolve) => {
    request
      .get('https://api.spotify.com/v1/search')
      .query({ type: 'artist' })
      .query({ q: name })
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res.body);
      });
  });

exports = module.exports = {
  getArtists,
};
