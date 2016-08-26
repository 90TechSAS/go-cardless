'use strict'
let request = require('request')

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
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(params)
    }, (err, response, body) => {
      console.log(`${this.url}${endpoint}`, params)
      console.log(body)
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
        callback(
          null,
          new this.Model(
            this.client,
            JSON.parse(body)[ this.baseEndpoint ]
          ))
      })
  }

}

module.exports = Base