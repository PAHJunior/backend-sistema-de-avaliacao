const Students = require('../models/Students')
const Subjects = require('../models/Subjects')

const create = async (req, res, next) => {
  try {
    const {
      name,
      studentRecord,
      password,
      subjects
    } = req.body

    const student = new Students({
      name,
      studentRecord,
      password
    })

    await Promise.all(subjects.map(async (title) => {
      let subject = await Subjects.findOne({ title: title })

      if (!subject._id) {
        subject = await Subjects.create({
          title: title
        })
      }

      student.subjects.push(subject)
    }))

    await student.save()

    return res.send({ student })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const index = async (req, res, next) => {
  try {
    const students = await Students.find().populate('subjects')

    return res.send({ students })
  } catch (error) {
    console.error(error)
    return res.status(400).send(error)
  }
}

const show = async (req, res, next) => {
  try {
    const { studentID } = req.params
    const student = await Students.findById(studentID).populate('subjects')

    return res.send({ student })
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

    const student = await Students.findByIdAndUpdate({
      _id: studentID
    }, {
      name,
      studentRecord,
      password,
      status
    }, {
      runValidators: true
    })

    student.subjects = []
    await Promise.all(subjects.map(async (title) => {
      let subject = await Subjects.findOne({ title: title })

      if (!subject._id) {
        subject = await Subjects.create({
          title: title
        })
      }

      student.subjects.push(subject)
    }))

    await student.save()

    return res.send({ student })
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
