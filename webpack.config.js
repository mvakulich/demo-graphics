const path = require('path');
require("babel-register");

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'main.js',
    },
    module: {
        rules : [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          }
        ]
      },
}

module.exports = config;
