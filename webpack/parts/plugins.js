import { NamedModulesPlugin, NoEmitOnErrorsPlugin, HashedModuleIdsPlugin } from 'webpack'

import { optimize } from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import  CleanWebpackPlugin from 'clean-webpack-plugin'

export const cleanPlugin = ({ path, root }) => ({
  plugins: [
    new CleanWebpackPlugin(path, { root }),
  ],
})

export const noErrorsPlugin = () => ({
  plugins: [
    new NoEmitOnErrorsPlugin,
  ],
})

export const namedModulesPlugin = () => ({
  plugins: [
    new NamedModulesPlugin,
  ],
})

export const htmlPlugin = ({
  path = '',
  template = require.resolve(
    'html-webpack-plugin/default_index.ejs'
  ),
  title,
  chunks,
} = {}) => ({
  plugins: [
    new HtmlWebpackPlugin({
      chunks,
      filename: `${path && path + '/'}index.html`,
      template,
      title,
    }),
  ],
})

export const occurrenceOrderPlugin = () => ({
  plugins: [
    new optimize.OccurrenceOrderPlugin,
  ],
})

export const uglifyPlugin = () => ({
  plugins: [
    new optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
  ],
})

export const hashedModuleIdsPlugin = () => ({
  plugins: [
    new HashedModuleIdsPlugin,
  ],
})
