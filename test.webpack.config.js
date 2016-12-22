var lodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');


var config = {
    module: {
	loaders: [
	    { loader: 'babel', test: /\.js$/, exclude: /node_modules/ }
	]
    },
    plugins: [
	new lodashModuleReplacementPlugin({
	    'currying': true,
	}),
	new webpack.optimize.OccurrenceOrderPlugin,
	new webpack.optimize.UglifyJsPlugin({
	    compress: {
		warnings: false
	    }
	})
    ],
    target: "web",
    entry: ['./test/test.js'],
    output: {
	filename: 'test-bundle.js',
	path: path.join(__dirname, './dist')
    }
};

module.exports = config;
