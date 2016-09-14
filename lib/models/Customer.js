'use strict'

const Model = require('../Model')
const Joi = require('joi')

Model.create('Customer', 'customers', {
  id: Joi.string().regex(/^CU[A-Z0-9]+$/),
  created_at: Joi.date().iso(),
  email: Joi.string().email().required(),
  given_name: Joi.string().allow(null),
  family_name: Joi.string().allow(null),
  company_name: Joi.string().allow(null),
  address_line1: Joi.string().required(),
  address_line2: Joi.string().allow(null),
  address_line3: Joi.string().allow(null),
  city: Joi.string().required(),
  region: Joi.string().allow(null),
  postal_code: Joi.string().required(),
  country_code: Joi.string().required().max(2),
  language: Joi.string().allow(null),
  metadata: Joi.object().max(3)
})
