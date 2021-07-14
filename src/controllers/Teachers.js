const Teachers = require('../models/Teachers')
const Subjects = require('../models/Subjects')

const create = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      subjects
    } = req.body

    let teacher = await Teachers.create({
      name,
      email,
      password,
      subjects
    })

    teacher = await Teachers.findById(teacher._id).populate('subjects')

    return res.send(teacher)
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const index = async (req, res, next) => {
  try {

    const teacher = await Teachers.find().populate('subjects')

    return res.send(teacher)
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

module.exports = {
  create,
  index
}