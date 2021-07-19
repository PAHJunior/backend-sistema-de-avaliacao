const mongoose = require('mongoose')

const StudentTestsSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Students'
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subjects'
  },
  questions: [
    {
      label: {
        type: String
      },
      name: {
        type: String
      },
      description: {
        type: String
      },
      alternatives: [
        {
          description: {
            type: String
          },
          isCorrect: {
            type: Boolean
          },
          isChoice: {
            type: Boolean,
            default: false
          }
        }
      ]
    }
  ],
  startAt: {
    type: Date,
    default: null
  },
  finishAt: {
    type: Date,
    default: null
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
})

const StudentTests = mongoose.model('StudentTests', StudentTestsSchema)

module.exports = StudentTests
