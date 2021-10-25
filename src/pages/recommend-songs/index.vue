<template>
	<view class="recommend-songs">
		<play-list-navbar :titleHeader="titleHeader"></play-list-navbar>
		<view class="recommend-songs-box">
			<view class="image-cover">
				<u-image
					width="100%"
					height="300rpx"
					src="https://p2.music.126.net/0-Ybpa8FrDfRgKYCTJD8Xg==/109951164796696795.jpg"
				></u-image>
			</view>
			<play-list-music :songs="songs"></play-list-music>
		</view>
		<!-- 播放器 -->
		<music-player></music-player>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-9 9:11:03 ?F10: PM?
 * description 每日推荐歌曲
 */
import { createSong } from '@/utils/song.js';
export default {
	name: 'recommend-songs',
	data() {
		return {
			// 歌曲
			songs: [],
			// 顶部title
			titleHeader: '每日推荐'
		};
	},
	component: {},
	mounted() {
		this.getRecommendSongs();
	},
	methods: {
		// 获取每日推荐
		getRecommendSongs() {
			this.$api.getRecommendSongs().then(res => {
				this.songs = this._normaLizeSongs(res.data.dailySongs);
			});
		},

		// 处理歌曲
		_normaLizeSongs(res) {
			let resArr = [];
			res.map(item => {
				resArr.push(createSong(item));
			});
			return resArr;
		}
	}
};
</script>

<style lang="scss" scoped>
.recommend-songs {
	width: 100%;
}
</style>
