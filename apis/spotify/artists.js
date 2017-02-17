const request = require('superagent');
const Future = require('ramda-fantasy').Future;

// const getArtists = name =>
//   Future((reject, resolve) => {
//     request
//       .get('https://api.spotify.com/v1/search')
//       .query({ type: 'artist' })
//       .query({ q: name })
//       .end((err, res) => {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(res.body);
//       });
//   });

/**
 * Helper Functions
 */
const condition = (nxt, offst) => nxt && offst < 80;

const getFromUrlUntil = (bigUrl, bigQuery) => {
  let dataArr = [];
  return Future((bigReject, bigResolve) => {
    const getFromUrl = (url, query = {}) => {
      console.log('Get From URL Called');
      console.log({ url, query });
      return Future((reject, resolve) => {
        request
          .get(url)
          .query(query)
          .end((err, data) => {
            if (err) {
              return bigReject(err);
            }
            const info = data.body;
            dataArr = dataArr.concat(info.artists.items);
            if (condition(info.artists.next, info.artists.offset)) {
              return resolve(getFromUrl(info.artists.next).fork(bigReject, () => true));
            }
            return bigResolve(dataArr);
          });
      });
    };
    getFromUrl(bigUrl, bigQuery).fork(bigReject, () => true);
  });
};

const getArtists = (name = '') => {
  // Parse input and build url and query
  const url = 'https://api.spotify.com/v1/search';
  const query = {
    type: 'artist',
    q: name,
  };

  return getFromUrlUntil(url, query);
};


exports = module.exports = {
  getArtists,
};
