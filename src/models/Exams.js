const mongoose = require('mongoose')

const ExamsSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
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
          }
        }
      ]
    }
  ],
  status: {
    type: Boolean,
    default: true
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
})

const Exams = mongoose.model('Exams', ExamsSchema)

module.exports = Exams
