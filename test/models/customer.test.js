/* global describe it */
'use strict'

const Customer = require('../../lib/models/customer.js')

describe('models.Customer', () => {
  describe('#validate', () => {
    it('should return the error if the object is not valid', (done) => {
      let customer = new Customer({}, {
        email: 'invalid'
      })

      customer.validate((err) => {
        err.name.should.be.equal('ValidationError')
        done()
      })
    })

    it('should return the object if it is valid', (done) => {
      let customer = new Customer({}, {
        email: 'hello@domain.com',
        given_name: 'John',
        family_name: 'Doe',
        address_line1: 'Champ de Mars',
        address_line2: '5 Avenue Anatole France',
        city: 'Paris',
        postal_code: '75007',
        country: 'France',
        language: 'en'
      })

      customer.validate((err, obj) => {
        (err === null).should.be.true
        obj.email.should.be.equal(customer.email)
        done()
      })
    })
  })
})
