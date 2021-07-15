/* eslint-disable no-undef */
require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should()

chai.use(chaiHttp)

const baseUrl = process.env.BASE_URL

describe('Teachers', () => {
  describe('/POST Teachers', () => {
    it('Create a Teacher', (done) => {

    })

    it('Create a Teacher with existing email', (done) => {

    })
  })

  describe('/GET Teachers', () => {
    it('List all Teachers', (done) => {
      chai.request(baseUrl)
        .get('/teachers')
        .end((_err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })
  })

  describe('/GET/:id Teacher', () => {
    it('GET a Teacher by _ID', (done) => {
      const id = 1
      chai.request(baseUrl)
        .get(`/teachers/${id}`)
        .end((_err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('id').eql(id)
          res.body.should.have.property('firstName')
          res.body.should.have.property('lastName')
          done()
        })
    })

    it('GET a Teacher by invalid _ID', (done) => {
      const id = 1
      chai.request(baseUrl)
        .get(`/teachers/${id}`)
        .end((_err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })

  describe('/PUT/:id Teacher', () => {
    it('PUT Teacher by _ID', (done) => {

    })

    it('PUT Teacher by invalid _ID', (done) => {

    })
  })
})
