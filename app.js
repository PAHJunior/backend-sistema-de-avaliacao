const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

mongoose
  .connect(`${process.env.DB_BASE_URL}/${process.env.DB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Server has started!')
  })

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/api/subjects', require('./src/routes/Subjects'))
app.use('/api/teachers', require('./src/routes/Teachers'))
app.use('/api/students', require('./src/routes/Students'))
app.use('/api/exams', require('./src/routes/Exams'))
app.use('/api/studenttests', require('./src/routes/StudentTests'))
app.use('/api/auth', require('./src/routes/Auth'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500).send(err.message)
})

module.exports = app
