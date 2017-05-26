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

export const generateSourceMaps = ({ type }) => ({
  devtool: type,
})
