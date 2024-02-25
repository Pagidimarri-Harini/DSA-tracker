const express = require('express');
const router = express.Router();
const { authUser } = require(__basedir + '/lib/controllers/user.controller');
const { getQuestion, getDriverCode } = require(__basedir + '/lib/controllers/question.controller');
const { runCodeApi, submitCodeApi, getSubmissions } = require(__basedir + '/lib/controllers/submission.controller');

router.get('/view/:question', authUser, getQuestion);
router.get('/getCode/:question/:lang', authUser, getDriverCode);

router.post('/runCode/:question', authUser, runCodeApi);
router.post('/submitCode/:question', authUser, submitCodeApi);
router.get('/submissions/:question/:key', authUser, getSubmissions);

module.exports = router;
