'use strict';

const express = require('express');
const walletRoutes = require('./wallet');

const router = express.Router();

router.use('/wallets', walletRoutes);

module.exports = router;
