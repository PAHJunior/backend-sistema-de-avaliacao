const Subjects = require('../models/Subjects')

const create = async (req, res, next) => {
  try {
    const {
      title,
      status
    } = req.body

    let subject = await Subjects.create({
      title,
      status
    })

    subject = await Subjects.findById(subject._id)
    return res.send({ subject })
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

    const subjects = await Subjects.find(query)

    return res.send({ subjects })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const show = async (req, res, next) => {
  try {
    const { subjectID } = req.params
    const subject = await Subjects.findById(subjectID)

    return res.send({ subject })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const modify = async (req, res, next) => {
  try {
    const { subjectID } = req.params
    const {
      title,
      status
    } = req.body

    await Subjects.updateOne({
      _id: subjectID
    }, {
      title,
      status
    }, {
      runValidators: true
    })

    const subject = await Subjects.findById(subjectID)

    return res.send({ subject })
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
