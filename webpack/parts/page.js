import HtmlWebpackPlugin from 'html-webpack-plugin'

export const page = ({
  path = '',
  template = require.resolve(
    'html-webpack-plugin/default_index.ejs'
  ),
  title,
  entry,
  chunks,
} = {}) => ({
  entry,
  plugins: [
    new HtmlWebpackPlugin({
      chunks,
      filename: `${path && path + '/'}index.html`,
      template,
      title,
    }),
  ],
})
