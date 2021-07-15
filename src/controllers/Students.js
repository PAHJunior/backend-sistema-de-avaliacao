const Students = require('../models/Exams')

const create = async (req, res, next) => {
  try {
    const {
      name,
      studentRecord,
      password,
      subjects
    } = req.body

    let student = await Students.create({
      name,
      studentRecord,
      password,
      subjects
    })

    student = await Students.findById(student._id).populate('subjects')

    return res.send(student)
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const index = async (req, res, next) => {
  try {
    const students = await Students.find().populate('subjects')

    return res.send(students)
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const show = async (req, res, next) => {
  try {
    const { studentID } = req.params
    const student = await Students.findById(studentID).populate('subjects')

    return res.send(student)
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const modify = async (req, res, next) => {
  try {
    const { studentID } = req.params
    const {
      name,
      studentRecord,
      password,
      status,
      subjects
    } = req.body

    await Students.updateOne({
      _id: studentID
    }, {
      name,
      studentRecord,
      password,
      status,
      subjects
    }, {
      runValidators: true
    })

    const exam = await Students.findById(studentID).populate('subjects')

    return res.send(exam)
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

module.exports = {
  create,
  index,
  modify,
  show
}
