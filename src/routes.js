const httpErrors = require('http-errors')

const router = require('express').Router();
const api = require('./app/api/v1/api-router');

router.use('/api/v1/', api());

router.get('/', (req, res) => {
  res.status(200).json({ status: 200 });
});

router.all('*', (req, res) => {
  throw new httpErrors(400);
});

module.exports = () => router;
