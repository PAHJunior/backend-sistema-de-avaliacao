const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const StudentsSchema = mongoose.Schema({
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

StudentsSchema.pre('save', async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSaltSync()
    const hash = await bcrypt.hashSync(this.password, salt)
    this.password = hash
  }
})

const Students = mongoose.model('Students', StudentsSchema)

module.exports = Students
