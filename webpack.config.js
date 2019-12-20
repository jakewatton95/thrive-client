const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
            { loader: 'style-loader', options: { injectType: 'singletonStyleTag' } },
            { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()//,
    //new HtmlWebpackPlugin({
    //favicon: "./src/noun_Learning_2509976.png"
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true
  }
};

