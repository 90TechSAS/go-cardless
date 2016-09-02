'use strict'

const BaseModel = require('./baseModel')
const Joi = require('joi')

const validationSchema = Joi.object().keys({
  account_holder_name: Joi.string().email().required(),
  account_number_ending: Joi.string().required(),
  country_code: Joi.string().required(),
  currency: Joi.string().required(),
  bank_name: Joi.string(),
  metadata: Joi.string(),
  enabled: Joi.boolean(),
  links: Joi.object().keys({
    customer: Joi.string().required().regex(/^CU\d+$/)
  })
})

class CustomerBankAccount extends BaseModel {

  constructor (client, params) {
    super(client)
    this.id = params.id
    this.created_at = params.created_at
    this.account_holder_name = params.account_holder_name
    this.account_number_ending = params.account_number_ending
    this.country_code = params.country_code
    this.currency = params.currency
    this.bank_name = params.bank_name
    this.metadata = params.metadata
    this.enabled = params.enabled
    this.links = params.links
  }

  validate (callback) {
    Joi.validate(this, validationSchema, null, callback)
  }

  createMandate (callback) {
    this.client.mandates.createFromCustomerBankAccount(this.id, callback)
  }
}

module.exports = CustomerBankAccount
