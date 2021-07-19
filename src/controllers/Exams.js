const Exams = require('../models/Exams')

const create = async (req, res, next) => {
  try {
    const {
      description,
      subject,
      status,
      questions
    } = req.body

    let exam = await Exams.create({
      description,
      subject,
      status,
      questions
    })

    exam = await Exams.findById(exam._id).populate('subjects')

    return res.send({ exam })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const index = async (req, res, next) => {
  try {
    const { status } = req.query

    let query = {}

    if (status) {
      query = { status: { $in: ['true', true] } }
    }

    const exams = await Exams.find(query).populate('subject')

    return res.send({ exams })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const show = async (req, res, next) => {
  try {
    const { examID } = req.params
    const exam = await Exams.findById(examID).populate('subject')

    return res.send({ exam })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const modify = async (req, res, next) => {
  try {
    const { examID } = req.params
    const {
      description,
      subjects,
      status,
      questions
    } = req.body

    await Exams.updateOne({
      _id: examID
    }, {
      description,
      subjects,
      status,
      questions
    }, {
      runValidators: true
    })

    const exam = await Exams.findById(examID).populate('subject')

    return res.send({ exam })
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
