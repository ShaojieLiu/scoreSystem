'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/config/get', controller.config.get);
  router.get('/config/set', controller.config.set);
  router.get('/', controller.home.index);
};
