const path = require('path');

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
              path: path.resolve(__dirname, 'build'),
              filename: 'bundle.js'
    },

    resolve: {
		extensions: ['.jsx', '.js', '.json', '.less'],
		modules: [
			path.resolve(__dirname, "src/lib"),
			path.resolve(__dirname, "node_modules"),
			'node_modules'
		],
		alias: {
			components: path.resolve(__dirname, "src/components"),    // used for tests
			style: path.resolve(__dirname, "src/style"),
			'react': 'preact',
			'react-dom': 'preact-dom'
		}
    },
    
    module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: path.resolve(__dirname, 'src'),
				enforce: 'pre',
				use: 'source-map-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				use: 'file-loader'
			}
        ]
    }
};

module.exports = config;