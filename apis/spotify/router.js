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

router.get('/artists', (req, res) => {
  artists.getArtists('bono');
  res.json({ ms: 'TODO' });
});

exports = module.exports = router;
