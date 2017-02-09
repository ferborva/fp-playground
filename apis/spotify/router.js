const express = require('express');
const artists = require('./artists.js');
const R = require('ramda');

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
  /**
   * Data Flow:
   *
   * name (String)        required
   * queryParams (Object) optional  { fields: Comma,Separeted,Strings , sortField: String}
   *
   * => Request Data
   * => Filter Data if 'fields'
   */

  // 1st Handle request:
  // Check:
  // - params
  // - query

  const name = req.params.name;
  const defaultFields = ['external_urls', 'followers', 'id', 'images', 'name'];
  const fieldsFilter = req.query.fields ? req.query.fields.split(',') : defaultFields;

  artists.getArtists(name)
    .map(R.prop('artists'))
    .map(R.prop('items'))
    .map(R.map(R.pick(fieldsFilter)))
    .fork(err => res.end(err), data => res.json(data));
});

exports = module.exports = router;
