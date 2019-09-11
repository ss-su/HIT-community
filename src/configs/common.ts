import { format } from 'date-fns'

const timespan = process.env.BUILD_TIME

const buildVersion = timespan
  ? 'Build ' + format(parseInt(timespan, 10), 'YYMMDD.HHmm')
  : ''

if (console.info) {
  console.info(buildVersion)
}

const commonConfig = {
  buildVersion,
  loginURL: location.pathname + '#/login'
}

export default commonConfig
