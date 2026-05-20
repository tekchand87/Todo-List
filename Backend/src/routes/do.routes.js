const express = require('express')
const router = express.Router()
const mainController = require('../controller/main.controller')

router.get('/',mainController.getAllTask)
router.post('/',mainController.addTask)
router.delete('/:id',mainController.deleteTask)
module.exports = router