const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode,
  devtool: argv.mode === 'development' ? 'source-map' : false,
  entry: {
    app: './src/js/app.js',
    projets: './src/js/projets.js',
  },
  output: {
    filename: 'assets/[name].js',
    path: __dirname + '/dist',
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin(),
      new CopyPlugin({
        patterns: [{
            from: 'src/*.html',
            to: '[name].[ext]',
          },
          {
            from: 'src/projets/*.html',
            to: 'projets/[name].[ext]',
          },
          {
            from: 'src/images/*',
            to: 'images/[name].[ext]',
          }
        ],
      }),
    ],
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }, {
        test: /\.(scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
          options: {
            url: false,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                ['autoprefixer'],
              ],
            },
          },
        }, {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
          },
        }, ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader']
      },
      {
        test: /\.(mov|mp4)$/,
        type: 'asset/resource',
        generator: {
          filename: 'videos/[hash][ext][query]'
        }
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/app.css',
    }),
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, '/src'),
    ],
    watchContentBase: true,
    compress: true,
    port: 9000,
    open: true,
  },
});