const rewireStyledComponents = require('react-app-rewire-styled-components')
const rewireTypescript = require('react-app-rewire-typescript')
const rewireTsJest = require('react-app-rewire-ts-jest')
const rewireHotLoader = require('react-app-rewire-hot-loader')

const tsOptions = require('./typescript-options')
const rewireEnvVars = require('./rewire-env-vars')
const rewireAntd = require('./rewire-antd')
const rewireTsPaths = require('./rewire-ts-paths')
const rewireTsJestPaths = require('./rewire-ts-jest-paths')

module.exports = {
  webpack: (config, env) => {
    config = rewireHotLoader(config, env)
    config = rewireStyledComponents(config, env)
    config = rewireAntd(config, env)
    config = rewireEnvVars(config, env, { 'BUILD_TIME': Date.now() })

    if (env === 'development') {
      config = rewireTypescript(config, env, tsOptions)
    } else {
      config = rewireTypescript(config, env)
    }

    config = rewireTsPaths(config, env)

    return config
  },
  jest: (config) => {
    config = rewireTsJest(config)
    config = rewireTsJestPaths(config)

    return config
  }
}
