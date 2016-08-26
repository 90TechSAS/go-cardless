'use strict'
var Base = require('../base')
var CustomerBankAccount = require('../models/customerBankAccount')

const BASE_ENDPOINT = 'customer_bank_accounts'

class CustomerBankAccounts extends Base {

  constructor (client) {
    super(client, {
      baseEndpoint: BASE_ENDPOINT,
      Model: CustomerBankAccount
    })
  }
}
module.exports = CustomerBankAccounts
