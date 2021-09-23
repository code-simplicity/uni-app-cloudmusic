import Vue from 'vue'
// 引入uView
import uView from "uview-ui";
Vue.use(uView);
import App from './App'




// 关闭生产提示
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
