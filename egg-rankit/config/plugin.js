'use strict';

// had enabled by egg
// exports.static = true;
exports.security = false;

exports.assets = {
  enable: true,
  package: 'egg-view-assets',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
