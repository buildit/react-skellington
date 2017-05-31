import { resolve, join } from 'path'

import merge from 'webpack-merge'

import parts from './webpack/parts'

console.log('LIFECYCLE EVENT:', process.env.npm_lifecycle_event)

if (process.env.WDS_HOST === undefined) process.env.WDS_HOST = 'localhost'
if (process.env.WDS_PORT === undefined) process.env.WDS_PORT = 3001

const PATHS2 = {
  root: resolve(__dirname),
  sources: join(__dirname, 'src'),
  build: join(__dirname, 'build'),
  entry: join(__dirname, 'src', 'index.js'),
  exclude: [
    join(__dirname, 'build'),
    /node_modules/,
  ],
}

const commonConfig = merge([
  {
    output: {
      path: PATHS2.build,
      filename: '[name].js',
      publicPath: '/',
      pathinfo: true,
    },
  },

  parts.lintJavascript({ include: PATHS2.sources }),
  // parts.lintCSS({ include: PATHS2.sources }),
  parts.loadJavascript({ include: PATHS2.sources }),

  parts.namedModulesPlugin(),
  parts.noErrorsPlugin(),
])

const developmentConfig = merge([
  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
  parts.devServer(),
  parts.loadSass({ include: PATHS2.sources }),

  parts.hotModulePlugin(),
])

const productionConfig = merge([
  {
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000, // in bytes
    },
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
    },
  },
  parts.cleanPlugin({ path: PATHS2.build, root: PATHS2.root }),
  parts.hashedModuleIdsPlugin(),
  parts.uglifyPlugin(),
  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
    },
    {
      name: 'manifest',
      minChunks: Infinity,
    },
  ]),
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.extractCSS({
    use: [ 'css-loader', parts.autoprefix(), 'sass-loader' ],
  }),
])

export default env => {
  process.env.NODE_ENV = env
  process.env.BABEL_ENV = env

  const entry = env === 'development' ?
    parts.devServerEntry({ entry: [ PATHS2.sources ] }) : { entry: [ PATHS2.sources ] }

  const page = parts.page({
    ...entry,
    title: 'React Skellington Test',
    template: './src/index.html',
    chunks: [ 'vendor', 'manifest' ],
  })

  const envConfig = env === 'production' ? productionConfig : developmentConfig

  const config = merge([page, commonConfig, envConfig])

  // console.dir(config, { depth: null, colors: true })

  return config
}
