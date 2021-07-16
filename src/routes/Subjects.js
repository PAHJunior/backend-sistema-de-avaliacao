const express = require('express')
const router = express.Router()
// const Middlewares = require('../middlewares/Auth')

const {
  index,
  create,
  show,
  modify
} = require('../controllers/Subjects')

// router.use(Middlewares)
router.get('/', index)
router.get('/:subjectID', show)
router.put('/:subjectID', modify)
router.post('/', create)

module.exports = router
