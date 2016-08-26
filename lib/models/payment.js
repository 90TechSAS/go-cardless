'use strict'
const BaseModel = require('./baseModel')

class Payment extends BaseModel {

  constructor (client, params) {
    super(client)
    this.id = params.id
    this.created_at = params.created_at
    this.charge_date = params.charge_date
    this.amount = params.amount
    this.description = params.description
    this.currency = params.currency
    this.status = params.status
    this.reference = params.reference
    this.metadata = params.metadata
    this.amount_refunded = params.amount_refunded
    this.links = params.links
  }

}

module.exports = Payment
