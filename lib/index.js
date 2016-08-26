'use strict'

const Customers = require('./managers/customers')
const CustomerBankAccounts = require('./managers/customerBankAccounts')
const Mandates = require('./managers/mandates')
const Payments = require('./managers/payments')
const Subscriptions = require('./managers/subscriptions')
const Refund = require('./managers/refunds')
const Base = require('./base')

let client

class GoCardless {

  static client (token, version, sandbox) {
    if (!client) {
      client = new GoCardless(token, version, sandbox)
    }
    return client
  }

  constructor (token, version, sandbox) {
    var url = 'https://api.gocardless.com/'
    if (sandbox) url = 'https://api-sandbox.gocardless.com/'
    if (!token) throw new Error('You must specify an API token to create a goCardless instance')
    this.token = token
    if (!version) throw new Error('You must specify GoCardless API version')
    this.version = version
    this.url = url

    this._customers = new Customers(this)
    this._customerBankAccounts = new CustomerBankAccounts(this)
    this._mandates = new Mandates(this)
    this._payments = new Payments(this)
    this._subscriptions = new Subscriptions(this)
    this._refunds = new Refunds(this)
  }

  get customers () {
    return this._customers
  }

  get customerBankAccounts () {
    return this._customerBankAccounts
  }

  get mandates () {
    return this._mandates
  }

  get payments () {
    return this._payments
  }

  get subscriptions () {
    return this._subscriptions
  }

  get refunds () {
    return this._refunds
  }

}

module.exports = GoCardless
