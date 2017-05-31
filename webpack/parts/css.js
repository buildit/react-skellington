import ExtractTextPlugin from 'extract-text-webpack-plugin'

/**
 * Returns a style-loading webpack configuration stanza.
 *
 * TODO: Split css-only and sass-to-css functions, since
 * that would allow us to make config _specifically_ for
 * literal css when we have it, and sass-to-css when we have that
 * too.
 */
export const loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: [
          'style-loader',
          // {
          //   loader: 'style-loader',
          //   options: {
          //     singleton: true,
          //     sourceMap: true,
          //   },
          // },
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     importLoaders: 1,
              // modules: true,
              // camelCase: 'only',
              // localIdentName: '[name]-[local]',
          //     sourceMap: true,
          //   },
          // },
        ],
      },
    ],
  },
})

export const loadSass = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        include,
        exclude,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false,
              camelCase: 'only',
              localIdentName: '[name]-[local]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
})

export const extractCSS = ({ include, exclude, use }) => {
  const plugin = new ExtractTextPlugin({
    filename: '[name].[contenthash:8].css',
  })

  return {
    module: {
      rules: [
        {
          test: /\.(sass|css)$/,
          include,
          exclude,
          use: plugin.extract({
            use,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [ plugin ],
  }
}

export const autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer')(),
    ]),
  },
})

export const lintCSS = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'postcss-loader',
        options: {
          plugins: () => ([
            require('stylelint')(),
          ]),
        },
      },
    ],
  },
})
