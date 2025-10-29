const path = require('path');

module.exports = {
  entry: './src/Area.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'area-lib.js',
    library: 'AreaLib',
    libraryTarget: 'commonjs2' 
  },
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};