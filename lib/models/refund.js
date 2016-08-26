'use strict'
const BaseModel = require('./baseModel')

class Refund extends BaseModel {

  constructor (client, params) {
    super(client)
    this.id = params.id
    this.created_at = params.created_at
    this.amount = params.amount
    this.currency = params.currency
    this.reference = params.reference
    this.metadata = params.metadata
    this.reason = params.reason
    this.links = params.links
  }

}

module.exports = Refund
