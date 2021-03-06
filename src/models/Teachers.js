const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const TeachersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  status: {
    type: Boolean,
    default: true
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

TeachersSchema.pre('save', async function (next) {
  if (this.password) {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(this.password, salt)
    this.password = hash
  }
})

const Teachers = mongoose.model('Teachers', TeachersSchema)

module.exports = Teachers
