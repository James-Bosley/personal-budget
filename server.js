const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());



app.listen(PORT, () => console.log(`Listening on PORT ${PORT}.`));
