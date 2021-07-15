const Exams = require('../models/Exams')

const create = async (req, res, next) => {
  try {
    const {
      title,
      subjects,
      status,
      questions
    } = req.body

    let exam = await Exams.create({
      title,
      subjects,
      status,
      questions
    })

    exam = await Exams.findById(exam._id).populate('subjects')

    return res.send(exam)
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const index = async (req, res, next) => {
  try {
    const exams = await Exams.find().populate('subjects')

    return res.send(exams)
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const show = async (req, res, next) => {
  try {
    const { examID } = req.params
    const exam = await Exams.findById(examID).populate('subjects')

    return res.send(exam)
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const modify = async (req, res, next) => {
  try {
    const { examID } = req.params
    const {
      title,
      subjects,
      status,
      questions
    } = req.body

    await Exams.updateOne({
      _id: examID
    }, {
      title,
      subjects,
      status,
      questions
    }, {
      runValidators: true
    })

    const exam = await Exams.findById(examID).populate('subjects')

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
