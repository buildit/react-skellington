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

export const lintCss = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        enforce: 'pre',

        use: ['postcss-loader'],
        options: {
          plugins: () => ([
            require('stylelint')(),
          ]),
        },
      },
    ],
  },
})
