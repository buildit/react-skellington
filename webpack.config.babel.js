import { resolve } from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'

const env = process.env.NODE_ENV || 'dev';

export default () => {
  const { entry, plugins, ...envConfig } = require(`./webpack/${env}`).default

  const baseConfig = {
    context: resolve(__dirname, 'src'),

    entry: [ './index.js', ],

    output: {
      filename: '[name].js',
      path: resolve(__dirname, 'build'),
      chunkFilename: '[name]-[chunkhash].js',
      sourceMapFilename: '[name].map',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [ 'babel-loader' ],
        },
        {
          test: /\.s?a?c?ss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
      }),
    ],
  }

  const config = { ...baseConfig, ...envConfig }

  if (entry)
    config.entry = [ ...entry, ...baseConfig.entry ]

  if (plugins)
    config.plugins = [ ...plugins, ...baseConfig.plugins ]

  console.log(config)

  return config
}
