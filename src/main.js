import Vue from 'vue'
// 引入uView
import uView from "uview-ui"
Vue.use(uView)
import App from './App'
// 路由插件
import {
	router,
	RouterMount
} from './router/router.js'
Vue.use(router);

// 引入暴露的api接口
import api from './api/index.js'

// 一些常量接入
import constant from './utils/constant.js'

// 使用vuex
import store from './store/index.js'

// 引入工具
import utils from './utils/utils.js'

// 关闭生产提示
Vue.config.productionTip = false

import "animate.css"

// 引入接口，全局使用某个接口
Vue.prototype.$api = api
// 状态码
Vue.prototype.$code = constant
// 工具挂载
Vue.prototype.utils = utils
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
