'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    budget: {
      type: Number,
      required: true
    },
    daily: {
      type: Number,
      required: true
    },
    flows: {
      type: Array
    }
  },
  {
    timestamps: true
  }
);

const Wallet = module.exports = mongoose.model('Wallet', WalletSchema);
