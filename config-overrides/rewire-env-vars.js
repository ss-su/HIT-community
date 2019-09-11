const webpack = require('webpack')
const paths = require('react-app-rewired/scripts/utils/paths')

const getClientEnvironment = require(require.resolve(paths.scriptVersion + '/config/env'))

module.exports = function rewireEnvVars (config, env, variables) {
  const envs = getClientEnvironment(config.output.publicPath.slice(0, -1))
  const processEnv = envs.stringified['process.env']

  Object.keys(variables).forEach((key) => {
    processEnv[key] = JSON.stringify(variables[key])
  })

  config.plugins.unshift(
    new webpack.DefinePlugin({
      'process.env': processEnv,
    })
  )

  return config
}
