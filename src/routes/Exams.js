const express = require('express')
const router = express.Router()
// const Middlewares = require('../middlewares/Auth')

const {
  index,
  create,
  show,
  modify
} = require('../controllers/Exams')

// router.use(Middlewares)
router.get('/', index)
router.get('/:examID', show)
router.put('/:examID', modify)
router.post('/', create)

module.exports = router
