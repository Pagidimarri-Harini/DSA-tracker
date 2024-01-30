const express = require('express');
const router = express.Router();
const { authUser } = require(__basedir + '/lib/controllers/user-controller');
const {
    getData,
    getTopicData,
    updateData,
    resetData,
    exportData,
    importData } = require(__basedir + '/lib/controllers/topic-controller');

router.post('/getData', authUser, getData);
router.put('/updateData/:key', authUser, updateData);
router.get('/getTopicData/:key', authUser, getTopicData);
router.delete('/resetData', authUser, resetData);
router.post('/exportData', authUser, exportData);
router.post('/importData', authUser, importData);

module.exports = router;
