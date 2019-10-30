const playground = {
  settings: {
    'editor.cursorShape': 'line', // possible values: 'line', 'block', 'underline'
    'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
    'editor.fontSize': 14,
    'editor.reuseHeaders': true, // new tab reuses headers from last tab
    'editor.theme': 'dark', // possible values: 'dark', 'light'
    'general.betaUpdates': false,
    'prettier.printWidth': 80,
    'prettier.tabWidth': 2,
    'prettier.useTabs': false,
    'request.credentials': 'include', // possible values: 'omit', 'include', 'same-origin'
    'schema.polling.enable': false, // enables automatic schema polling
    'schema.polling.endpointFilter': '*localhost*', // endpoint filter for schema polling
    'schema.polling.interval': 2000, // schema polling interval in ms
    'schema.disableComments': false,
    'tracing.hideTracingResponse': true,
  },
  workspaceName: 'MongoDB Engine with GraphQL',
}

module.exports = playground
