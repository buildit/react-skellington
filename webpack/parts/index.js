import { devServer } from './devserver'
import { lintJavascript, lintCss } from './linting'
import { loadJavascript, generateSourceMaps } from './javascript'
import { loadStyles } from './styles'
import { page } from './page'

export default {
  devServer,
  generateSourceMaps,
  loadJavascript,
  loadStyles,
  lintJavascript,
  lintCss,
  page,
}
