'use strict'

const Model = require('../Model')
const Joi = require('joi')

Model.create("Customer", "/customers", {
  id: Joi.string().regex(/^CU\d+$/),
  created_at: Joi.date().iso(),
  email: Joi.string().email().required(),
  given_name: Joi.string().required(),
  family_name: Joi.string().required(),
  address_line1: Joi.string().required(),
  address_line2: Joi.string(),
  address_line3: Joi.string(),
  city: Joi.string().required(),
  region: Joi.string(),
  postal_code: Joi.string().required(),
  country: Joi.string().required(),
  language: Joi.string(),
  metadata: Joi.object().max(3)
})
