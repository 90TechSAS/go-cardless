/* global describe it before after */
'use strict'

const sinon = require('sinon')
const Joi = require('joi')
const Model = require('../lib/Model.js')
const GoCardless = require('../lib/index.js')

/**
 * GoCardless model method
 * @type {function}
 */
const modelMethod = GoCardless.model

/**
 * GoCardless request method
 * @type {function}
 */
const req = GoCardless.prototype.request

/**
 * Registered models for tests
 * @type {Object}
 */
let models = {}

describe('Model', () => {
  before(() => {
    GoCardless.model = function (name, model) {
      if (model && !models[name]) {
        models[name] = model
      }
      return models[name]
    }

    GoCardless.prototype.request = function (options, callback) {
      callback()
    }
  })

  after(() => {
    GoCardless.model = modelMethod
    GoCardless.prototype.request = req
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

  describe('#get()', () => {
    beforeEach(() => {
      Model.create('User', '/users', { email: Joi.string().email().required() })
    })

    it('should get a model via its ID', done => {
      const User = GoCardless.model('User')
      const spy = sinon.spy(GoCardless.client(), 'request')

      User.get('US1', () => {
        spy.should.be.calledOnce()
        spy.should.be.calledWith({
          url: '/users/US1',
          method: 'GET'
        })
        spy.restore()
        done()
      })
    })
  })

  describe('#list()', () => {
    beforeEach(() => {
      Model.create('User', '/users', { email: Joi.string().email().required() })
    })

    it('should get a list of models', done => {
      const User = GoCardless.model('User')
      const spy = sinon.spy(GoCardless.client(), 'request')

      User.list({}, () => {
        spy.should.be.calledOnce()
        spy.should.be.calledWith({
          url: '/users',
          method: 'GET',
          qs: {}
        })
        spy.restore()
        done()
      })
    })
  })

  describe('#remove()', () => {
    beforeEach(() => {
      Model.create('User', '/users', { email: Joi.string().email().required() })
    })

    it('should delete a model via its ID', done => {
      const User = GoCardless.model('User')
      const spy = sinon.spy(GoCardless.client(), 'request')

      User.remove('US1', () => {
        spy.should.be.calledOnce()
        spy.should.be.calledWith({
          url: '/users/US1',
          method: 'DELETE'
        })
        spy.restore()
        done()
      })
    })
  })

  describe('#save()', () => {
    beforeEach(() => {
      Model.create('User', '/users', { id: Joi.string(), email: Joi.string().email().required() })
    })

    it('should fail if the model is not valid', done => {
      const User = GoCardless.model('User')
      const data = { email: 'invalid' }
      const user = new User(data)

      user.save((err) => {
        (err === null).should.be.false
        err.name.should.be.equal('ValidationError')
        done()
      })
    })

    it('should create a model if it does not have an ID', done => {
      const User = GoCardless.model('User')
      const spy = sinon.spy(GoCardless.client(), 'request')
      const data = { email: 'valid@domain.com' }
      const user = new User(data)

      user.save((err) => {
        (err === null).should.be.true
        spy.should.be.calledOnce()
        spy.should.be.calledWith({
          url: '/users',
          method: 'POST',
          json: data
        })
        spy.restore()
        done()
      })
    })

    it('should update a model if it has an ID', done => {
      const User = GoCardless.model('User')
      const spy = sinon.spy(GoCardless.client(), 'request')
      const data = { id: 'US1', email: 'valid@domain.com' }
      const user = new User(data)

      user.save((err) => {
        (err === null).should.be.true
        spy.should.be.calledOnce()
        spy.should.be.calledWith({
          url: '/users/US1',
          method: 'PUT',
          json: data
        })
        spy.restore()
        done()
      })
    })
  })
})