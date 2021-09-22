import Vue from 'vue'
import App from './App'

// 关闭生产提示
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
