const httpError = require('http-errors');

exports.list = async (req, res) => {
  const db = req.db;
  res.json( await db.list('words') );
}

exports.create = async (req, res) => {
  const db = req.db;
  res.json( await db.create('words', { name: req.body.name }) );
}

exports.select = async (req, res) => {
  const db = req.db;
  const result = await db.select('words', req.params.id);
  if (result === null) {
    throw httpError(404, 'Element does not exist');
  }
  res.json( result );
}

exports.delete = async (req, res) => {
  const db = req.db;
  const result = await db.delete('words', req.params.id);
  if (result === null) {
    throw httpError(404, 'Element does not exist');
  }
  res.json( result );
}

exports.update = async (req, res) => {
  const db = req.db;
  const result = await db.update('words', req.params.id, { name: req.body.name });
  if (result === null) {
    throw httpError(404, 'Element does not exist');
  }
  res.json( result );
}
