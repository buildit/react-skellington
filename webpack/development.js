import merge from 'webpack-merge'

import { NamedModulesPlugin, NoEmitOnErrorsPlugin } from 'webpack'

import parts from './parts'

/**
 * Creates a webpack configuration for development.
 *
 * Note that the way this works clearly demonstrates it's likely
 * better to simply build this config within webpack.config.babel.js
 * (including importing webpack-merge, parts and the webpack plugins)
 * purely because there's too many moving parts to pre-assemble
 * - especially in the case of using webpack-dev-server + hot-module-reload
 * due to the fact that the `entry` parameter becomes a chain of
 * things to pass through before finally hitting the source.
 *
 * Still, at this point at least we have _sort of_ composable
 * configuration...
 */
const developmentConfig = ({ context, entry, output }) => merge.strategy({ entry: 'prepend' })([
  {
    context,
    entry,
    output,
    plugins: [
      new NoEmitOnErrorsPlugin,
      new NamedModulesPlugin,
    ],
  },

  // parts.lintCss({ exclude: /node_modules/ }),
  parts.loadStyles({ exclude: /node_modules/ }),

  parts.lintJavascript({ exclude: /node_modules/ }),
  parts.loadJavascript({ exclude: /node_modules/ }),

  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),

  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),

  parts.page({
    title: 'React Skellington!',
    template: './index.html',
  }),
])

export default developmentConfig
