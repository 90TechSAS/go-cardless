/* global describe it */
'use strict'

const Joi = require('joi')
const Model = require('../../lib/models/Model.js')

describe('model.Model', () => {
  describe('#create()', () => {
    it('should create a model', done => {
      let User = Model.create('User', '/users', {
        email: Joi.string().email().required()
      })
    })
  })
})
