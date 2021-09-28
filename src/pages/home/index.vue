<template>
	<view class="home-box">
		<!-- 头部固定 -->
		<view class="home-header"><my-search :showUserInfo="showUserInfo"></my-search></view>
		<!-- 中间内容 -->
		<view class="home-content">
			<my-banner></my-banner>
			<view class="home-recommend-day"><recommend-day></recommend-day></view>
			<view class="home-recommend-playlist">
				<recommend-play-list :songlist="songlist"></recommend-play-list>
			</view>
			<view class="home-recommend-new-song"><recommend-new-song :newSong="newSong"></recommend-new-song></view>
		</view>
		<music-player></music-player>
		<!-- 左侧弹出菜单 -->
		<view class="home-left">
			<view class="home-user">
				<u-popup v-model="showUserInfo"><view>出淤泥而不染，濯清涟而不妖</view></u-popup>
			</view>
		</view>
	</view>
</template>

<script>
import { createSong } from '@/utils/song.js';
export default {
	name: 'Home',
	data() {
		return {
			showUserInfo: false,
			// 热门歌单
			songlist: [],
			// 音乐返回数量
			limit: 9,
			// 新歌
			newSong: []
		};
	},
	component: {
		
	},

	mounted() {
		this.getRecommendResource();
		this.getPersonalizedNewSong();
	},

	methods: {
		// 获取新歌
		getPersonalizedNewSong() {
			this.$api
				.getPersonalizedNewSong(this.limit)
				.then(res => {
					let list = [];
					if (res.code === this.$code.code_status) {
						// 组装歌曲id
						res.result.map(item => {
							list.push(item.id);
						});
					}
					this.getSongDetail(list);
				})
				.catch(err => {
					console.log(err);
				});
		},

		// 获取歌曲列表详情
		getSongDetail(ids) {
			// 获取时间戳
			let time = new Date().valueOf();
			// id数组变为以逗号隔开的字符串
			ids = ids.join(',');
			let params = {
				ids: ids,
				timestamp: time
			};
			this.$api
				.getSongDetail(params)
				.then(res => {
					// 处理歌曲
					this.newSong = this.formatSongs(res.songs);
				})
				.catch(err => {
					console.log(err);
				});
		},

		// 获取推荐歌单
		getRecommendResource() {
			this.$api
				.getRecommendResource()
				.then(res => {
					if (res.code === this.$code.code_status) {
						this.songlist = res.recommend;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},

		// 处理歌曲
		formatSongs(list) {
			let arr = [];
			list.map(item => {
				if (item.id) {
					arr.push(createSong(item));
				}
			});
			return arr;
		}
	}
};
</script>

<style lang="scss" scoped>
.home-box {
	width: 100%;
	display: flex;
	.home-header {
		width: 100%;
		position: fixed;
		padding: 0 10rpx;
		height: 100rpx;
		line-height: 100rpx;
		top: 0;
		left: 0;
		right: 0;
		z-index: 666;
		background-color: #eaeaea;
	}
	.home-content {
		padding: 0 10rpx;
		width: 100%;
		flex-direction: column;
		margin-top: 100rpx;
		align-items: center;
		flex-wrap: wrap;
		.home-recommend-day {
			margin-top: 220rpx;
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 16rpx;
		}
		.home-recommend-playlist {
			display: flex;
			flex-direction: column;
		}
		.home-recommend-new-song {
			display: flex;
			flex-direction: column;
		}
	}
}
</style>
