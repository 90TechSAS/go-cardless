'use strict'

const Model = require('../Model')
const Joi = require('joi')

Model.create('Payment', 'payments', {
  id: Joi.string().regex(/^PM[A-Z0-9]+$/),
  created_at: Joi.date().iso(),
  charge_date: Joi.date().format('YYYY-MM-DD'),
  amount: Joi.number().integer().required(),
  app_fee: Joi.number().integer().optional(),
  currency: Joi.string().required().valid([ 'EUR', 'GBP', 'SEK' ]),
  description: Joi.string().optional(),
  reference: Joi.string().optional(),
  status: Joi.string().optional(),
  links: Joi.object().keys({
    mandate: Joi.string().required().regex(/^MD[A-Z0-9]+$/)
  }),
  metadata: Joi.object().max(3)
}, {
  create: [ 'charge_date', 'amount', 'app_fee', 'currency', 'description', 'reference', 'status', 'links', 'metadata' ],
  update: [ 'metadata' ]
})
