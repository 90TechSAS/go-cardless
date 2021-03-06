/* global describe it before beforeEach */
'use strict'

const GoCardless = require('../../lib/index.js')
const Refund = GoCardless.model('Refund')

const template = {}

var refund

describe('models.Refund', () => {
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
    it('should get a single Refund', function (done) {
      this.timeout(5000)
      Refund.get(refund.id, (err, r) => {
        (err === null).should.be.true()
        r.reference.should.be.equal('90Tech')
        done()
      })
    })
  })

  describe('#list()', () => {
    it('should list Refunds', function (done) {
      this.timeout(5000)
      Refund.list({}, (err, res) => {
        (err === null).should.be.true()
        res.results.length.should.be.aboveOrEqual(1)
        done()
      })
    })
  })

  describe('#save()', () => {
    it('should create a Refund if it does not have an ID', function (done) {
      this.timeout(5000)
      let r = new Refund(template)
      r.save((err, r) => {
        (err === null).should.be.true()
        r.reference.should.be.equal('90Tech')
        done()
      })
    })

    it('should update a Refund if it has an ID', function (done) {
      this.timeout(5000)
      Refund.get(refund.id, (err, r) => {
        (err === null).should.be.true()
        r.metadata.OK = 'true'

        r.save((err, rfd) => {
          (err === null).should.be.true()
          rfd.metadata.OK.should.be.equal('true')
          r.id.should.be.equal(rfd.id)
          done()
        })
      })
    })
  })

  describe('#validate', () => {
    it('should return the error if the object is not valid', done => {
      let r = new Refund({
        email: 'invalid'
      })

      r.validate((err) => {
        err.name.should.be.equal('ValidationError')
        done()
      })
    })

    it('should return an empty error if the model is valid', done => {
      let r = new Refund({})

      r.validate((err) => {
        (err === null).should.be.true
        done()
      })
    })
  })
})
