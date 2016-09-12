/* global describe it before */
'use strict'

const GoCardless = require('../../lib/index.js')
const Customer = GoCardless.model('Customer')

const template = {
  email: 'john.doe@domain.com',
  given_name: 'John',
  family_name: 'Doe',
  address_line1: 'Champ de Mars',
  address_line2: '5 Avenue Anatole France',
  city: 'Paris',
  postal_code: '75007',
  country_code: 'FR',
  language: 'en'
}

var customer

describe('models.Customer', () => {
  before(function (done) {
    this.timeout(5000)
    GoCardless.client().post({
      url: '/customers',
      json: {
        customers: template
      }
    }, (err, res, cust) => {
      customer = cust.customers
      done(err)
    })
  })

  describe('#get()', () => {
    it('should get a single customer', function (done) {
      this.timeout(5000)
      Customer.get(customer.id, (err, cust) => {
        (err === null).should.be.true()
        cust.email.should.be.equal('john.doe@domain.com')
        done()
      })
    })
  })

  describe('#list()', () => {
    it('should list customers', function (done) {
      this.timeout(5000)
      Customer.list({}, (err, customers) => {
        (err === null).should.be.true()
        customers.length.should.be.aboveOrEqual(1)
        done()
      })
    })
  })

  describe('#save()', () => {
    it('should create a customer if it does not have an ID', function (done) {
      this.timeout(5000)
      let c = new Customer(template)

      c.save((err, cust) => {
        (err === null).should.be.true()
        cust.email.should.be.equal('john.doe@domain.com')
        done()
      })
    })

    it('should update a customer if it has an ID', function (done) {
      this.timeout(5000)
      Customer.get(customer.id, (err, c) => {
        (err === null).should.be.true()
        c.email = 'jane.doe@domain.com'

        c.save((err, cust) => {
          (err === null).should.be.true()
          cust.email.should.be.equal('jane.doe@domain.com')
          c.id.should.be.equal(cust.id)
          done()
        })
      })
    })
  })

  describe('#validate', () => {
    it('should return the error if the object is not valid', done => {
      let customer = new Customer({
        email: 'invalid'
      })

      customer.validate((err) => {
        err.name.should.be.equal('ValidationError')
        done()
      })
    })

    it('should return an empty error if the model is valid', done => {
      let customer = new Customer({
        id: 'CU1',
        created_at: new Date(),
        email: 'hello@domain.com',
        given_name: 'John',
        family_name: 'Doe',
        address_line1: 'Champ de Mars',
        address_line2: '5 Avenue Anatole France',
        city: 'Paris',
        postal_code: '75007',
        country_code: 'FR',
        language: 'en'
      })

      customer.validate((err) => {
        (err === null).should.be.true
        done()
      })
    })
  })
})
