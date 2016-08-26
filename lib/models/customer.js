'use strict'
const BaseModel = require('./baseModel')

class Customer extends BaseModel {

  constructor (client, params) {
    super(client)
    this.id = params.id
    this.created_at = params.created_at
    this.email = params.email
    this.given_name = params.given_name
    this.family_name = params.family_name
    this.address_line1 = params.address_line1
    this.address_line2 = params.address_line2
    this.address_line3 = params.address_line3
    this.city = params.city
    this.region = params.region
    this.postal_code = params.postal_code
    this.country_code = params.country_code
    this.language = params.language
    this.swedish_identity_number = params.swedish_identity_number
    this.metadata = params.metadata
  }

  createBankAccount (params, callback) {
    params = params || {}
    params.links = params.links || {}
    params.links.customer = params.links.customer || this.id
    this.client.customerBankAccounts.create(params, callback)
  }

  createBankAccountFromToken (token, callback) {
    if (!token) throw new Error('Invalid Token')
    var params = {
      links: {
        customer: this.id,
        customer_bank_account_token: token
      }
    }
    this.createBankAccount(params, callback)
  }

}

module.exports = Customer
