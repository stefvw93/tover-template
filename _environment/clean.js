const { paths } = require('../project-config');
const rimraf = require('rimraf');

rimraf.sync(paths.compiled);
rimraf.sync(paths.distribution);
rimraf.sync('node_modules');
