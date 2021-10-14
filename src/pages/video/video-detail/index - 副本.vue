<template>
	<view class="video-detail-box">
		<play-list-navbar></play-list-navbar>
		<view class="video-detail-wrap">
			<swiper
				class="video-detail-swiper"
				:indicator-dots="false"
				:autoplay="false"
				:vertical="true"
				:current="currentVideo"
				@change="handleSwipeVertical"
				style="height: 100%;"
			>
				<swiper-item class="" v-for="(item, index) in videoList" :key="index">
					<view class="">123</view>
					<!-- 视频区域 -->
					<view class="video-swiper-item">
						<video
							id="'videoPlayer' + index"
							class="video-style"
							:src="videoUrl"
							:autoplay="true"
							:loop="true"
							:controls="false"
							:show-center-play-btn="false"
						></video>
						<view class="video-control">
							<view class="video-control-button">
								<u-icon class="play-circle" name="play-circle" color="#000000" size="60"></u-icon>
							</view>
						</view>
					</view>
					<!-- 内容列表 -->
					<view class="video-info">
						<view class="video-info-box">
							<view class="image-avatar"><u-avatar :src="src"></u-avatar></view>
							<view class="user-name">123</view>
							<view class="collect"><u-icon name="plus" color="#ffffff"></u-icon></view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-13 3:05:32 ?F10: PM?
 * description
 */

export default {
	name: 'video-detail',
	data() {
		return {
			// 视频播放地址
			videoUrl: '',
			// 视频id
			videoId: '',
			// 视频播放的索引
			currentVideo: 0,
			// 视频是否正在播放
			isPlaying: false,
			// 视频
			videoList: []
		};
	},
	component: {},
	mounted() {
		let id = this.$Route.query.id;
		if (id) {
			this.videoId = id;
			this._initialize(id);
		}
	},
	methods: {
		// 创建失败播放实例
		getVideo() {
			return uni.createVideoContext('videoPlayer' + this.currentVideo, this);
		},

		// 控制垂直切换视频
		handleSwipeVertical(e) {
			let index = e.target.current;
			this.isPlaying = false;
			let video = this.getVideo();
			if (!video) {
				return;
			}
			// 暂停
			video.pause();
			// 视频进度从0开始
			video.seek(0);
			// 播放索引的赋值
			this.currentVideo = index;
			// 自动播放
			video.handlePlay();
		},

		// 控制播放
		handlePlay() {
			let video = this.getVideo();
			if (!video) {
				return;
			}
			// 播放
			video.play();
			this.isPlaying = true;
		},

		// 控制暂停
		handlePause() {
			let video = this.getVideo();
			if (!video) {
				return;
			}
			// 暂停
			video.pause();
			this.isPlaying = false;
		},

		// 获取视频播放地址
		getVideoUrl(id) {
			this.$api.getVideoUrl(id).then(res => {
				if (res.code === this.$code.code_status) {
					this.videoUrl = res.urls[0].url;
				}
			});
		},

		// 初始化
		_initialize(id) {
			this.getVideoUrl(id);
		}
	}
};
</script>

<style lang="scss" scoped>
.video-detail-box {
	width: 100%;
	height: 100%;
	.video-detail-wrap {
		margin-top: 40rpx;
		width: 100%;
		height: 100%;
		.video-detail-swiper {
			width: 100%;
			background-color: #f1d9f1;
			.video-swiper-item {
				width: 100%;
				height: 100%;
				display: flex;
				position: relative;
				.video-style {
					position: absolute;
					top: 400rpx;
					width: 100%;
				}
				.video-control {
					width: 100%;
					margin-top: 600rpx;
					.video-control-button {
						margin-top: 40rpx;
						.play-circle {
							font-size: 600rpx;
						}
					}
				}
			}
			.video-info {
				display: flex;
				position: absolute;
				bottom: 0;
				width: 100%;
				.video-info-box {
					width: 100%;
					display: flex;
					.image-avatar {
						width: 120px;
						height: 120rpx;
					}
					.user-name {
						font-size: 28rpx;
					}
					.collect {
						border-radius: 16rpx;
						background-color: #ff0000;
					}
				}
			}
		}
	}
}
</style>
