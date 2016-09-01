'use strict'

const BaseModel = require('./baseModel')
const Joi = require('joi')

const validationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  given_name: Joi.string().required(),
  family_name: Joi.string().required(),
  address_line1: Joi.string().required(),
  address_line2: Joi.string(),
  address_line3: Joi.string(),
  city: Joi.string().required(),
  region: Joi.string(),
  postal_code: Joi.string().required(),
  country: Joi.string().required(),
  language: Joi.string(),
  metadata: Joi.object().max(3)
})

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

  validate (callback) {
    Joi.validate(this, validationSchema, null, callback)
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
