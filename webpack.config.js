const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isProductionEnvironment = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProductionEnvironment ? 'production' : 'development',
  entry: './src/index.jsx',
  output: {
    filename: 'calculator.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    modules: [__dirname, 'src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ['file-loader'],
      },
    ],
  },
  devtool: isProductionEnvironment ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};
