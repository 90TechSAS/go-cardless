'use strict'
var Base = require('../base')
var Subscription = require('../models/subscription')

const BASE_ENDPOINT = 'subscriptions'

class Subscriptions extends Base {

  constructor (client) {
    super(client, {
      baseEndpoint: BASE_ENDPOINT,
      Model: Subscription
    })
  }
}

module.exports = Subscriptions
