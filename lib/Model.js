'use strict'

const Joi = require('joi')

const GoCardless = require('./index')

class Model {

  /**
   * Create a model with a url
   *
   * @param  {string} name - Model name
   * @param  {string} url - Model URL
   * @param  {Object} fields - Model fields
   */
  static create (name, url, fields) {
    fields = Joi.object().keys(fields)
    let model = class model {
      /**
       * Model base URL
       * @type {string}
       */
      static get url () {
        return url
      }

      /**
       * Model name
       * @type {string}
       */
      static get name () {
        return name
      }

      /**
       * Model validation object
       * @type {Joi}
       */
      static get validation () {
        return fields
      }

      /**
       * Get model by ID
       *
       * @param  {string} ID - Model ID
       * @param  {function<Error, Model>} callback - Function to call when model has been retrieved
       */
      static get (id, callback) {
        GoCardless.client().get({
          url: `${url}/${id}`
        }, callback)
      }

      /**
       * Get a list of models
       *
       * @param  {Object} parameters - Query parameters
       * @param  {function<Error, Model>} callback - Function to call when models have been retrieved
       */
      static list (parameters, callback) {
        GoCardless.client().get({
          url: url,
          qs: parameters
        }, callback)
      }

      /**
       * Delete a model by ID
       *
       * @param  {string} ID - Model ID
       * @param  {function<Error, Model>} callback - Function to call when model has been retrieved
       */
      static remove (id, callback) {
        GoCardless.client().delete({
          url: `${url}/${id}`
        }, callback)
      }

      /**
       * @param  {Object} data
       */
      constructor (data) {
        /**
         * Model data
         * @type {data}
         */
        this._data = data
      }

      /**
       * Validate model
       *
       * @param  {function<Error, Model>} callback - Function to call when model has been validated
       */
      validate (callback) {
        Joi.validate(this._data, this.constructor.validation, {
          stripUnknown: true
        }, callback)
      }

      /**
       * Save the model
       *
       * @param  {function<Error, Model>} callback - Function to call when model has been saved
       */
      save (callback) {
        this.validate((err) => {
          if (err) {
            return callback(err)
          }
          if (this._data.id) {
            GoCardless.client().put({
              url: `${url}/${this._data.id}`,
              json: this._data
            }, callback)
          } else {
            GoCardless.client().post({
              url: url,
              json: this._data
            }, callback)
          }
        })
      }
    }

    GoCardless.model(name, model)
    return model
  }
}

module.exports = Model
