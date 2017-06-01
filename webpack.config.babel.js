import { resolve, join } from 'path'

import merge from 'webpack-merge'

import parts from './webpack/parts'

console.log('LIFECYCLE EVENT:', process.env.npm_lifecycle_event)

if (process.env.WDS_HOST === undefined) process.env.WDS_HOST = 'localhost'
if (process.env.WDS_PORT === undefined) process.env.WDS_PORT = 3001

const isVendor = ({ resource }) => resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/)

const PATHS = {
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
      path: PATHS.build,
      filename: '[name].js',
      publicPath: '/',
    },
  },

  parts.lintStyles({ include: PATHS.sources }),

  parts.lintJavascript({ include: PATHS.sources }),
  parts.loadJavascript({ include: PATHS.sources, exclude: PATHS.exclude }),

  parts.namedModulesPlugin(),
  parts.noErrorsPlugin(),
])

const developmentConfig = merge([
  {
    output: { pathinfo: true },
  },

  parts.loadStyles({ include: PATHS.sources, exclude: PATHS.exclude }),
  parts.devServer({ host: 'localhost', port: 3001 }),
  parts.generateSourceMaps('cheap-module-eval-source-map'),
])

const productionConfig = merge([
  {
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 100000,
      maxAssetSize: 450000,
    },
  },

  parts.cleanPlugin({ path: PATHS.build, root: PATHS.root }),
  parts.minifyJavascript(),
  parts.extractStyles(),
  parts.extractBundles([
    { name: 'vendor', chunks: [ 'app' ], minChunks: isVendor },
    { name: 'manifest', minChunks: Infinity },
  ]),
  parts.hashedModuleIdsPlugin(),
  parts.generateSourceMaps('source-map'),
])

export default env => {
  process.env.NODE_ENV = env
  process.env.BABEL_ENV = env

  const isDevelopment = env === 'development'

  const config = merge([
    parts.page({
      title: 'React Skellington Test',
      template: './src/index.html',
      entry: {
        app: (
          isDevelopment ?
            parts.hotloader() : []
          ).concat([ PATHS.sources ]),
      },
      chunks: [ 'manifest', 'vendor', 'app' ],
    }),
    commonConfig,
    isDevelopment ?
      developmentConfig : productionConfig,
  ])

  console.dir(config, { depth: null, colors: true })

  return config
}
