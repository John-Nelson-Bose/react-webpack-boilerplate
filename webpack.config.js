var webpack = require("webpack");
var path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var ROOT_PATH = path.resolve(__dirname);
var ENTRY_PATH = path.resolve(ROOT_PATH, "src/js/index");
var TEMPLATE_PATH = path.resolve(ROOT_PATH, "src/index.html");
var BUILD_PATH = path.resolve(ROOT_PATH, "build");

const IS_PROD = process.env.NODE_ENV === 'production';

const PORT = 3000;

var config = {
  entry: ENTRY_PATH,
  output: {
    path: BUILD_PATH,
    filename: IS_PROD ? 'js/bundle.min.js' : 'js/bundle.js',
    publicPath: IS_PROD ? './' : '/'
  },
  mode: IS_PROD ? 'production' : 'development',
  devtool: IS_PROD ? false : 'source-map',
  devServer: {
    compress: true,
    hot: true,
    inline: true,
    open: true,
    port: PORT,
    overlay: true,
    historyApiFallback: true
  },
  optimization: {
      minimize: true
  },
  performance: {
      hints: false
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx"
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: TEMPLATE_PATH,
      filename: './index.html',
      favicon: './src/resources/images/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            ]
        },
        {
            test: /\.html$/,
            use: [
                {
                    loader: 'html-loader'
                }
            ]
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },
        {
            test: /\.(jpe?g|png|gif|svg|ico)$/i,
            use: [
                {
                    loader: 'file-loader?name=images/[name].[ext]'
                }
            ]
        },
        {
            test: /\.(ttf|otf)$/i,
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              publicPath: '../'
            }
        }
    ]
}
};

module.exports = config;
