'use strict'
var Base = require('../base')
var Mandate = require('../models/mandate')

const BASE_ENDPOINT = 'mandates'

class Mandates extends Base {

  constructor (client) {
    super(client, {
      baseEndpoint: BASE_ENDPOINT,
      Model: Mandate
    })
  }

  createFromCustomerBankAccount (bankAccount, callback) {
    if (!bankAccount) {
      throw new Error('Invalid Params')
    }
    this.create({
      links: {
        customer_bank_account: bankAccount
      }
    }, callback)
  }
}

module.exports = Mandates
