/* global describe it before */
'use strict'

const GoCardless = require('../../lib/index.js')
const Mandate = GoCardless.model('Mandate')

var template = {
  reference: '90Tech',
  scheme: 'sepa_core'
}

var customer = {
  email: 'john.doe@90tech.fr',
  given_name: 'John',
  family_name: 'Doe',
  address_line1: 'Champ de Mars',
  address_line2: '5 Avenue Anatole France',
  city: 'Paris',
  postal_code: '75007',
  country_code: 'FR',
  language: 'en'
}

var customerBankAccount = {
  account_holder_name: 'JOHN DOE',
  currency: 'EUR',
  iban: 'GB60 BARC 2000 0055 7799 11'
}

var mandate

describe('models.Mandate', () => {
  before(function (done) {
    if (!process.env.hasOwnProperty('TEST_PRO_FEATURES')) {
      return this.skip();
    }

    this.timeout(5000)
    GoCardless.client().post({
      url: '/customers',
      json: {
        customers: customer
      }
    }, (err, res, cust) => {
      if (err) return done(err)
      if (cust.error) return done(cust.error)
      customer = cust.customers

      customerBankAccount.links = {
        customer: customer.id
      }

      GoCardless.client().post({
        url: '/customer_bank_accounts',
        json: {
          customer_bank_accounts: customerBankAccount
        }
      }, (err, res, ba) => {
        if (err) return done(err)
        if (ba.error) return done(ba.error)

        customerBankAccount = ba.customer_bank_accounts

        template.links = {
          customer_bank_account: customerBankAccount.id
        }

        GoCardless.client().post({
          url: '/mandates',
          json: {
            mandates: template
          }
        }, (err, res, m) => {
          if (err) return done(err)
          if (m.error) return done(m.error)
          mandate = m.mandates
          done()
        })
      })
    })
  })

  beforeEach(function () {
    if (!process.env.hasOwnProperty('TEST_PRO_FEATURES')) {
      this.skip();
    }
  })

  describe('#get()', () => {
    it('should get a single Mandate', function (done) {
      this.timeout(5000)
      Mandate.get(mandate.id, (err, m) => {
        (err === null).should.be.true()
        m.reference.should.be.equal('90Tech')
        done()
      })
    })
  })

  describe('#list()', () => {
    it('should list Mandates', function (done) {
      this.timeout(5000)
      Mandate.list({}, (err, res) => {
        (err === null).should.be.true()
        res.results.length.should.be.aboveOrEqual(1)
        done()
      })
    })
  })

  describe('#save()', () => {
    it('should create a Mandate if it does not have an ID', function (done) {
      this.timeout(5000)
      let m = new Mandate(template)
      m.save((err, ba) => {
        (err === null).should.be.true()
        m.reference.should.be.equal('90Tech')
        done()
      })
    })

    it('should update a Mandate if it has an ID', function (done) {
      this.timeout(5000)
      Mandate.get(mandate.id, (err, m) => {
        (err === null).should.be.true()
        m.metadata.OK = 'true'

        m.save((err, mdt) => {
          (err === null).should.be.true()
          mdt.metadata.OK.should.be.equal('true')
          m.id.should.be.equal(m.id)
          done()
        })
      })
    })
  })

  describe('#validate', () => {
    it('should return the error if the object is not valid', done => {
      let m = new Mandate({
        email: 'invalid'
      })

      m.validate((err) => {
        err.name.should.be.equal('ValidationError')
        done()
      })
    })

    it('should return an empty error if the model is valid', done => {
      let m = new Mandate({
        id: 'MD1',
        created_at: new Date(),
        reference: '90Tech',
        scheme: 'sepa_core'
      })

      m.validate((err) => {
        (err === null).should.be.true
        done()
      })
    })
  })
})
