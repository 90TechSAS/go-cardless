/* global describe it before beforeEach */
'use strict'

const GoCardless = require('../../lib/index.js')
const Subscription = GoCardless.model('Subscription')

const template = {}

var subscription

describe('models.Subscription', () => {
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
    it('should get a single Subscription', function (done) {
      this.timeout(5000)
      Subscription.get(subscription.id, (err, s) => {
        (err === null).should.be.true()
        s.reference.should.be.equal('90Tech')
        done()
      })
    })
  })

  describe('#list()', () => {
    it('should list Subscriptions', function (done) {
      this.timeout(5000)
      Subscription.list({}, (err, res) => {
        (err === null).should.be.true()
        res.results.length.should.be.aboveOrEqual(1)
        done()
      })
    })
  })

  describe('#save()', () => {
    it('should create a Subscription if it does not have an ID', function (done) {
      this.timeout(5000)
      let s = new Subscription(template)
      s.save((err, s) => {
        (err === null).should.be.true()
        s.reference.should.be.equal('90Tech')
        done()
      })
    })

    it('should update a Subscription if it has an ID', function (done) {
      this.timeout(5000)
      Subscription.get(subscription.id, (err, s) => {
        (err === null).should.be.true()
        s.metadata.OK = 'true'

        s.save((err, sub) => {
          (err === null).should.be.true()
          sub.metadata.OK.should.be.equal('true')
          s.id.should.be.equal(sub.id)
          done()
        })
      })
    })
  })

  describe('#validate', () => {
    it('should return the error if the object is not valid', done => {
      let s = new Subscription({
        email: 'invalid'
      })

      s.validate((err) => {
        err.name.should.be.equal('ValidationError')
        done()
      })
    })

    it('should return an empty error if the model is valid', done => {
      let s = new Subscription({})

      s.validate((err) => {
        (err === null).should.be.true
        done()
      })
    })
  })
})
