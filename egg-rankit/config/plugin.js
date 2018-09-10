'use strict';

// had enabled by egg
// exports.static = true;
exports.security = false;
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
