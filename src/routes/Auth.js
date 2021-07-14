var express = require('express');
var router = express.Router();
const {
  teacherAutenticate
} = require('../controllers/Auth')

router.post('/login', teacherAutenticate);

module.exports = router;
