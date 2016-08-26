'use strict'
var Base = require('../base')
var Customer = require('../models/customer')

const BASE_ENDPOINT = 'customers'

class Customers extends Base {

  constructor (client) {
    super(client, {
      baseEndpoint: BASE_ENDPOINT,
      Model: Customer
    })
  }

}

module.exports = Customers
