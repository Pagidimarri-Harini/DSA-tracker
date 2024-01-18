// serverRoutes.js
const express = require('express');
const { addAcc, checkAcc,
  insertData,
  getData,
  getTopicData,
  updateData,
  resetData,
  exportData,
  importData } = require('./controllers/user-controller');

const router = express.Router();

router.post('/signupadd', addAcc);
router.post('/signupcheck', checkAcc);
router.post('/insertData', insertData);
router.get('/getData', getData);
router.get('/getTopicData/:key', getTopicData);
router.put('/updateData/:key', updateData);
router.delete('/resetData', resetData);
router.post('/exportData', exportData);
router.post('/importData', importData);

module.exports = router;
