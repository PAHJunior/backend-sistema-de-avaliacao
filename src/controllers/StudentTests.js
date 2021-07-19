const StudentTests = require('../models/StudentTests')

const create = async (req, res, next) => {
  try {
    const {
      description,
      student,
      subject,
      questions,
      startAt
    } = req.body

    let studentTest = await StudentTests.create({
      description,
      student,
      subject,
      questions,
      startAt
    })

    studentTest = await StudentTests
      .findById(studentTest._id).populate('subjects', 'student')

    return res.send({ studentTest })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const index = async (req, res, next) => {
  try {
    const { student, notFinishAt, finishAt } = req.query

    let query = {}

    if (student) {
      query = { student: student }
    }

    if (notFinishAt) {
      query = {
        ...query,
        finishAt: null
      }
    }

    if (finishAt) {
      query = {
        ...query,
        finishAt: { $ne: null }
      }
    }

    const studentTests = await StudentTests
      .find(query).populate('subject', 'student')

    return res.send({ studentTests })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const show = async (req, res, next) => {
  try {
    const { studentTestID } = req.params
    const studentTest = await StudentTests.findById(studentTestID).populate('subject', 'student')

    return res.send({ studentTest })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const modify = async (req, res, next) => {
  try {
    const { studentTestID } = req.params
    const {
      questions,
      finishAt
    } = req.body

    await StudentTests.updateOne({
      _id: studentTestID
    }, {
      questions,
      finishAt
    }, {
      runValidators: true
    })

    const studentTest = await StudentTests.findById(studentTestID).populate('subject', 'student')

    return res.send({ studentTest })
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
