const express = require('express')
const router = express.Router()
// const Middlewares = require('../middlewares/Auth')

const {
  index,
  create,
  show,
  modify
} = require('../controllers/StudentTests')

// router.use(Middlewares)
router.get('/', index)
router.get('/:studentTestID', show)
router.put('/:studentTestID', modify)
router.post('/', create)

module.exports = router
