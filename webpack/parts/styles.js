/**
 * Returns a style-loading webpack configuration stanza.
 *
 * TODO: Split css-only and sass-to-css functions, since
 * that would allow us to make config _specifically_ for
 * literal css when we have it, and sass-to-css when we have that
 * too.
 */
export const loadStyles = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.s?a?c?ss$/,
        include,
        exclude,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
              camelCase: 'only',
              localIdentName: '[name]-[local]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
})
