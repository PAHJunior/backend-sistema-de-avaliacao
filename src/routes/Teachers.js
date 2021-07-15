const express = require('express')
const router = express.Router()
// const Middlewares = require('../middlewares/Auth')

const {
  index,
  create,
  show,
  modify
} = require('../controllers/Teachers')

// router.use(Middlewares)
router.get('/', index)
router.get('/:teacherID', show)
router.put('/:teacherID', modify)
router.post('/', create)

module.exports = router
