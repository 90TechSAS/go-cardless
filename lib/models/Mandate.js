'use strict'

const Model = require('../Model')
const Joi = require('joi')

Model.create('Customer', 'customers', {
  id: Joi.string().regex(/^CU[A-Z0-9]+$/),
  created_at: Joi.date().iso(),
  reference: Joi.string().required(),
  scheme: Joi.string().required().valid([ 'autogiro', 'bacs', 'sepa_core', 'sepa_cor1' ]),
  links: Joi.object().keys({
    creditor: Joi.string().optional(),
    customer_bank_account: Joi.string().required()
  }),
  metadata: Joi.object().max(3)
})
