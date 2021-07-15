const mongoose = require('mongoose')

const StudentTestsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Students'
  },
  subjects: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subjects'
  },
  questions: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      choice: {
        type: Boolean
      },
      isCorrect: {
        type: Boolean
      },
      createAt: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  startAt: {
    type: Date
  },
  finishAt: {
    type: Date
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
})

const StudentTests = mongoose.model('StudentTests', StudentTestsSchema)

module.exports = StudentTests
