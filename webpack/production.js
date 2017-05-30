import merge from 'webpack-merge'

import { optimize } from 'webpack'
import  CleanWebpackPlugin from 'clean-webpack-plugin'

import parts from './parts'

/**
 * See the docstring for development.js in the same directory as this
 * module for an explanation why this isn't so great (at the moment)
 */
const productionConfig = ({ context, entry, output }) => merge([
  { output },
  {
    context,
    entry,
    output: {
      filename: '[name].js',
      publicPath: '/',
    },
    plugins: [
      new CleanWebpackPlugin('build'),
      new optimize.OccurrenceOrderPlugin,
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
  },

  parts.generateSourceMaps({ type: 'source-map' }),
])

export default productionConfig
