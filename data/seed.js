const fs = require('fs')

const startMongo = require('./../connections/connection')

const Workflow = require('./../models/workflow')
const Action = require('./../models/action')
const Mapping = require('./../models/mapping')

const workfows = JSON.parse(
  fs.readFileSync(__dirname + '/workflows.json', 'utf-8')
)
const actions = JSON.parse(
  fs.readFileSync(__dirname + '/actions.json', 'utf-8')
)
const mappings = JSON.parse(
  fs.readFileSync(__dirname + '/mappings.json', 'utf-8')
)

async function deleteData() {
  await startMongo()
  console.log('😢😢 Goodbye Data...')
  await Workflow.remove()
  await Action.remove()
  await Mapping.remove()

  console.log(
    'Data Deleted. To load sample data, run\n\n\t npm run db:seed\n\n'
  )
  process.exit()
}

async function loadData() {
  try {
    await startMongo()
    const stringifyOutput = mappings.map(({ _id, output }) => ({
      _id,
      output: JSON.stringify(output),
    }))
    await Workflow.insertMany(workfows)
    await Action.insertMany(actions)
    await Mapping.insertMany(stringifyOutput)

    console.log('👍👍👍👍👍👍👍👍 Done!')
    process.exit()
  } catch (e) {
    console.log(
      '\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run db:delete\n\n\n'
    )
    console.log(e)
    process.exit()
  }
}

if (process.argv.includes('--delete')) {
  deleteData()
} else {
  loadData()
}
