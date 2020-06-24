var dreamdata = require('@dreamdata/analytics-core');
var Integrations = require('./integrations');

/**
 * Expose the `analytics` singleton.
 */

module.exports = exports = dreamdata;

/**
 * Expose require.
 */

dreamdata.require = require;

/**
 * Expose `VERSION`.
 */

exports.VERSION = require('../package.json').version;

/**
 * Add integrations.
 */
for (Integration in Integrations) {
    dreamdata.use(Integrations[Integration]);
}
