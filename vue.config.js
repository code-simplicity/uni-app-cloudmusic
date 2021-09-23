const path = require('path')
//最新版本copy-webpack-plugin插件暂不兼容，推荐v5.0.0
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([{
				from: path.join(__dirname, 'src/images'),
				to: path.join(__dirname, 'dist', process.env.NODE_ENV === 'production' ? 'build' :
					'dev',
					process.env.UNI_PLATFORM, 'images')
			}])
		]
	},
	// 配置网络请求
	transpileDependencies: ['luch-request']
}
