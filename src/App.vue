<script>
import { mapGetters, mapMutations } from 'vuex';
import Vue from 'vue';
export default {
	onLaunch: function() {
		// 初始化音频
		let audioPlayer = null;
		let timer = null;
		// if (plat === 'H5') {
		// 	audioPlayer = uni.createInnerAudioContext();
		// } else {
		// 	audioPlayer = uni.getBackgroundAudioManager();
		// }
		audioPlayer = uni.createInnerAudioContext();
		Vue.prototype.$audio_player = audioPlayer;

		// 播放准备
		Vue.prototype.$audio_player.onCanplay(() => {
			Vue.prototype.cusOnCanplay && Vue.prototype.cusOnCanplay();
			console.log('音频进入可以播放状态，但不保证后面可以流畅播放');
		});

		// 开始播放
		Vue.prototype.$audio_player.onPlay(() => {
			console.log('playing');
			Vue.prototype.cusPlay && Vue.prototype.cusPlay();
			clearInterval(timer);
			timer = setInterval(() => {
				//安卓和ios app 下onTimeUpdate事件在替换资源和seek之后不会触发，这里做手动触发
				Vue.prototype.cusTimeUpdate();
			}, 400);
		});

		// 播放结束
		Vue.prototype.$audio_player.onEnded(() => {
			Vue.prototype.cusEnded && Vue.prototype.cusEnded();
			clearInterval(timer);
		});

		// 播放错误
		Vue.prototype.$audio_player.onError(err => {
			Vue.prototype.cusOnError && Vue.prototype.cusOnError();
			console.log('play err:' + err);
			clearInterval(timer);
		});

		// 暂停
		Vue.prototype.$audio_player.onPause(() => {
			console.log('play onPause:');
			Vue.prototype.cusOnPause && Vue.prototype.cusOnPause();
			clearInterval(timer);
		});

		// 通过查看内存存储的登录状态是否正确，正确就返回首页，没有就返回登录页面进行登录
		let loginState = uni.getStorageSync('loginState');
		if (loginState) {
			this.$Router.replace({
				name: 'Home'
			});
		} else {
			this.$Router.push({
				name: 'Login'
			});
		}

		console.log('App Launch');
	},

	computed: {
		...mapGetters('user', ['userInfo', 'loginState'])
	},

	methods: {
		...mapMutations('user', {
			setUserInfo: 'USER_INFO',
			setLoginState: 'LOGIN_STATE'
		}),
		...mapMutations('player', {
			setPlayingState: 'PLAYING_STATE'
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
