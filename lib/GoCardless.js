'use strict'

const request = require('request')

const API_ENDPOINT = 'https://api.gocardless.com'
const SANDBOX_ENDPOINT = 'https://api-sandbox.gocardless.com'

var client = null

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
   * @param  {string} token - API token
   * @param  {string} version - API version
   * @param  {boolean=} sandbox - Whether sandbox should be enabled or not
   * @private
   */
  constructor (token, version, sandbox) {
    if (!token) throw new Error('You must specify an API token to create a goCardless instance')
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
  createRequest (options, callback) {
    if (!options.url) return callback(new Error('You must provide an URL'))
    if (['POST', 'PUT'].indexOf(options.method) !== -1 && (!options.body || !options.json)) return callback(new Error(`You must provide a body for ${options.method}`))

    options.url = this._url + options.url
    options.method = options.method || 'GET'

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
  createGetRequest (options, callback) {
    this.createRequest(options, callback)
  }

  /**
   * Create HTTP POST request to API
   *
   * @param  {{url: string, body:Object}} options - Reqest options
   * @param  {function<Error=, response=, body=>} callback - Request callback
   */
  createPostRequest (options, callback) {
    options.method = 'POST'
    this.createRequest(options, callback)
  }

  /**
   * Create HTTP PUT request to API
   *
   * @param  {{url: string, body:Object}} options - Reqest options
   * @param  {function<Error=, response=, body=>} callback - Request callback
   */
  createPutRequest (options, callback) {
    options.method = 'PUT'
    this.createRequest(options, callback)
  }

  /**
   * Create HTTP DELETE request to API
   *
   * @param  {{url: string}} options - Reqest options
   * @param  {function<Error=, response=, body=>} callback - Request callback
   */
  createDeleteRequest (options, callback) {
    options.method = 'DELETE'
    this.createRequest(options, callback)
  }
}

module.exports = GoCardless
