require('express-async-errors');
const router = require('express').Router();
const controller = require('./words-controller');

router.route('/')
  .get( controller.list )
  .post( controller.create )

router.route('/:id')
  .get( controller.select )
  .put( controller.update )
  .delete( controller.delete )

module.exports = () => router;
