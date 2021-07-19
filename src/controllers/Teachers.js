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

    const teacher = new Teachers({
      name,
      email,
      password
    })

    await Promise.all(subjects.map(async (title) => {
      let subject = await Subjects.findOne({ title: title })

      if (!subject._id) {
        subject = await Subjects.create({
          title: title
        })
      }

      teacher.subjects.push(subject)
    }))

    await teacher.save()

    return res.send({ teacher })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const index = async (req, res, next) => {
  try {
    const teachers = await Teachers.find().populate('subjects')

    return res.send({ teachers })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const show = async (req, res, next) => {
  try {
    const { teacherID } = req.params
    const teacher = await Teachers.findById(teacherID).populate('subjects')

    return res.send({ teacher })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const modify = async (req, res, next) => {
  try {
    const { teacherID } = req.params

    const {
      name,
      email,
      subjects,
      status
    } = req.body

    const teacher = await Teachers.findByIdAndUpdate(teacherID, {
      name,
      email,
      status
    }, {
      new: true
    })

    teacher.subjects = []
    await Promise.all(subjects.map(async (title) => {
      let subject = await Subjects.findOne({ title: title })

      if (!subject._id) {
        subject = await Subjects.create({
          title: title
        })
      }

      teacher.subjects.push(subject)
    }))

    await teacher.save()

    return res.send({ teacher })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

module.exports = {
  create,
  index,
  show,
  modify
}
