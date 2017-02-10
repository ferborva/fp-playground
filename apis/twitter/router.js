const express = require('express');

const router = express.Router();

// Logger middleware
router.use((req, res, next) => {
  process.stdout.write('Twitter Router Accessed \n');
  next();
});

router.route('/')
      .get((req, res) => {
        // Get all users
        res.json({ msg: 'Killer new stuff with twitter' });
      });

exports = module.exports = router;
