const mongoose = require('mongoose')

const SubjectsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studentRecord: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subjects'
    }
  ],
  createAt: {
    type: Date,
    default: Date.now()
  }
})

const Subjects = mongoose.model('Subjects', SubjectsSchema)

module.exports = Subjects
