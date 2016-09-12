'use strict'

const _ = require('lodash')

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
    const validation = Joi.object().keys(fields)
    class GoCardlessModel {
      /**
       * Model base URL
       * @type {string}
       */
      static get url () {
        return '/' + url
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
        return validation
      }

      /**
       * Get model by ID
       *
       * @param  {string} ID - Model ID
       * @param  {function<Error, Model>} callback - Function to call when model has been retrieved
       */
      static get (id, callback) {
        GoCardless.client().get({
          url: `/${url}/${id}`
        }, (err, res, body) => {
          /* istanbul ignore if */
          if (err) return callback(err)
          /* istanbul ignore if */
          if (body.error) return callback(body.error)
          callback(null, new GoCardlessModel(body[url]))
        })
      }

      /**
       * Get a list of models
       *
       * @param  {Object} parameters - Query parameters
       * @param  {function<Error, Model>} callback - Function to call when models have been retrieved
       */
      static list (parameters, callback) {
        GoCardless.client().get({
          url: '/' + url,
          qs: parameters
        }, (err, res, body) => {
          /* istanbul ignore if */
          if (err) return callback(err)
          /* istanbul ignore if */
          if (body.error) return callback(body.error)
          console.log(body)
          callback(null, _.map(body[url], (m) => new GoCardlessModel(m)))
        })
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

          let json = {}
          json[url] = _.clone(this._data)

          if (this._data.id) {
            delete json[url].id
            delete json[url].created_at

            GoCardless.client().put({
              url: `/${url}/${this._data.id}`,
              json: json
            }, (err, res, body) => {
              /* istanbul ignore if */
              if (err) return callback(err)
              /* istanbul ignore if */
              if (body.error) return callback(body.error)
              callback(null, new GoCardlessModel(body[url]))
            })
          } else {
            GoCardless.client().post({
              url: '/' + url,
              json: json
            }, (err, res, body) => {
              /* istanbul ignore if */
              if (err) return callback(err)
              /* istanbul ignore if */
              if (body.error) return callback(body.error)
              callback(null, new GoCardlessModel(body[url]))
            })
          }
        })
      }
    }

    _(fields).keys().each((key) => {
      Object.defineProperty(GoCardlessModel.prototype, key, {
        get: function () {
          return this._data[key]
        },
        set: function (val) {
          if (!_.includes(['id', 'created_at'], key)) {
            this._data[key] = val
          }
        }
      })
    })

    GoCardless.model(name, GoCardlessModel)
    return GoCardlessModel
  }
}

module.exports = Model
