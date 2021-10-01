<script>
import { mapMutations } from 'vuex';
export default {
	onLaunch: function() {
		// 每次进入app的时候都检查是否登录
		// let userInfo = uni.getStorageSync('userInfo') || '';
		// if (userInfo.id) {
		// 	// 更新登录状态
		// 	uni.getStorage({
		// 		key: 'userInfo',
		// 		success: res => {
		// 			this.userInfo(res.data);
		// 			this.loginState(true);
		// 		}
		// 	});
		// }
		console.log('App Launch');
		// let player = this.player;
		// let url = 'https://music.163.com/song/media/outer/url?id=1882669038.mp3';
		// player.setUrl(url);
		// player.play();
		// console.log('player', url);
		// 创建实例
		this.createAudio()
	},
	methods: {
		// 创建全局唯一的播放器实例
		createAudio() {
			const player = this.player;
			player.autoplay = true;
		},

		...mapMutations('user', {
			userInfo: 'USER_INFO',
			loginState: 'LOGIN_STATE'
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
