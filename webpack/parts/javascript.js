import { optimize } from 'webpack'

import BabiliPlugin from 'babili-webpack-plugin'

export const loadJavascript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: [
          'react-hot-loader/webpack',
          'babel-loader',
        ],
      },
    ],
  },
})

export const lintJavascript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',

        use: ['eslint-loader'],
        options,
      },
    ],
  },
})

export const uglifyJavascript = () => ({
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

export const minifyJavascript = () => ({ plugins: [ new BabiliPlugin ] })

export const generateSourceMaps = type => ({
  devtool: type,
})


export const extractBundles = bundles => ({
  plugins: bundles.map(bundle => new optimize.CommonsChunkPlugin(bundle)),
})
