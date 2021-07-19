const express = require('express')
const router = express.Router()
const {
  teacherAutenticate,
  studentAutenticate
} = require('../controllers/Auth')

router.post('/teacher', teacherAutenticate)
router.post('/student', studentAutenticate)

module.exports = router
