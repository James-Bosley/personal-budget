const express = require('express');
const db = require('../db/dbQuery');
const builder = require('../db/objectBuilder');

const transRouter = express.Router();

transRouter.get('/', async (req, res) => {
  const data = await db.selectAll('transactions');
  if(data) {
    res.json(data);
  } else {
    res.status(500).send();
  }
});

transRouter.post('/', async (req, res) => {
  const transaction = builder.transaction(req.body);
  if(transaction) {
    const balance = await db.updateBalance(transaction.envelope_id, transaction.amount, transaction.deduction);
    const data = await db.post('transactions', transaction);
    if(balance === 'Success' && data === 'Success') {
      res.json(data);
    } else {
      res.status(404).send('Invalid argument provided');
    }
  } else {
    res.status(404).send('Invalid argument provided');
  }
});

transRouter.get('/:id', async (req, res) => {
  const data = await db.selectById('transactions', req.params.id);
  if(data) {
    res.json(data);
  } else {
    res.status(404).send('Invalid argument provided');
  }
});

transRouter.put('/:id', async (req, res) => {
  res.status(404).send('Transactions cannot be updated. Please delete and re-post.')
});

transRouter.delete('/:id', async (req, res) => {
  let transaction = await db.selectById('transactions', req.params.id);
  if(transaction) {
    transaction = transaction[0];
  } else {
    return res.status(404).send('Invalid argument provided');
  }
  if(transaction.deduction === true) {
    transaction.deduction = false;
  } else {
    transaction.deduction = true;
  }
  const balance = await db.updateBalance(transaction.envelope_id, transaction.amount, transaction.deduction);
  const data = await db.delete('transactions', req.params.id);
  if(balance === 'Success' && data === 'Success') {
    res.status(204).send(data);
  } else {
    res.status(404).send('Invalid argument provided');
  }
});

transRouter.get('/envelope/:id', async (req, res) => {
  const data = await db.selectById('transactions', req.params.id, 'envelope_id');
  if(data) {
    res.json(data)
  } else {
    res.status(404).send('Invalid argument provided');
  }
});

module.exports = transRouter;
