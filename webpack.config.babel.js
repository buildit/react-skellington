import { resolve, join } from 'path'

export default env => {
  process.env.BABEL_ENV = env

  const PATHS = {
    source: join(__dirname, 'src'),
    build: join(__dirname, 'build'),
  }

  const envConfig = require(`./webpack/${env}`).default

  const config = envConfig({
    context: resolve(PATHS.source),

    entry: [ './index.js' ],

    output: {
      filename: '[name].js',
      path: PATHS.build,
      publicPath: '/',
    },
  })

  // console.dir(config, { depth: null, colors: true })

  return config
}
