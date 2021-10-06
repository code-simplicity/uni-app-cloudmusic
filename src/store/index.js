import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import user from './modules/user.js'
import player from './modules/player.js'
import search from './modules/search.js'
// 使用vuex
Vue.use(Vuex)

// 判断环境
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		player,
		search,
		// singer,
		user,
	},
	strict: debug,
	plugins: debug ? [createLogger()] : []
})
