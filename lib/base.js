'use strict'
let request = require('request')
let PaginatedList = require('./models/paginatedList')

class Base {
  constructor (client, params) {
    this.token = client.token
    this.version = client.version
    this.url = client.url
    this.client = client
    this.baseEndpoint = params.baseEndpoint
    this.Model = params.Model
  }

  makeRequest (method, endpoint, params, callback) {
    return request({
      method: method || 'GET',
      url: `${this.url}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'GoCardless-version': this.version,
        'Accept': 'application/json'
      },
      json: params
    }, (err, response, body) => {
      if (body && body.error) {
        callback(body.error)
      }
      callback(err, response, body)
    })
  }

  validateParams (params) {
    return true
  }

  create (params, callback) {
    if (!this.validateParams(params)) {
      throw new Error('Invalid Params')
    }
    this.makeRequest(
      'POST',
      this.baseEndpoint,
      { [this.baseEndpoint]: params },
      (err, response, body) => {
        if (err) return callback(err)
        console.log(body)
        callback(
          null,
          new this.Model(
            this.client,
            body[ this.baseEndpoint ]
          ))
      })
  }

  getList (params, callback) {
    let p = ''
    if (Object.keys(params).length) {
      p = Object.keys(params).reduce(
        k => `${k}=${params[ k ]}&`,
        '?')
    }
    this.makeRequest(
      'GET',
      this.baseEndpoint + p, {}
      , (err, response, body) => {
        if (err) return callback(err)
        /** Create a value object with each of the elements returned by the query  */
        var resources = body[ this.baseEndpoint ]
          .map(element => new this.Model(this.client, element))
        callback(null, new PaginatedList(this, body.meta, resources))
      }
    )
  }

}

module.exports = Base