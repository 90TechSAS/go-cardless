'use strict'

const Model = require('../Model')
const Joi = require('joi')

Model.create('Refund', 'refunds', {
  id: Joi.string().regex(/^RF[A-Z0-9]+$/),
  created_at: Joi.date().iso(),
  amount: Joi.number().integer().required(),
  total_amount_confirmation: Joi.number().integer().required(),
  reference: Joi.string().optional(),
  links: Joi.object().keys({
    payment: Joi.string().required().regex(/^MD[A-Z0-9]+$/)
  }),
  metadata: Joi.object().max(3)
})
