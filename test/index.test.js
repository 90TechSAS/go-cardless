/* global describe it */
'use strict'

const sinon = require('sinon')

const GoCardless = require('../lib/index.js')

/**
 * GoCardless request method
 * @type {function}
 */
const req = GoCardless.prototype.request

describe('GoCardless', () => {

  describe('#model', () => {
    it('should return an existing model', () => {
      GoCardless.model('Customer').name.should.be.equal('Customer')
    })

    it('should throw an error if the model does not exist', () => {
      (function () {
        GoCardless.model('User')
      }).should.throw('Model "User" does not exist')
    })

    it('should throw an error while trying to add a model if client is frozen', () => {
      (function () {
        GoCardless.model('User', {})
      }).should.throw('GoCardless client is frozen')
    })
  })

  describe('#client()', () => {
    it('should return the current client if called without arguments', () => {
      GoCardless.client()._url.should.be.equal('https://api-sandbox.gocardless.com')
    })
  })

  describe('#constructor()', () => {
    it('should throw an error if no token are provided', () => {
      (function () {
      new GoCardless(null, null, true)
      }).should.throw('You must specify an API token to create a GoCardless instance')
    })

    it('should return the current client if called without arguments', () => {
      (function () {
        new GoCardless('invalid', null, true)
      }).should.throw('You must specify GoCardless API version')
    })

    it('should set the url to the sandbox url if sandox is true', () => {
      new GoCardless('invalid', 'invalid', true)._url.should.be.equal('https://api-sandbox.gocardless.com')
    })

    it('should set the url to the production url if sandox is true', () => {
      new GoCardless('invalid', 'invalid', false)._url.should.be.equal('https://api.gocardless.com')
    })
  })

  describe('#request', () => {
    it('should throw an error if no url is provided', done => {
      GoCardless.client().request({}, (err) => {
        err.message.should.be.equal('You must provide an URL')
        done()
      })
    })

    it('should throw an error if no boby is provided for POSTand PUT requests', done => {
      GoCardless.client().request({
        url: '/',
        method: 'POST'
      }, (err) => {
        err.message.should.be.equal('You must provide a body for POST')
        done()
      })
    })

    it('should return the response when request has completed', done => {
      GoCardless.client().request({
        url: '/customers',
        method: 'GET'
      }, (err, response, body) => {
        (err === null).should.be.true
        response.statusCode.should.be.equal(200)
        done()
      })
    })

    it('should return default to GET request', done => {
      GoCardless.client().request({
        url: '/customers'
      }, (err, response, body) => {
        (err === null).should.be.true
        response.request.method.should.be.equal('GET')
        done()
      })
    })
  })

  describe('#get()', () => {
    before(() => {
      GoCardless.prototype.request = function (options, callback) {
        callback()
      }
    })

    after(() => {
      GoCardless.prototype.request = req
    })

    it('should create a GET request', done => {
      const spy = sinon.spy(GoCardless.client(), 'request')

      GoCardless.client().get({
        url: '/'
      }, (err) => {
        spy.should.be.calledOnce()
        spy.should.be.calledWith({
          url: '/',
          method: 'GET'
        })
        spy.restore()
        done()
      })
    })
  })

  describe('#post()', () => {
    before(() => {
      GoCardless.prototype.request = function (options, callback) {
        callback()
      }
    })

    after(() => {
      GoCardless.prototype.request = req
    })

    it('should create a POST request', done => {
      const spy = sinon.spy(GoCardless.client(), 'request')

      GoCardless.client().post({
        url: '/',
        json: {}
      }, (err) => {
        spy.should.be.calledOnce()
        spy.should.be.calledWith({
          url: '/',
          method: 'POST',
          json: {}
        })
        spy.restore()
        done()
      })
    })
  })

  describe('#put()', () => {
    before(() => {
      GoCardless.prototype.request = function (options, callback) {
        callback()
      }
    })

    after(() => {
      GoCardless.prototype.request = req
    })

    it('should create a PUT request', done => {
      const spy = sinon.spy(GoCardless.client(), 'request')

      GoCardless.client().put({
        url: '/',
        json: {}
      }, (err) => {
        spy.should.be.calledOnce()
        spy.should.be.calledWith({
          url: '/',
          method: 'PUT',
          json: {}
        })
        spy.restore()
        done()
      })
    })
  })

  describe('#delete()', () => {
    before(() => {
      GoCardless.prototype.request = function (options, callback) {
        callback()
      }
    })

    after(() => {
      GoCardless.prototype.request = req
    })

    it('should create a DELETE request', done => {
      const spy = sinon.spy(GoCardless.client(), 'request')

      GoCardless.client().delete({
        url: '/'
      }, (err) => {
        spy.should.be.calledOnce()
        spy.should.be.calledWith({
          url: '/',
          method: 'DELETE'
        })
        spy.restore()
        done()
      })
    })
  })
})
