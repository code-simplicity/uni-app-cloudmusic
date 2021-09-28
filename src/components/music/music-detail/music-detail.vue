<template>
	<view class="musci-player-detail" v-show="showMusicDetail">
		<view class="musci-player-box">
			<view class="musci-header">
				<view class="left">
					<u-icon
						name="iconfont icon-zhankai"
						size="48"
						custom-prefix="iconfont"
						@click="colseDetail"
					></u-icon>
				</view>
				<view class="center"><text>英雄</text></view>
				<view class="right">
					<u-icon size="48" name="iconfont icon-fenxiang" custom-prefix="iconfont"></u-icon>
				</view>
			</view>
			<view class="musci-content">
				<view class="musci-content-cover">
					<image
						class="image-cover"
						src="http://p1.music.126.net/8cmpJcRau17H5rQvduYvxQ==/109951165200543230.jpg?param=40y40"
						mode="aspectFit"
					></image>
				</view>
				<view class="musci-content-lyric"><!-- 歌词 --></view>
			</view>
			<view class="musci-tools">
				<view class="musci-like">
					<u-icon size="52" name="iconfont icon-shoucang" custom-prefix="iconfont"></u-icon>
				</view>
				<view class="musci-like">
					<u-icon size="54" name="iconfont icon-xiazai" custom-prefix="iconfont"></u-icon>
				</view>
				<view class="musci-like">
					<u-icon size="54" name="iconfont icon-pinglun" custom-prefix="iconfont"></u-icon>
				</view>
				<view class="musci-like">
					<u-icon size="54" name="iconfont icon-sandian" custom-prefix="iconfont"></u-icon>
				</view>
			</view>
			<view class="musci-tools-progress">
				<view class="musci-tools-time"><text>00/00</text></view>
				<view class="musci-tools-progress">
					<u-line-progress class="tools-progress" height="16" active-color="#2979ff" :percent="70"></u-line-progress>
				</view>
				<view class="musci-tools-time"><text>00/00</text></view>
			</view>
			<view class="music-play-btn">
				<view class="music-play-btn-list">
					<u-icon size="54" name="iconfont icon-shunxubofang" custom-prefix="iconfont"></u-icon>
				</view>
				<view class="music-play-btn-list">
					<u-icon size="54" name="iconfont icon-shangyiqu1" custom-prefix="iconfont"></u-icon>
				</view>
				<view class="music-play-btn-list">
					<u-icon size="90" name="iconfont icon-bofang" custom-prefix="iconfont"></u-icon>
				</view>
				<view class="music-play-btn-list">
					<u-icon size="54" name="iconfont icon-xiayiqu" custom-prefix="iconfont"></u-icon>
				</view>
				<view class="music-play-btn-list">
					<u-icon size="46" name="iconfont icon-bofangliebiao" custom-prefix="iconfont"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-28 8:07:39 ?F10: AM?
 * description
 */

export default {
	name: 'music-detail',
	data() {
		return {};
	},

	props: {
		showMusicDetail: {
			type: Boolean
		}
	},

	computed: {},

	component: {},
	mounted() {},
	methods: {
		colseDetail() {
			this.showMusicDetail = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.musci-player-detail {
	width: 100%;
	height: 100%;
	position: fixed;
	top: calc(var(--window-top));
	left: 0;

	bottom: 0;
	z-index: 9999;
	.musci-player-box {
		padding: 20rpx;
		background-color: #efefef;
		.musci-header {
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.musci-content {
			.musci-content-cover {
				width: 400rpx;
				height: 400rpx;
				margin: 0 auto;
				.image-cover {
					margin-top: 100rpx;
					width: 400rpx;
					height: 400rpx;
					border-radius: 50%;
				}
			}
			.musci-content-lyric {
			}
		}
		.musci-tools {
			display: flex;
			justify-content: space-between;
			padding: 10rpx 80rpx;
			.musci-like {
				color: #000000;
			}
		}
		.musci-tools-progress {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.musci-tools-progress {
				width: 100%;
				
				.tools-progress {
					background-color: #c80000;
				}
			}
			.musci-tools-time {
				width: 140rpx;
			}
		}
		.music-play-btn {
			padding: 0 10rpx;
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.music-play-btn-list {
				align-items: center;
			}
		}
	}
}
</style>
