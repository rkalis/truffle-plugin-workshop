const axios = require('axios')

module.exports = async (config) => {
  const url = config.url || 'http://localhost:3000/artifacts'
  const contractName = config._[1]
  const contractsBuildDir = config.contracts_build_directory
  const artifactPath = `${contractsBuildDir}/${contractName}.json`

  const artifact = require(artifactPath)

  const { data } = await axios.post(url, { artifact })

  console.log(`Stored ${contractName} artifact with id ${data.insertedId}`)

  const { data: count } = await axios.get(`${url}/${contractName}`)
  console.log(`${count} ${contractName} artifacts stored in total`)
}
