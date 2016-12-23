const webpack = require("webpack");
const _base = require("./webpack.base.js");

const base = Object.assign(_base, {
	plugins: _base.plugins.concat([
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": `"production"`
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				dead_code: true,
				unused: true
			}
		})
	])
});

const main = Object.assign({}, base, {
	target: "electron-main",
	entry: {
		"main/index": "./src/scripts/main/index.ts"
	}
});

const renderer = Object.assign({}, base, {
	target: "electron-renderer",
	entry: {
		"renderer/index": "./src/scripts/renderer/index.tsx"
	}
});

module.exports = [main, renderer];
