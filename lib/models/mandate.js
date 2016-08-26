'use strict'
const BaseModel = require('./baseModel')

class Mandate extends BaseModel {

  constructor (client, params) {
    super(client)
    this.id = params.id
    this.created_at = params.created_at
    this.reference = params.reference
    this.status = params.status
    this.scheme = params.scheme
    this.next_possible_charge_date = params.next_possible_charge_date
    this.metadata = params.metadata
    this.links = params.links
  }

  makePayment (params, callback) {
    if (!params.amount || !params.currency) throw new Error('Amount and currency are required')
    params.links = params.links || {}
    params.links.mandate = this.id
    this.client.payments.create(params, callback)
  }

  makeSubscription (params, callback) {
    if (!params.amount || !params.currency || !params.interval_unit) throw new Error('Amount, currency, and interval_unit are required')
    params.links = params.links || {}
    params.links.mandate = this.id
    this.client.subscriptions.create(params, callback)
  }
}

module.exports = Mandate
