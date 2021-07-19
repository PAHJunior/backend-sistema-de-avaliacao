const Teachers = require('../models/Teachers')
const Students = require('../models/Students')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const teacherAutenticate = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body

    console.log(email,
      password)

    const teacher = await Teachers.findOne({ email }).select('+password')

    console.log(teacher.name)
    if (!teacher || await !bcrypt.compare(password, teacher.password)) {
      const errors = [
        {
          status: 400,
          message: 'E-mail e/ou senha invalido'
        }
      ]
      return res.status(400).send({ errors: errors })
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

const studentAutenticate = async (req, res, next) => {
  try {
    const {
      studentRecord,
      password
    } = req.body

    const student = await Students.findOne({ studentRecord }).select('+password')

    if (!student || await !bcrypt.compare(password, student.password)) {
      const errors = [
        {
          status: 400,
          message: 'E-mail e/ou senha invalido'
        }
      ]
      return res.status(400).send({ errors: errors })
    }

    student.password = undefined
    const token = jwt.sign({
      studentID: student._id
    }, process.env.SECRET_JWT, {
      expiresIn: '15m'
    })

    return res.send({ student, token })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

module.exports = {
  teacherAutenticate,
  studentAutenticate
}
