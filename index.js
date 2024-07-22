const express = require('express')
const router = require('./router/route1')
const app = express()
const port = 3000
app.use(express.json());

app.use('/app/api/',router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})