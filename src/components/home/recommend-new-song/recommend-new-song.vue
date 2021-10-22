<template>
	<view class="recommend-play-list">
		<view class="recommend-play-header">
			<text class="recommend-play-title">新歌</text>
			<text class="recommend-play-title-more">
				更多
				<u-icon name="arrow-right"></u-icon>
			</text>
		</view>
		<view class="recommend-play-content">
			<swiper class="swiper" :indicator-dots="false" :autoplay="false">
				<swiper-item class="recommend-play-wrap ">
					<recommend-new-song-list :newSong="newSongFirst"></recommend-new-song-list>
				</swiper-item>
				<swiper-item class="recommend-play-wrap ">
					<recommend-new-song-list :newSong="newSongSecond"></recommend-new-song-list>
				</swiper-item>
				<swiper-item class="recommend-play-wrap ">
					<recommend-new-song-list :newSong="newSongThird"></recommend-new-song-list>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
/**K
 * author	bugdr
 * time     2021-9-25 6:38:12 ?F10: PM?
 * description
 */
import { mapGetters, mapActions } from 'vuex';
export default {
	name: 'recommend-new-song',
	data() {
		return {};
	},

	props: {
		newSong: {
			type: Array
		}
	},
	computed: {
		...mapGetters('player', ['currentIndex', 'currentSong', 'playing']),
		newSongFirst() {
			return this.newSong.slice(0, 3);
		},
		newSongSecond() {
			return this.newSong.slice(3, 6);
		},
		newSongThird() {
			return this.newSong.slice(6, 9);
		}
	},
	component: {},
	mounted() {},
	methods: {
		// 暂停
		pauseMusci() {
			this.pausePlay();
		},

		// 播放音乐
		playMusci(item, index) {
			this.selectPlay({
				list: this.newSong,
				index
			});
		},

		// 响应状态
		...mapActions('player', ['selectPlay', 'pausePlay', 'playAll'])
	}
};
</script>

<style lang="scss" scoped>
.recommend-play-list {
	padding: 6rpx;
	border-radius: 16rpx;
	background-color: $uni-bg-color;
	width: 100%;
	margin-top: 16rpx;
	.recommend-play-header {
		display: flex;
		height: 60rpx;
		align-items: center;
		justify-content: space-between;
		.recommend-play-title {
			padding: 0 10rpx;
		}
		.recommend-play-title-more {
			border-radius: 16rpx;
			border: 1px solid #c2c2c2;
			padding: 4rpx 8rpx;
			font-size: 26rpx;
			&:active {
				background-color: #dd4816;
				color: #FFFFFF;
			}
		}
	}
	.recommend-play-content {
		margin-top: 10rpx;
		.swiper {
			height: 320rpx;
			padding: 0 10rpx;
			.recommend-play-wrap {
				margin-bottom: 10rpx;
			}
		}
	}
}
</style>
