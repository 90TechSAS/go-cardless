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

  createFromPaymentId (payment, amount, params, callback) {
    if (!payment) throw new Error('You must supply a payment Id to refund')
    if (!amount) throw new Error('You must supply an amount to refund')
    params = params || {}
    params.links = {payment: payment}
    params.amount = amount
    params.total_amount_confirmation = params.total_amount_confirmation || amount
    this.create(params, callback)
  }
}

module.exports = Refunds
