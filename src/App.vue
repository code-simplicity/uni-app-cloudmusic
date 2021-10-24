<script>
import { mapGetters, mapMutations } from 'vuex';
import Vue from 'vue';
import upApp from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
import checkVersion from '@/uni_modules/uni-upgrade-center-app/uniCloud/cloudfunctions/check-version/index.js';
import { plat } from './utils/plat.js';
export default {
	onLaunch: function() {
		// 初始化音频
		let audioPlayer = null;
		let timer = null;
		if (plat === 'H5') {
			audioPlayer = uni.createInnerAudioContext();
		} else {
			audioPlayer = uni.getBackgroundAudioManager();
		}
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
				console.log('update');
				Vue.prototype.cusTimeUpdate();
			}, 200);
		});

		// 播放进度更新
		Vue.prototype.$audio_player.onTimeUpdate(() => {
			Vue.prototype.cusTimeUpdate && Vue.prototype.cusTimeUpdate();
			clearInterval(timer);
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

		// #ifdef APP-PLUS
		// 获取当前的app版本
		// let req = {
		// 	appid: plus.runtime.appid,
		// 	version: plus.runtime.version,
		// 	wgtVersion: plus.runtime.getProperty(plus.runtime.appid, wgtInfo => {
		// 		wgtInfo.version;
		// 	})
		// };
		// console.log('req', req);

		// // 请求云函数。拿到版本检测结果
		// callCheckVersion(req).then(res => {
		// 	if (res.code === 0) {
		// 		console.log('当前版本已经是最新的，不需要更新');
		// 	} else if (res.code === 102) {
		// 		console.log('更新');
		// 		// 执行更新函数
		// 		upApp();
		// 	} else if (res.code === -101) {
		// 		console.log('暂无更新或检查appid是否填写正确');
		// 	}
		// });
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
@import 'animate.css';
</style>
