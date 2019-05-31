const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req,res, next) => {
  res.send('Hello from posts!');
});

module.exports = router;