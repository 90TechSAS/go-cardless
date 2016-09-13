/* global describe it before beforeEach */
'use strict'

const GoCardless = require('../../lib/index.js')
const Payment = GoCardless.model('Payment')

const template = {}

var payment

describe('models.Payment', () => {
  before(function (done) {
    if (!process.env.hasOwnProperty('TEST_PRO_FEATURES')) {
      return this.skip()
    }

    this.timeout(5000)
    done()
  })

  beforeEach(function () {
    if (!process.env.hasOwnProperty('TEST_PRO_FEATURES')) {
      this.skip()
    }
  })

  describe('#get()', () => {
    it('should get a single Payment', function (done) {
      this.timeout(5000)
      Payment.get(payment.id, (err, p) => {
        (err === null).should.be.true()
        p.reference.should.be.equal('90Tech')
        done()
      })
    })
  })

  describe('#list()', () => {
    it('should list Payments', function (done) {
      this.timeout(5000)
      Payment.list({}, (err, res) => {
        (err === null).should.be.true()
        res.results.length.should.be.aboveOrEqual(1)
        done()
      })
    })
  })

  describe('#save()', () => {
    it('should create a Payment if it does not have an ID', function (done) {
      this.timeout(5000)
      let p = new Payment(template)
      p.save((err, p) => {
        (err === null).should.be.true()
        p.reference.should.be.equal('90Tech')
        done()
      })
    })

    it('should update a Payment if it has an ID', function (done) {
      this.timeout(5000)
      Payment.get(payment.id, (err, p) => {
        (err === null).should.be.true()
        p.metadata.OK = 'true'

        p.save((err, pmt) => {
          (err === null).should.be.true()
          pmt.metadata.OK.should.be.equal('true')
          p.id.should.be.equal(pmt.id)
          done()
        })
      })
    })
  })

  describe('#validate', () => {
    it('should return the error if the object is not valid', done => {
      let p = new Payment({
        email: 'invalid'
      })

      p.validate((err) => {
        err.name.should.be.equal('ValidationError')
        done()
      })
    })

    it('should return an empty error if the model is valid', done => {
      let p = new Payment({})

      p.validate((err) => {
        (err === null).should.be.true
        done()
      })
    })
  })
})
