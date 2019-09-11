const { createTransformer } = require('typescript-plugin-styled-components')

const getName = (path) => path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
const getDisplayName = (file, bindingName) => `📦${getName(file)}__${bindingName}`
const styledComponentsTransformer = createTransformer({ getDisplayName })

module.exports = {
  getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
}
