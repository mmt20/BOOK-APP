const express = require('express')
const router = express.Router()

var storeContrl = require('../controller/store.Controller')



router.get('/stores', storeContrl.getStoreList)
router.post('/stores/save', storeContrl.saveStore)


module.exports = router;