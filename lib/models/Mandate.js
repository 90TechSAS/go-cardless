'use strict'

const Model = require('../Model')
const Joi = require('joi')

Model.create('Mandate', 'mandates', {
  id: Joi.string().regex(/^MD[A-Z0-9]+$/),
  created_at: Joi.date().iso(),
  reference: Joi.string().required(),
  scheme: Joi.string().required().valid([ 'autogiro', 'bacs', 'sepa_core', 'sepa_cor1' ]),
  links: Joi.object().keys({
    creditor: Joi.string().optional(),
    customer_bank_account: Joi.string().required().regex(/^BA[A-Z0-9]+$/)
  }),
  metadata: Joi.object().max(3)
})
