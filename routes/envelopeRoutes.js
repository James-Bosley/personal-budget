const express = require('express');
const db = require('../db/dbQuery');
const builder = require('../db/objectBuilder');

const envRouter = express.Router();

envRouter.get('/', async (req, res) => {
  const data = await db.selectAll('envelopes')
  if(data) {
    res.json(data);
  } else {
    res.status(500).send();
  }
});

envRouter.post('/', async (req, res) => {
  const envelope = builder.envelope(req.body);
  if(envelope) {
    const data = await db.post('envelopes', envelope);
    if(data === 'Success') {
      res.json(data);
    } else {
      res.status(404).send(data);
    }
  } else {
    res.status(404).send('Invalid argument provided');
  }
});

envRouter.get('/:id', async (req, res) => {
  const data = await db.selectById('envelopes', req.params.id);
  if(data) {
    res.json(data);
  } else {
    res.status(404).send('Invalid argument provided');
  }
});

envRouter.put('/:id', async (req, res) => {
  const envelope = builder.envelope(req.body);
  if(envelope) {
    const data = await db.put('envelopes', req.params.id, envelope);
    if(data === 'Success') {
      res.json(data);
    } else {
      res.status(404).send(data);
    }
  } else {
    res.status(404).send('Invalid argument provided');
  }
});

envRouter.delete('/:id', async (req, res) => {
  const data = await db.delete('envelopes', req.params.id);
  if(data === 'Success') {
    res.status(204).send(data);
  } else {
    res.status(404).send(data);
  }
});

module.exports = envRouter;
