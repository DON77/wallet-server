'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
const config = require('./config/env');
const connection = require('./config/database');
const v1Routes = require('./routes/v1');

app.use(cors({
  origin: config.clientUrl,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use('/v1', v1Routes);

app.listen(
  config.port,
  console.log(`Listening to ${config.port}!`)
);