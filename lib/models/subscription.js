'use strict'
const BaseModel = require('./baseModel')

class Subscription extends BaseModel {

  constructor (client, params) {
    super(client)
    this.id = params.id
    this.created_at = params.created_at
    this.amount = params.amount
    this.currency = params.currency
    this.status = params.status
    this.name = params.name
    this.start_date = params.start_date
    this.end_date = params.end_date
    this.interval = params.interval
    this.interval_unit = params.interval_unit
    this.day_of_month = params.day_of_month
    this.month = params.month
    this.payment_reference = params.payment_reference
    this.upcoming_payments = params.upcoming_payments
    this.metadata = params.metadata
    this.links = params.links
  }

}

module.exports = Subscription
