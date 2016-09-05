/* global describe it before after */
'use strict'

const Joi = require('joi')
const Model = require('../lib/Model.js')
const GoCardless = require('../lib/index.js')

/**
 * GoCardless model method
 * @type {function}
 */
let modelMethod
let models = {}

describe('Model', () => {
  before(() => {
    modelMethod = GoCardless.model
    GoCardless.model = function (name, model) {
      if (model && !models[name]) {
        models[name] = model
      }
      return models[name]
    }
  })

  after(() => {
    GoCardless.model = modelMethod
  })

  afterEach(() => {
    models = {}
  })

  describe('#create()', () => {
    it('should create a model', () => {
      let User = Model.create('User', '/users', { email: Joi.string().email().required() })
      User.name.should.be.equal('User')
      User.url.should.be.equal('/users')
    })

    it('should register model to GoCardless client', () => {
      Model.create('Post', '/posts', { content: Joi.string().required() })
      GoCardless.model('Post').name.should.be.equal('Post')
    })
  })

  describe('#validate()', () => {
    beforeEach(() => {
      Model.create('User', '/users', { email: Joi.string().email().required() })
    })

    it('should return an error if the model is not valid', done => {
      const User = GoCardless.model('User')
      const user = new User({ email: 'invalid' })

      user.validate((err) => {
        err.name.should.be.equal('ValidationError')
        done()
      })
    })

    it('should return no errors if the model is valid', done => {
      const User = GoCardless.model('User')
      const data = { email: 'valid@domain.com' }
      const user = new User()

      user.validate((err) => {
        (err === null).should.be.true
        done()
      })
    })
  })
})
