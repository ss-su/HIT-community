module.exports = function rewireTsJestPaths (config) {
  config.moduleNameMapper = config.moduleNameMapper || {}
  config.moduleNameMapper['@/(.*)'] = '<rootDir>/src/$1'

  return config
}
