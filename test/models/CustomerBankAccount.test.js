/* global describe it before */
'use strict'

const GoCardless = require('../../lib/index.js')
const CustomerBankAccount = GoCardless.model('CustomerBankAccount')

var template = {
  account_holder_name: 'JOHN DOE',
  currency: 'EUR',
  iban: 'GB60 BARC 2000 0055 7799 11'
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
var customer_bank_account

describe('models.CustomerBankAccount', () => {
  before(function (done) {
    this.timeout(5000)
    GoCardless.client().post({
      url: '/customers',
      json: {
        customers: customer
      }
    }, (err, res, cust) => {
      if (err) return done(err)
      customer = cust.customers
      template.links = {
        customer: customer.id
      }

      GoCardless.client().post({
        url: '/customer_bank_accounts',
        json: {
          customer_bank_accounts: template
        }
      }, (err, res, ba) => {
        if (err) return done(err)
        customer_bank_account = ba.customer_bank_accounts
        done(err)
      })
    })

  })

  describe('#get()', () => {
    it('should get a single CustomerBankAccount', function (done) {
      this.timeout(5000)
      CustomerBankAccount.get(customer_bank_account.id, (err, ba) => {
        (err === null).should.be.true()
        ba.account_holder_name.should.be.equal('JOHN DOE')
        done()
      })
    })
  })

  describe('#list()', () => {
    it('should list CustomerBankAccounts', function (done) {
      this.timeout(5000)
      CustomerBankAccount.list({}, (err, res) => {
        (err === null).should.be.true()
        res.results.length.should.be.aboveOrEqual(1)
        done()
      })
    })
  })

  describe('#save()', () => {
    it.skip('should create a CustomerBankAccount if it does not have an ID', function (done) {
      this.timeout(5000)
      let ba = new CustomerBankAccount(template)
      ba.iban = 'GB60 BARC 2000 0055 7799 11'
      ba.save((err, ba) => {
        console.log(err)
        (err === null).should.be.true()
        ba.account_holder_name.should.be.equal('JOHN DOE')
        done()
      })
    })

    it('should update a CustomerBankAccount if it has an ID', function (done) {
      this.timeout(5000)
      CustomerBankAccount.get(customer_bank_account.id, (err, ba) => {
        (err === null).should.be.true()
        ba.metadata.OK = 'true'

        ba.save((err, b) => {
          (err === null).should.be.true()
          b.metadata.OK.should.be.equal('true')
          ba.id.should.be.equal(b.id)
          done()
        })
      })
    })
  })

  describe('#validate', () => {
    it('should return the error if the object is not valid', done => {
      let ba = new CustomerBankAccount({
        email: 'invalid'
      })

      ba.validate((err) => {
        err.name.should.be.equal('ValidationError')
        done()
      })
    })

    it('should return an empty error if the model is valid', done => {
      let ba = new CustomerBankAccount({
        id: 'BA1',
        created_at: new Date(),
        account_holder_name: 'John Doe',
        currency: 'EUR',
        iban: 'GB60 BARC 2000 0055 7799 11',
        enabled: true,
        language: 'en',
        links: {
          customer: 'CU1'
        }
      })

      ba.validate((err) => {
        (err === null).should.be.true
        done()
      })
    })
  })
})
