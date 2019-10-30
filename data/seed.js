const fs = require('fs')

const startMongo = require('./../connections/connection')

const Workflow = require('./../models/workflow')
const Action = require('./../models/action')
const Mapping = require('./../models/mapping')

const workflows = JSON.parse(
  fs.readFileSync(__dirname + '/workflows.json', 'utf-8')
)
const actions = JSON.parse(
  fs.readFileSync(__dirname + '/actions.json', 'utf-8')
)
const mappings = JSON.parse(
  fs.readFileSync(__dirname + '/mappings.json', 'utf-8')
)

const stringifyMappings = mappings.map(item => ({
  ...item,
  output: JSON.stringify(item.output),
}))

const stringifyWorkflows = workflows.map(item => ({
  ...item,
  meta: {
    ...item.meta,
    transformations: JSON.stringify(item.meta.transformations),
  },
}))

async function deleteData() {
  await startMongo()
  console.log('\n Deleting Data...\n')
  await Workflow.remove()
  await Action.remove()
  await Mapping.remove()

  console.log('\n Data Deleted.\n')
  process.exit()
}

async function loadData() {
  try {
    await startMongo()

    await Workflow.insertMany(stringifyWorkflows)
    await Action.insertMany(actions)
    await Mapping.insertMany(stringifyMappings)

    console.log('\n 👍 Done! \n')
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
