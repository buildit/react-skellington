import { optimize } from 'webpack'

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

export const generateSourceMaps = ({ type }) => ({
  devtool: type,
})


export const extractBundles = bundles => ({
  plugins: bundles.map(bundle => new optimize.CommonsChunkPlugin(bundle)),
})
