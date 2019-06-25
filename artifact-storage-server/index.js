
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const { MongoClient } = require('mongodb')

require('dotenv').config();
const port = process.env.PORT || 3000
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (request, response) => {
  response.json({ info: 'Running' })
})

app.post('/artifacts', storeArtifact)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

async function storeArtifact(request, response) {
  try {
    const client = await MongoClient.connect(mongoUrl)
    const artifacts = client.db('truffle-university').collection('artifacts')
    const { artifact } = request.body

    const result = await artifacts.insertOne(artifact)

    if (result.insertedCount == 0) {
      response.sendStatus(500)
    } else {
      response.status(200).json(result.ops[0])
    }
  } catch (e) {
    response.status(500).send(e.toString())
  }
}
