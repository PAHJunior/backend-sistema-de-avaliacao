var express = require('express');
var router = express.Router();
const Middlewares = require('../middlewares/Auth')

const {
  index,
  create
} = require('../controllers/Teachers')

router.use(Middlewares)
router.get('/', index);
router.post('/', create);

module.exports = router;
