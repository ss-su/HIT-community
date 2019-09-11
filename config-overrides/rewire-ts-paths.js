const fs = require('fs')
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = function rewireAntd (config, env) {
  const configFile = path.resolve(fs.realpathSync(process.cwd()), 'tsconfig.json')

  config.resolve.plugins = config.resolve.plugins || []
  config.resolve.plugins.push(new TsconfigPathsPlugin({ configFile }))

  return config
}
