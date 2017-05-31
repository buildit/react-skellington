import { loadJavascript, lintJavascript, generateSourceMaps, extractBundles } from './javascript'
import { loadCSS, loadSass, lintCSS, extractCSS, autoprefix } from './css'

import { devServer, devServerEntry, hotModulePlugin } from './devserver'
import { cleanPlugin, noErrorsPlugin, namedModulesPlugin, htmlPlugin, occurrenceOrderPlugin, uglifyPlugin, hashedModuleIdsPlugin } from './plugins'

import { page } from './page'
import { stats } from './stats'

export default {
  devServer,
  devServerEntry,
  hotModulePlugin,
  cleanPlugin,
  noErrorsPlugin,
  namedModulesPlugin,
  htmlPlugin,
  occurrenceOrderPlugin,
  uglifyPlugin,
  hashedModuleIdsPlugin,
  generateSourceMaps,
  loadJavascript,
  extractBundles,
  loadCSS,
  loadSass,
  extractCSS,
  autoprefix,
  lintJavascript,
  lintCSS,
  page,
  stats,
}
