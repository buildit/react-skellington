
import { optimize } from 'webpack'

const devtool = 'source-map'

const plugins = [
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
]

export default {
  devtool,
  plugins,
}
