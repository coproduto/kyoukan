var lodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var env = {};
var args = process.argv.slice(2);
args.forEach(function(x, index){
    if(x === "-t" || x === "--target") {
	env.target = args[index+1];
    }
});

var target = "web";
if(env.target) {
    target = env.target;
}

var nodeModules = {};
if(target === "node") {
    fs.readdirSync('node_modules')
	.filter(function(x) {
	    return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function(m) {
	    nodeModules[m] = 'commonjs ' + m;
	});
}

var filename = "bundle.js";
filename = target + "-" + filename;

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
    target: target,
    entry: (target === "node" ? ['./src/client/common/app.js'] : ['./src/client/web/client.js']),
    output: {
	filename: filename,
	path: (target === "node" ? path.join(__dirname, './dist') : path.join(__dirname, './dist/web/js'))
    }
};

if(target === "node") {
    config.externals = nodeModules;
}

module.exports = config;
