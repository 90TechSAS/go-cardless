'use strict'

class BaseModel {
  constructor (client) {
    this.token = client.token
    this.version = client.version
    this.url = client.url
    this.client = client
  }
}

module.exports = BaseModel