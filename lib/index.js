var dreamdata = require('@dreamdata/analytics-core');
var integrations = require('./integrations');
var plugins = require('./plugins');

/**
 * Expose the `analytics` singleton.
 */
module.exports = exports = dreamdata;

/**
 * Expose `VERSION`.
 */
exports.VERSION = require('../package.json').version;

/**
 * Expose require.
 */
dreamdata.require = require;

/**
 * Import Plugins.
 */
dreamdata.plugins = plugins;

/**
 * Add integrations.
 */
for (integration in integrations) {
  dreamdata.use(integrations[integration]);
}
