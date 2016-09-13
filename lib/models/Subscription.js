'use strict'

const Model = require('../Model')
const Joi = require('joi')

Model.create('Subscription', 'subscriptions', {
  id: Joi.string().regex(/^SB[A-Z0-9]+$/),
  created_at: Joi.date().iso(),
  amount: Joi.number().integer().required(),
  count: Joi.number().integer(),
  currency: Joi.string().required().valid([ 'EUR', 'GBP', 'SEK' ]),
  day_of_month: Joi.string().required(),
  start_date: Joi.date().format('YYYY-MM-DD'),
  end_date: Joi.date().format('YYYY-MM-DD'),
  interval: Joi.number().integer(),
  interval_unit: Joi.string().required().valid([ 'weekly', 'monthly', 'yearly' ]),
  month: Joi.string().optional(),
  name: Joi.string().optional(),
  payment_reference: Joi.string().optional(),
  links: Joi.object().keys({
    mandate: Joi.string().required().regex(/^MD[A-Z0-9]+$/)
  }),
  metadata: Joi.object().max(3)
}, {
  create: [ 'amount', 'count', 'currency', 'day_of_month', 'start_date', 'end_date', 'interval', 'interval_unit', 'metadata', 'month', 'name', 'payment_reference', 'links' ],
  update: [ 'metadata', 'name', 'payment_reference' ]
})
