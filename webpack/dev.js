import { HotModuleReplacementPlugin, NamedModulesPlugin, NoErrorsPlugin } from 'webpack'

const entry = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:3001',
  'webpack/hot/only-dev-server',
]

const devtool = 'cheap-module-eval-source-map'

const devServer = {
  hot: true,
  historyApiFallback: true,

  noInfo: false,
  stats: 'minimal',

  host: 'localhost',
  port: 3001,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },

  publicPath: '/',
}

const plugins = [
  new NoErrorsPlugin,
  new HotModuleReplacementPlugin,
  new NamedModulesPlugin,
]

export default {
  entry,
  devtool,
  devServer,
  plugins,
}
