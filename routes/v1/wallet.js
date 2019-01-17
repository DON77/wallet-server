'use strict';

const express = require('express');
const WalletsController = require('../../controllers/WalletsController');

const router = express.Router();

router.get('/:username', WalletsController.actionGet);
router.post('/', WalletsController.actionUpsert);
router.put('/:username', WalletsController.actionUpdateFlows);
router.delete('/:username/:index', WalletsController.actionRemoveFlow)

module.exports = router;