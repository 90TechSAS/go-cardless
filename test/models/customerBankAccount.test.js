/* global describe it */
'use strict'

const CustomerBankAccount = require('../../lib/models/customerBankAccount.js')

describe('models.CustomerBankAccount', () => {
  describe('#validate', () => {
    it('should return the error if the object is not valid', (done) => {
      let cba = new CustomerBankAccount({}, {
        email: 'invalid'
      })

      cba.validate((err) => {
        err.name.should.be.equal('ValidationError')
        done()
      })
    })

    it('should return the object if it is valid', (done) => {
      let cba = new CustomerBankAccount({}, {
        account_holder_name: "90Tech",
        account_number_ending: "00",
        country_code: "FR",
        currency: "EURO",
        bank_name: "Bank Inc.",
        metadata: "None",
        enabled: true,
        links: {
          customer: "CU1"
        }
      })

      cba.validate((err, obj) => {
        (err === null).should.be.true
        obj.account_number_ending.should.be.equal(cba.account_number_ending)
        done()
      })
    })
  })
})
