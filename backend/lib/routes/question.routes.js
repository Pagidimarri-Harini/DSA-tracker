const express = require('express');
const router = express.Router();
const { authUser } = require(__basedir + '/lib/controllers/user-controller');
const { getQuestion } = require(__basedir + '/lib/controllers/question-controller');
// const { runCodeApi, listLangsApi } = require(__basedir + '/lib/controllers/runCodeOnServer');
const { runCodeApi, listLangsApi } = require(__basedir + '/lib/controllers/runCodeByApi');

router.get('/q/:ind/:question', authUser, getQuestion);
router.post('/run', authUser, runCodeApi);
router.get('/list', authUser, listLangsApi);

module.exports = router;
