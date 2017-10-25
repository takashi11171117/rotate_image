const webpack       = require('webpack');
const autoprefixer  = require('autoprefixer')
const riot          = require('riot');
const sass          = require('node-sass');

riot.parsers.css.sass = (tagName, css) => {
    const res = sass.renderSync({data: css});
    return res.css.toString();
}

module.exports = [
  {
    entry: {
      rotate_image   : './riot/rotate_image.js',
      fontawesome   : './riot/fontawesome.js',
    },
    output: {
       path: __dirname + '/build/',
       filename: '[name].js'
    },
    module: {
       rules: [
          {
             test: /\.tag$/,
             enforce: 'pre',
             exclude: /node_modules/,
             use: [
                {
                   loader: 'riot-tag-loader',
                   options: {
                      debug: true
                   }
                }
             ]
          },
          {
             test: /\.js|\.tag$/,
             enforce: 'post',
             exclude: /node_modules/,
             use: [
                {
                   loader: 'babel-loader',
                   options: {
                      presets: `es2015-riot`
                   }
                }
             ]
          }
       ]
    },
    resolve: {
       extensions: ['.js', '.tag']
    },
    plugins: [
       new webpack.ProvidePlugin({ riot: 'riot' }),
       new webpack.optimize.CommonsChunkPlugin({
         name: 'commons',
         filename: 'js/commons.js',
       })
    ]
  }
]

module.exports.watchOptions = {
  aggregateTimeout: 300,
  poll: 1500
}
