import { loadJavascript, lintJavascript, minifyJavascript, uglifyJavascript, extractBundles, generateSourceMaps } from './javascript'
import { loadStyles, lintStyles, extractStyles } from './style'

import { devServer, hotloader } from './devserver'

import { cleanPlugin, noErrorsPlugin, namedModulesPlugin, hashedModuleIdsPlugin } from './plugins'
import { page } from './page'
import { stats } from './stats'

export default {
  loadJavascript, lintJavascript, minifyJavascript, uglifyJavascript, extractBundles, generateSourceMaps,
  loadStyles, lintStyles, extractStyles,
  devServer, hotloader,
  cleanPlugin, noErrorsPlugin, namedModulesPlugin, hashedModuleIdsPlugin,
  page,
  stats,
}
