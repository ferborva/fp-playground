const express = require('express');
const request = require('superagent');
const Future = require('ramda-fantasy').Future;
const R = require('ramda');

const router = express.Router();

/**
 * Helper functions
 */

const myLogger = (txt) => {
  process.stdout.write(txt);
  process.stdout.write('\n');
};

/**
 * Get From Url
 */
const getFromUrl = (url, query = {}) =>
  Future((reject, resolve) => {
    request
      .get(url)
      .query(query)
      .end((err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data.body);
      });
  });

/**
 * Get Random Joke
 */
const getRandomJoke = getFromUrl('https://api.icndb.com/jokes/random')
                        .map(R.prop('value'))
                        .map(R.prop('joke'));

/**
 * Get Random Gif
 */
// const giphyAPIKey = 'dc6zaTOxFJmzC';
const getRandomnGif = getFromUrl('https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=chuck%20norris')
                        .map(R.prop('data'))
                        .map(R.prop('image_original_url'));

/**
 * Combine Joke and Gif
 */
const combineJokeGif = Future.of(joke => gif => ({ joke, gif }));

// Logger middleware
router.use((req, res, next) => {
  process.stdout.write('Chuck Router Accessed \n');
  next();
});

router.route('/')
      .get((req, res) => {
        // Get all users
        res.json({ msg: 'Killer new stuff with ChuckNorris jokes and Giphy' });
      });

router.route('/random')
      .get((req, res) => {
        combineJokeGif
          .ap(getRandomJoke)
          .ap(getRandomnGif)
          .fork((e) => {
            myLogger('Error on one of the HTTP API Calls');
            return res.json(e);
          }, (r) => {
            myLogger('SUCCESS ON RANDOM DATA REQUEST!');
            return res.json(r);
          });
      });

exports = module.exports = router;
