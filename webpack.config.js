const path = require('path');

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "AjaxCollection.js",
    path: path.resolve(__dirname, 'legacy')
  },

  resolve: {
    modules: [ './dist/' ],
    extensions: [ ".ts", ".js"]
  },

  externals: {
    jquery: 'jQuery',
    'js-cookie': 'Cookies'
  },

  module: {
    rules: [
      //Typescript pre-compiler
      {
        exclude: [/node_modules/, /dist/, /tests/],
        test: /\.ts$|\.tsx$/,
        loader: "awesome-typescript-loader"
      },

      {
        test: /\.js?$/,
        exclude: [/node_modules/, /dist/, /tests/],
        use: {
          loader: 'babel-loader?cacheDirectory&this=>window',
          options: {
            compact: false,
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: 'usage' }
              ]
            ],
            plugins: [
              ["@babel/plugin-transform-modules-commonjs", {allowTopLevelThis:true}],
              ["transform-async-to-generator"]
            ]
          }
        }
      },



      //TS Sourcemap loader
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ]
  }
}
