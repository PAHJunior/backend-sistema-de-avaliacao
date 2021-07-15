const express = require('express')
const router = express.Router()
const {
  teacherAutenticate
} = require('../controllers/Auth')

router.post('/login', teacherAutenticate)

module.exports = router
