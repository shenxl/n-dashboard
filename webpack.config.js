const fs = require('fs');
const path = require('path');

module.exports = (webpackConfig, env) => {
  const myWebpackConfig = webpackConfig;
  myWebpackConfig.babel.plugins.push('transform-runtime');
  myWebpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: 'css',
  }]);
  // Support hmr
  if (env === 'development') {
    myWebpackConfig.devtool = '#eval';
    myWebpackConfig.babel.plugins.push(['dva-hmr', {
      entries: [
        './src/index.js',
      ],
    }]);
  } else {
    myWebpackConfig.babel.plugins.push('dev-expression');
  }

  // Support CSS Modules
  // Parse all less files as css module.
  myWebpackConfig.module.loaders.forEach((sourceLoader, index) => {
    const loader = sourceLoader;
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.less$/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.css$/;
    }
  });

  return myWebpackConfig;
};
