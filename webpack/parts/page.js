import merge from 'webpack-merge'

import { htmlPlugin } from './plugins'

export const page = ({
  path = '',
  template = require.resolve(
    'html-webpack-plugin/default_index.ejs'
  ),
  title,
  entry,
  chunks,
} = {}) => merge([
  { entry },
  htmlPlugin({ path, template, title, chunks }),
])
