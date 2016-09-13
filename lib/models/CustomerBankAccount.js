'use strict'

const Model = require('../Model')
const Joi = require('joi')

Model.create('CustomerBankAccount', 'customer_bank_accounts', {
  id: Joi.string().regex(/^BA[A-Z0-9]+$/),
  created_at: Joi.date().iso(),
  account_holder_name: Joi.string().required(),
  account_number: Joi.string(),
  bank_code: Joi.string(),
  branch_code: Joi.string(),
  iban: Joi.string(),
  account_number_ending: Joi.string().required(),
  currency: Joi.string().required(),
  metadata: Joi.object().max(3),
  enabled: Joi.boolean(),
  links: Joi.object().keys({
    customer: Joi.string().required().regex(/^CU[A-Z0-9]+$/)
  }),

  bank_name: Joi.string(),
  account_number_ending: Joi.string(),
}, {
  create: [ 'account_holder_name', 'account_number', 'bank_code', 'branch_code', 'iban', 'currency', 'links' ],
  update: [ 'metadata' ]
})
