<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
	onLaunch: function() {
		// #ifdef APP-PLUS
		// token标志来判断
		let token = uni.getStorageSync('token');
		if (token) {
			plus.navigator.closeSplashscreen();
		} else {
			//不存在则跳转至登录页
			uni.reLaunch({
				url: '/pages/login/login',
				success: () => {
					plus.navigator.closeSplashscreen();
				}
			});
		}
		// #endif
		console.log('App Launch');
	},

	computed: {
		...mapGetters('user', ['userInfo', 'loginState'])
	},

	methods: {
		...mapMutations('user', {
			setUserInfo: 'USER_INFO',
			setLoginState: 'LOGIN_STATE'
		})
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import '/static/css/iconfont.css';
/*每个页面公共css */
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
@import './static/css/style.css';
</style>
