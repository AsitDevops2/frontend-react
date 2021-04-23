var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                 ],
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
        port: 5000
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://192.168.2.78:8083',
            apiUrl1: 'http://192.168.2.78:8085',
            invUrl: 'http://192.1682.78:3000'
        })
    }
}