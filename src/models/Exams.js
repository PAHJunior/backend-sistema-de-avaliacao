const mongoose = require('mongoose')

const ExamsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
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
      isCorrect: {
        type: Boolean
      },
      createAt: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  createAt: {
    type: Date,
    default: Date.now()
  }
})

const Exams = mongoose.model('Exams', ExamsSchema)

module.exports = Exams
