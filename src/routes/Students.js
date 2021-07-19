const express = require('express')
const router = express.Router()
// const Middlewares = require('../middlewares/Auth')

const {
  index,
  create,
  show,
  modify
} = require('../controllers/Students')

// router.use(Middlewares)
router.get('/', index)
router.get('/:studentID', show)
router.put('/:studentID', modify)
router.post('/', create)

module.exports = router
