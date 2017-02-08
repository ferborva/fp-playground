const express = require('express');
const artists = require('./artists.js');

const router = express.Router();

// Logger middleware
router.use((req, res, next) => {
  process.stdout.write('Sportify Router Accessed \n');
  next();
});

router.route('/')
      .get((req, res) => {
        const answer = {
          msg: 'Endpoint providing the Spotify Endpoints made available',
          baseUrl: 'https://api.spotify.com',
          endpoints: {
            search: '/v1/search',
            artists: '/v1/artists/{id}',
          },
        };
        res.json(answer);
      });

router.route('/search/artists')
      .get((req, res) => {
        res.json({ msg: 'This API endpoint requires a name to perform the search and allows for sorting and field requesting through query parameters' });
      });

router.get('/search/artists/:name', (req, res) => {
  // 1st Handle request:
  // Check:
  // - params
  // - query
  const name = req.params.name;

  artists.getArtists(name).fork(err => res.end(err), data => res.json(data));
});

exports = module.exports = router;
