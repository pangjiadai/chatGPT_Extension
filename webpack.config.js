const path = require('path');

module.exports = {
  entry: './background.js',
  output: {
    filename: 'background.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
      fallback: {
          "buffer": require.resolve("buffer/"),
      },
      alias: {
        'node:buffer': 'buffer',
        'node:process': 'process/browser'   
      }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
