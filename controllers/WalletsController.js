'use strict';

const Wallet = require('../models/Wallet');

class WalletsController {
  static async actionGet(req, res) {
    try {
      const { username } = req.params;
      const wallet = await Wallet.findOne({ username });
      return res.json({
        success: Boolean(wallet),
        result: wallet
      })
    } catch (e) {
      return res.json({
        success: false,
        result: e
      });
    }
  }

  static async actionUpsert(req, res) {
    try {
      const { username, budget } = req.body;
      const daily = Math.round(budget / 30 * 100) / 100;

      if (!budget || isNaN(Number(budget))) {
        throw 'Input must be valid number.';
      }

      let wallet = await Wallet.findOneAndUpdate({ username }, { budget, daily }, { new: true });
      if (!wallet) {
        wallet = await Wallet.create({ username, budget, daily });
      }

      return res.json({
        success: true,
        result: wallet
      });
    } catch (e) {
      return res.json({
        success: false,
        result: e
      });
    }
  }

  static async actionUpdateFlows(req, res) {
    try {
      const { username } = req.params;
      const { flow } = req.body;

      // Validate input
      if (!flow.amount || isNaN(Number(flow.amount))) {
        throw 'Input must be valid number.';
      }

      const wallet = await Wallet.findOneAndUpdate({ username }, {
        $inc: {
          budget: flow.type ? flow.amount : -flow.amount
        },
        $push: {
          flows: {
            ...{
              type: flow.type,
              amount: Number(flow.amount)
            },
            timestamp: Date.now()
          }
        }
      }, { new: true });

      return res.json({
        success: Boolean(wallet),
        result: wallet
      });
    } catch (e) {
      return res.json({
        success: false,
        result: e
      });
    }
  }

  static async actionRemoveFlow(req, res) {
    try {
      const { username, index } = req.params;
      const updateFlow = await Wallet.findOneAndUpdate({ username }, {
        $unset: {
          ["flows." + index]: 1
        }
      });
      const wallet = await Wallet.findOneAndUpdate({ username }, {
        $inc: {
          budget: !updateFlow.flows[index].type ? updateFlow.flows[index].amount : -updateFlow.flows[index].amount
        },
        $pull: {
          flows: null
        }
      }, { new: true });

      return res.json({
        success: Boolean(wallet),
        result: wallet
      });
    } catch (e) {
      return res.json({
        success: false,
        result: e
      });
    }
  }
}

module.exports = WalletsController;