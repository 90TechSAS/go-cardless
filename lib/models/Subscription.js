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
  end_date: Joi.date().format('YYYY-MM-DD'),
  interval: Joi.number().integer(),
  currency: Joi.string().required().valid([ 'weekly', 'monthly', 'yearly' ]),
  month: Joi.string().optional(),
  name: Joi.string().optional(),
  payment_reference: Joi.string().optional(),
  links: Joi.object().keys({
    mandate: Joi.string().required().regex(/^MD[A-Z0-9]+$/)
  }),
  metadata: Joi.object().max(3)
})
