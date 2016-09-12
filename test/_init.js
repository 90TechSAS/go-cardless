const config = require('./gocardless.json')
const GoCardless = require('../lib/index.js')
GoCardless.client(config.token, config.version, true)
console.log(`Running tests in sandbox mode (${GoCardless.client()._url})`)
