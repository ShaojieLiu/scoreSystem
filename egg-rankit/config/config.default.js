'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1536561390578_1999';

  // add your config here
  config.middleware = [];

  // config.security = false;

  config.assets = {
    url: '/',
    publicPath: '/public',
    // devServer: {
    //   command: 'umi dev',
    //   port: 8000,
    //   // env: {
    //   //   APP_ROOT: path.join(__dirname, '../app/web'),
    //   //   BROWSER: 'none',
    //   //   // SOCKET_SERVER: 'http://127.0.0.1:8000',
    //   // },
    //   debug: true,
    // },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  return config;
};
