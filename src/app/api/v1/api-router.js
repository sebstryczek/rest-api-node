const router = require('express').Router();
const wordsRouter = require('./words/words-router');

router.use('/words', wordsRouter());

module.exports = () => router;
