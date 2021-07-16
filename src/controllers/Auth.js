const Teachers = require('../models/Teachers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const teacherAutenticate = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body

    const teacher = await Teachers.findOne({ email }).select('+password')

    if (!teacher) {
      return res.status(404).send({ error: 'E-mail e/ou senha invalido' })
    }

    if (!await bcrypt.compare(password, teacher.password)) {
      return res.status(404).send({ error: 'E-mail e/ou senha invalido' })
    }

    teacher.password = undefined
    const token = jwt.sign({
      teacherID: teacher._id
    }, process.env.SECRET_JWT, {
      expiresIn: '15m'
    })

    return res.send({ teacher, token })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

module.exports = {
  teacherAutenticate
}
