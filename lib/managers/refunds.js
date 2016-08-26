'use strict'
var Base = require('../base')
var Refund = require('../models/refund')

const BASE_ENDPOINT = 'refunds'

class Refunds extends Base {

  constructor (client) {
    super(client, {
      baseEndpoint: BASE_ENDPOINT,
      Model: Refund
    })
  }
}

module.exports = Refunds
