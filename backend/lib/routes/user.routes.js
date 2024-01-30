const express = require('express');
const router = express.Router();
const { addAcc, loginAcc } = require(__basedir + '/lib/controllers/user-controller');

router.post('/signupadd', addAcc);
router.post('/signupcheck', loginAcc);

module.exports = router;
