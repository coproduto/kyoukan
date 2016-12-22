var lodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

const walkSync = function(dir, filelist) {
    var flist = filelist || [];
    
    fs.readdirSync(dir).forEach(function(file) {
	if(fs.statSync(path.join(dir, file)).isDirectory()) {
	    flist = walkSync(path.join(dir, file), flist);
	} else {
	    flist.push(path.join(dir, file));
	}
    });

    return flist;
};

var testModules = walkSync('./test/').filter(function(file) {
    return file.match(/\.js$/);
}).map(function(file) {
    return './' + file;
});

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
    entry: testModules,
    output: {
	filename: 'test-bundle.js',
	path: path.join(__dirname, './dist')
    }
};

module.exports = config;
