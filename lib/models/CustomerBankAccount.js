'use strict'

const Model = require('../Model')
const Joi = require('joi')

Model.create('CustomerBankAccount', 'customer_bank_accounts', {
  id: Joi.string().regex(/^BA[A-Z0-9]+$/),
  created_at: Joi.date().iso(),
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
