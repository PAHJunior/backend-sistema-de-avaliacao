const mongoose = require('mongoose')

const SubjectsSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
})

const Subjects = mongoose.model('Subjects', SubjectsSchema)

module.exports = Subjects
