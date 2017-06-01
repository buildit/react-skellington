import { HotModuleReplacementPlugin } from 'webpack'

const WDS_DEFAULTS = {
  host: process.env.WDS_HOST || 'localhost',
  port: process.env.WDS_PORT || 3001,
}

/**
 * Returns a configured `devServer` stanza for webpack.
 *
 * Irritatingly also includes the list of entries that _must_ be
 * prepended to the actual source entry to allow HMR to actually work
 *
 * TODO: Refactor the `entry` and (possibly) `plugin` stanzas into
 * their own exported functions - in the case of `entry`, we need to
 * add special behaviour (see above)
 *
 * @param  {String} options.host defaults to 'localhost'
 * @param  {Number} options.port defaults to 3001
 * @return {Object}
 */
export const devServer = ({
  host = WDS_DEFAULTS.host,
  port = WDS_DEFAULTS.port,
} = {}) => ({
  devServer: {
    host,
    port,

    hot: true,
    historyApiFallback: true,

    compress: true,

    // noInfo: false,
    // stats: 'minimal',
    stats: {
      colors: true,
      children: false,
      chunks: false,
      assetsSort: 'name',
      version: false,
      usedExports: true,
    },

    overlay: {
      errors: true,
      warnings: true,
    },

    headers: {
      'Access-Control-Allow-Origin': '*',
    },

    publicPath: '/',
  },
  plugins: [
    new HotModuleReplacementPlugin({
      multiStep: true,
    }),
  ],
})

// You don't apparently _have_ to specify a full URL for client...
// but using `client?/` appears to make HMR + WDS do things twice
export const hotloader = ({ host = WDS_DEFAULTS.host, port = WDS_DEFAULTS.port } = {}) => ([
  'react-hot-loader/patch',
  `webpack-dev-server/client?http://${host}:${port}`,
  // `webpack-dev-server/client?/`,
  'webpack/hot/only-dev-server',
])
