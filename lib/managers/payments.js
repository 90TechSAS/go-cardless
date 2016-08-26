'use strict'
var Base = require('../base')
var Payment = require('../models/payment')

const BASE_ENDPOINT = 'payments'

class Payments extends Base {

  constructor (client) {
    super(client, {
      baseEndpoint: BASE_ENDPOINT,
      Model: Payment
    })
  }
}

module.exports = Payments
