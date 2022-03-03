const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const envRouter = require('./routes/envelopeRoutes');
const transRouter = require('./routes/transactionRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/envelope', envRouter);
app.use('/transaction', transRouter);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));
