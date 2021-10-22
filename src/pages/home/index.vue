<template>
	<view class="home-box">
		<!-- 头部固定 -->
		<my-search :searchShow="searchShow" :micShow="micShow"></my-search>
		<!-- 中间内容 -->
		<view class="home-content">
			<my-banner></my-banner>
			<view class="home-recommend-day"><recommend-day></recommend-day></view>
			<view class="home-recommend-playlist">
				<recommend-play-list :songlist="songlist"></recommend-play-list>
			</view>
			<view class="home-recommend-new-song"><recommend-new-song :newSong="newSong"></recommend-new-song></view>
			<!-- 排行榜 -->
			<view class="home-recommend-board">
				<view class="home-recommend-board-header">
					<text class="home-recommend-board-text">排行榜</text>
					<text class="home-recommend-board-more" @click="toLeaderBoard">
						更多
						<u-icon name="arrow-right"></u-icon>
					</text>
				</view>
				<view class="home-recommend-board-swiper">
					<swiper :indicator-dots="false" class="swiper">
						<swiper-item v-for="(item, index) in boardList" :key="index">
							<board-list :boardList="item"></board-list>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 底部播放器 -->
		<music-player></music-player>
	</view>
</template>

<script>
import { createSong } from '@/utils/song.js';
export default {
	name: 'Home',
	data() {
		return {
			// 展示搜索框
			searchShow: true,
			// 展示麦克风
			micShow: true,
			// 热门歌单
			songlist: [],
			// 音乐返回数量
			limit: 9,
			// 新歌
			newSong: [],
			// 榜单
			boardList: []
		};
	},
	component: {},

	mounted() {
		this.getPersonalized();
		this.getPersonalizedNewSong();
		this.getTopListDetail();
	},

	methods: {
		// 去更多页面
		toLeaderBoard() {
			this.$Router.push({
				name: 'LeaderBoard'
			});
		},

		// 获取榜单的列表
		getTopListDetail() {
			this.$api.getTopListDetail().then(res => {
				if (res.code === this.$code.code_status) {
					// 截取新歌榜，热歌榜以及原创榜
					let boardList = res.list;
					this.boardList = boardList.slice(1, 4);
				}
			});
		},

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
		getPersonalized() {
			this.$api
				.getPersonalized(this.limit)
				.then(res => {
					if (res.code === this.$code.code_status) {
						this.songlist = res.result;
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
	padding-bottom: 100rpx;
	.home-content {
		padding: 0 22rpx;
		width: 100%;
		flex-direction: column;
		margin-top: 100rpx;
		align-items: center;
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
		.home-recommend-board {
			display: flex;
			flex-direction: column;
			margin-top: 16rpx;
			background-color: #fdfdfd;
			padding: 20rpx;
			border-radius: 16rpx;
			.home-recommend-board-header {
				display: flex;
				flex: 1;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;
				.home-recommend-board-text {
				}
				.home-recommend-board-more {
					border-radius: 16rpx;
					border: 1px solid #c2c2c2;
					padding: 4rpx 8rpx;
					font-size: 26rpx;
					&:active {
						background-color: #dd4816;
						color: #ffffff;
					}
				}
			}
			.home-recommend-board-swiper {
				padding: 10rpx;
				border-radius: 16rpx;
				box-shadow: 0rpx 0rpx 0rpx 2rpx rgba(182, 182, 182, 1);
				height: 100%;
				background-color: #ffffff;
				.swiper {
					display: flex;
					height: 380rpx;
					.swiper-item {
						height: 100%;
					}
				}
			}
		}
	}
}
</style>
