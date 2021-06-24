const express = require('express')
const {
  registry,
  requestCounter,
  requestsByIncome,
  requestDurationGauge
} = require('./prom')

const app = express()

app.get('/', (req, res) => {
  const end = requestDurationGauge.startTimer()

  requestCounter.inc()

  requestsByIncome.inc({ income: 1500 }, 94)
  requestsByIncome.inc({ income: 2000 }, 20)
  requestsByIncome.inc({ income: 5000 }, 14)

  res.send('Hello World!')

  end({
    status: 200
  })
})

app.get('/metrics', async (req, res) => {
  const metrics = await registry.metrics()

  res.setHeader('content-type', 'text/plain')
  res.send(metrics)
})

app.listen(5000, () => {
  console.log('Running...')
})
