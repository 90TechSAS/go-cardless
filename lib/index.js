'use strict'

const _ = require('lodash')
const request = require('request')

const API_ENDPOINT = 'https://api.gocardless.com'
const SANDBOX_ENDPOINT = 'https://api-sandbox.gocardless.com'

var client = null
var models = new Map()
var frozen = false

/**
 * GoCardless API client
 */
class GoCardless {

  /**
   * Create GoCardless API client
   *
   * @param  {string} token - API token
   * @param  {string} version - API version
   * @param  {boolean=} sandbox - Whether sandbox should be enabled or not
   */
  static client (token, version, sandbox) {
    if (!client) {
      client = new GoCardless(token, version, sandbox)
    }
    return client
  }

  /**
   * Get Model by its name
   *
   * @param  {string} name - Model name
   * @param  {Model=} model - Model
   */
  static model (name, model) {
    if (model) {
      if (frozen) {
        throw new Error('GoCardless client is frozen')
      }
      models.set(name, model)
    } else if (!models.has(name)) {
      throw new Error(`Model "${name}" does not exist`)
    }
    return models.get(name)
  }

  /**
   * Freeze client
   */
  static freeze () {
    frozen = true
  }

  /**
   * @param  {string} token - API token
   * @param  {string} version - API version
   * @param  {boolean=} sandbox - Whether sandbox should be enabled or not
   * @private
   */
  constructor (token, version, sandbox) {
    if (!token) throw new Error('You must specify an API token to create a GoCardless instance')
    if (!version) throw new Error('You must specify GoCardless API version')

    /**
     * GoCardless API token
     * @type {string}
     */
    this._token = token

    /**
     * API version
     * @type {string}
     */
    this._version = version

    /**
     * API URL
     * @type {string}
     */
    this._url = sandbox ? SANDBOX_ENDPOINT : API_ENDPOINT
  }

  /**
   * Create HTTP request to API
   *
   * @param  {{url: string, method=: string, body:Object=}} options - Reqest options
   * @param  {function<Error=, response=, body=>} callback - Request callback
   */
  request (options, callback) {
    if (!options.url) return callback(new Error('You must provide an URL'))
    if (_.includes(['POST', 'PUT'], options.method) && !(options.body || options.json)) return callback(new Error(`You must provide a body for ${options.method}`))

    options.url = this._url + options.url
    options.method = options.method || 'GET'
    options.json = options.json || true

    // Add authentication headers
    options.headers = options.headers || {}
    options.headers['Authorization'] = `Bearer ${this._token}`
    options.headers['GoCardless-version'] = this._version
    options.headers['Accept'] = 'application/json'

    request(options, callback)
  }

  /**
   * Create HTTP GET request to API
   *
   * @param  {{url: string, method=: string, body:Object=}} options - Reqest options
   * @param  {function<Error=, response=, body=>} callback - Request callback
   */
  get (options, callback) {
    options.method = 'GET'
    this.request(options, callback)
  }

  /**
   * Create HTTP POST request to API
   *
   * @param  {{url: string, body:Object}} options - Reqest options
   * @param  {function<Error=, response=, body=>} callback - Request callback
   */
  post (options, callback) {
    options.method = 'POST'
    this.request(options, callback)
  }

  /**
   * Create HTTP PUT request to API
   *
   * @param  {{url: string, body:Object}} options - Reqest options
   * @param  {function<Error=, response=, body=>} callback - Request callback
   */
  put (options, callback) {
    options.method = 'PUT'
    this.request(options, callback)
  }

  /**
   * Create HTTP DELETE request to API
   *
   * @param  {{url: string}} options - Reqest options
   * @param  {function<Error=, response=, body=>} callback - Request callback
   */
  delete (options, callback) {
    options.method = 'DELETE'
    this.request(options, callback)
  }
}

module.exports = GoCardless

require('./models/Customer')
require('./models/CustomerBankAccount')
require('./models/Mandate')
require('./models/Payment')
require('./models/Refund')
require('./models/Subscription')
GoCardless.freeze()
