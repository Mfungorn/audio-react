const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: __dirname + '/public',
        filename: 'build/app.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {test: /\.css$/i, use: ['style-loader', 'css-loader']},
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
};