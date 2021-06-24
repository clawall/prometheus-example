const {
  Counter,
  Gauge,
  Registry,
  collectDefaultMetrics
} = require('prom-client')

const register = new Registry()

register.setDefaultLabels({
  team: 'my_team',
  application: 'some_app',
  language: 'node'
})

collectDefaultMetrics({ register })

requestCounter = new Counter({
  name: 'home_screen_request_counter',
  help: 'Counts the amount of requests on the / endpoint.',
  registers: [register]
})

requestsByIncome = new Counter({
  name: 'requests_by_income',
  help: 'Counts the amount of requests based on the user\'s income.',
  labelNames: ['income'],
  registers: [register]
})

requestDurationGauge = new Gauge({
  name: 'home_screen_request_duration',
  help: 'Measures the request duration on the / endpoint',
  labelNames: ['status'],
  registers: [register]
})

module.exports = {
  registry: register,
  requestCounter,
  requestsByIncome,
  requestDurationGauge
}
