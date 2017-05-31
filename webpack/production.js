import merge from 'webpack-merge'

import { optimize } from 'webpack'
import  CleanWebpackPlugin from 'clean-webpack-plugin'

import parts from './parts'

/**
 * See the docstring for development.js in the same directory as this
 * module for an explanation why this isn't so great (at the moment)
 */
const productionConfig = ({ context, entry, output }) => merge([
  {
    context,
    entry,
    output,
    plugins: [
      new CleanWebpackPlugin(
        'build',
        {
          root: context + '/..',
        }
      ),
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

  parts.loadStyles({ exclude: /node_modules/ }),

  parts.lintJavascript({ exclude: /node_modules/ }),
  parts.loadJavascript({ exclude: /node_modules/ }),

  parts.generateSourceMaps({ type: 'source-map' }),
])

export default productionConfig
