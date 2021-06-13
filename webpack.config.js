const path = require('path');

module.exports = {
  "mode": "none",
  "entry": "./src/scripts.js",
  "output": {
    "path": __dirname + '/dist',
    "filename": "bundle.js",
    sourceMapFilename: "bundle.js.map"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  "devtool": "source-map",
  "module": {
    "rules": [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      }
    ]
  },
  "resolve" : {
    "fallback" : {
      // "fetch": require.resolve("node-fetch")
      // "http": require.resolve("stream-http"),
      // "https": require.resolve("https-browserify"),
      // "zlib": require.resolve("browserify-zlib"),
      // "stream": require.resolve("stream-browserify"),
      // "assert": require.resolve("assert/"),
      // "path": require.resolve("path-browserify"),
      // "os": require.resolve("os-browserify/browser"),
      // "dgram": require.resolve("dgram-browserify")


      // "path": false,
      // "os": false,
      // "stream": false,
      // "zlib": false,
      // "http": false,
      // "https": false,
      // "dgram": false,
      // "fs": false
    }
  }
};
