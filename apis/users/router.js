const express = require('express');

const router = express.Router();

// Logger middleware
router.use((req, res, next) => {
  process.stdout.write('Users Router Accessed \n');
  next();
});

router.route('/')
      .get((req, res) => {
        // Get all users
        res.json({ data: ['users'] });
      });

exports = module.exports = router;
