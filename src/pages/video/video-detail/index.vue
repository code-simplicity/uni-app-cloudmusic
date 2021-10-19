<template>
	<view class="video-detail-box">
		<!-- <play-list-navbar></play-list-navbar> -->
		<!-- 处理视频上下切换 -->
		<u-navbar
			:border-bottom="false"
			:height="55"
			:immersive="true"
			:background="{ background: 'transparent' }"
		></u-navbar>
		<swiper
			class="swiper"
			:vertical="true"
			:autoplay="false"
			:current="current"
			:duration="200"
			@change="onChange"
			:style="{ height: windowHeight + 'px' }"
		>
			<swiper-item v-for="(item, index) in videoList" :key="index">
				<view
					class="video-box"
					:data-set="{ index }"
					v-if="index == current || index == current - 1 || index == current + 1"
				>
					<video
						:id="'videoPlayer' + index"
						:ref="'videoPlayer' + index"
						:data-set="{ index }"
						v-if="item.url"
						class="video-class"
						:src="item.url"
						:poster="item.coverUrl"
						@tap.stop="onClickVideo"
						:autoplay="true"
						:loop="true"
						:controls="false"
						:show-loading="false"
						object-fit="contain"
						:enable-progress-gesture="false"
						:show-fullscreen-btn="true"
						:danmu-btn="true"
						:enable-danmu="false"
						@play="onPlay"
						@loadedmetadata="onLoadedmetadata"
						@error="videoErrorCallback"
						@timeupdate="onUpdateTime"
						@pause="onPause"
						@controlstoggle="controlstoggle"
						webkit-playsinline
						playsinline
						x5-playsinline
						x-webkit-airplay="allow"
						x5-video-player-type="h5"
						x5-video-orientation="portraint"
						x5-video-player-fullscreen=""
					></video>

					<!-- 底部展示区 -->
					<view class="video-info-bottom">
						<view class="video-info-top">
							<view class="image-avatar">
								<u-avatar :src="item.avatarUrl || item.coverUrl" size="80"></u-avatar>
							</view>
							<text class="user-name">{{ item.creator.nickname || item.creator[0].userName }}</text>
							<view class="collect"><u-icon name="plus" color="#ffffff"></u-icon></view>
						</view>
						<view class="video-info-detail line-2">
							<text class="video-detail line-2">{{ item.title }}</text>
						</view>
						<u-line-progress
							height="6"
							:show-percent="false"
							active-color="#e51419"
							:percent="processPer"
						></u-line-progress>
						<!-- <view class="video-progress">
							<u-slider
								height="4"
								block-width="18"
								active-color="#e51419"
								v-model="processPer"
								
							></u-slider>
						</view> -->
					</view>
					<!-- 右侧功能栏 -->
					<view class="video-info-right">
						<view class="video-tools">
							<u-icon
								class="thumb-up-fill"
								name="thumb-up-fill"
								color="#ffffff"
								size="50"
								:label="item.praisedCount ? item.praisedCount : videoInfo[index].likedCount"
								label-pos="bottom"
								:label-size="24"
								label-color="#ffffff"
							></u-icon>
						</view>
						<view class="video-tools">
							<u-icon
								class="chat-fill"
								name="chat-fill"
								color="#ffffff"
								size="50"
								:label="item.commentCount ? item.commentCount : videoInfo[index].commentCount"
								label-pos="bottom"
								:label-size="24"
								label-color="#ffffff"
							></u-icon>
						</view>
						<view class="video-tools">
							<u-icon
								class="zhuanfa"
								name="zhuanfa"
								color="#ffffff"
								size="50"
								:label="item.shareCount ? item.shareCount : videoInfo[index].shareCount"
								label-pos="bottom"
								:label-size="24"
								label-color="#ffffff"
							></u-icon>
						</view>
						<view class="video-tools">
							<u-icon
								class="bookmark-fill"
								name="bookmark-fill"
								color="#ffffff"
								size="50"
								label-color="#ffffff"
							></u-icon>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	name: 'video-detail',
	data() {
		return {
			// 视频播放地址
			videoUrl: '',
			// 视频id
			id: '',
			// 视频播放的索引
			current: 0,
			// 视频是否正在播放
			isPlaying: true,
			// 视频列表
			videoList: [],
			// 屏幕窗口高度
			windowHeight: 0,
			// 屏幕宽度
			windowWidth: 0,
			// 视频进度条
			videoProgress: {
				currentTime: 0,
				duration: 0
			},
			// 视频评论点赞
			videoInfo: [
				{
					likedCount: '',
					commentCount: '',
					shareCount: '',
					liked: null
				}
			]
		};
	},

	onLoad() {
		let that = this;
		// 获取屏幕宽高
		uni.getSystemInfo({
			success: res => {
				let windowHeight = res.screenHeight;
				let windowWidth = res.windowWidth;
				that.windowHeight = windowHeight; //将计算好的高度给定义好的值
				this.windowWidth = windowWidth;
			}
		});
	},

	component: {},

	computed: {
		processPer() {
			let { currentTime, duration } = this.videoProgress;
			return Math.ceil((currentTime / duration) * 100);
		}
	},

	mounted() {
		let id = this.$Route.query.id;
		if (id) {
			this.id = id;
		}
		this.getVideoDetail();
	},

	methods: {
		// 移动播放进度
		startProcess() {},

		// 控制视频上下切换
		onChange(e) {
			console.log('onChange:', e);
			let { current, source } = e.detail;
			try {
				//暂停上下两个的视频
				this.pause(current - 1);
				this.pause(current + 1);
			} catch (e) {
				console.error('暂停视频出错', e);
			}
			console.log('------onChange current', current);
			this.current = current;
			this.doPlay(current);

			const { videoList } = this;
			if (current === videoList.length - 1) {
				this.getRelatedAllvideo(videoList[videoList.length - 1].vid);
			}
		},

		// 执行播放，根据下标
		doPlay(index) {
			let item = this.videoList[index];
			if (item.url) {
				// 执行播放
				this.play(index);
				return;
			}
			// 获取相关视频的播放地址
			this.getVideoUrl(index);
		},

		/**
		 * 视频元数据加载完成时触发
		 */
		onLoadedmetadata(ev) {
			let { current } = this;
			this.doPlay(current);
		},

		/**
		 * 当开始/继续播放时触发play事件
		 */
		onPlay(ev) {
			console.log('onPlay', ev);
			const { detail, currentTarget } = ev;

			this.videoProgress = detail;

			let index = currentTarget.dataset.set.index;
			let item = this.videoList[index];
			item.playing = true;
			this.$set(this.videoList, index, item);
		},

		/**
		 * 进度更新
		 */
		onUpdateTime(ev) {
			let { detail } = ev;
			this.videoProgress = detail;
		},

		/**
		 * 点击当前视频控件
		 */
		onClickVideo(ev) {
			console.log('onClickVideo', ev);
			let {
				detail,
				currentTarget: {
					dataset: { set }
				}
			} = ev;
			let index = set.index;
			let item = this.videoList[index];
			let playing = item.playing;

			if (playing === true) {
				this.pause(index);
			} else {
				this.play(index);
			}
		},

		/**
		 * 暂停时触发
		 */
		onPause(ev) {
			console.log('onPause', ev);
			let {
				detail,
				currentTarget: {
					dataset: { set }
				}
			} = ev;
			let index = set.index;
			let item = this.videoList[index];
			item.playing = false;
			this.$set(this.videoList, index, item);
		},

		// 开始播放
		play(index) {
			if (!index) {
				index = this.current;
			}
			// 更新节点
			this.$nextTick(() => {
				let videoContext = uni.createVideoContext('videoPlayer' + index);
				if (videoContext) {
					videoContext.play();
				} else {
					console.log('video 上下文不存在');
				}
			});
		},

		/**
		 * 暂停播放
		 */
		pause(index) {
			if (!index) {
				index = this.current;
			}
			let videoContext = uni.createVideoContext('videoPlayer' + index);
			if (videoContext) {
				videoContext.pause();
			} else {
				console.log('video 上下文不存在');
			}
		},

		/**
		 * 播放控制条显示时
		 */
		controlstoggle(e) {
			console.debug(e, 'controlstoggle');
		},

		// 播放错误的回调
		videoErrorCallback(e) {
			console.error('videoErrorCallback', e);
		},

		// 获取视频播放地址
		getVideoUrl(index) {
			const { videoList } = this;
			let item = videoList[index];
			if (!item) {
				return;
			}
			console.log('getVideoUrl', item);
			if (!item.url) {
				this.$api.getVideoUrl(item.vid).then(res => {
					if (res.code === this.$code.code_status) {
						let urls = res.urls;
						if (urls && urls.length > 0) {
							item.url = urls[0].url;
							item.urls = urls;
							//通知视图更新
							this.$set(this.videoList, index, item);
						} else {
							this.showNoneToast({
								title: '播放地址找不到'
							});
						}
					}
				});
			}
		},

		// 获取视频或者mv数据
		getVideoDetail() {
			const { id } = this;
			this.$api.getVideoDetail(id).then(res => {
				if (res.code === this.$code.code_status) {
					let videoData = res.data;
					let videoList = {
						vid: videoData.vid,
						title: videoData.title,
						description: videoData.description,
						avatarUrl: videoData.avatarUrl,
						videoType: 2,
						coverUrl: videoData.coverUrl,
						shareCount: videoData.shareCount, //分享数量
						commentCount: videoData.commentCount, //评论数量
						subscribeCount: videoData.subscribeCount, // 收藏
						praisedCount: videoData.praisedCount, //点赞
						creator: { nickname: videoData.creator.nickname }
					};
					this.videoList.push(videoList);
					console.log(this.videoList);
					// 执行播放
					this.doPlay(this.current);
					// 加载相关的视频
					this.getRelatedAllvideo(id);
				}
			});
		},

		// 获取相关视频
		getRelatedAllvideo(id) {
			this.$api.getRelatedAllvideo(id).then(res => {
				if (res.code === this.$code.code_status) {
					let videoData = res.data;
					videoData.map(item => {
						//播放类型: 1-mv，2-视频
						item.videoType = 2;
					});

					videoData.forEach(item => {
						// 获取相关视频的点赞转发数据
						this.$api.getVideoDetailInfo(item.vid).then(res1 => {
							if (res1.code === this.$code.code_status) {
								let videoInfo = res1;
								this.videoInfo.push(videoInfo);
								console.log('this.videoInfo====>', this.videoInfo);
							}
						});
					});

					this.videoList.push(...videoData);
					// 如果视频的下标值为0，停止播放
					console.log('videoList ===>', this.videoList);
					if (this.current === 0) {
						this.doPlay(0);
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.video-detail-box {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #000000;
	.swiper {
		width: 100%;
		position: relative;
		.video-box {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
		}
		.video-class {
			width: 100%;
			// position: relative;
		}
		.video-info-box {
			display: flex;
			align-items: center;
			flex-direction: column;
			position: absolute;
			top: 46%;
		}
		.video-info-bottom {
			position: absolute;
			bottom: 30rpx;
			padding: 16rpx;
			display: flex;
			flex-direction: column;
			width: 100%;
			height: auto;
			color: #fff;
			z-index: 9999;
			.video-info-top {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 26rpx;
				.user-name {
					margin: 0 30rpx;
					font-size: 26rpx;
					color: #ffffff;
				}
				.collect {
					padding: 4rpx 20rpx;
					display: flex;
					align-items: center;
					border-radius: 16rpx;
					background-color: #ff0000;
				}
			}
			.video-info-detail {
				color: #ffffff;
				font-size: 24rpx;
				margin-bottom: 40rpx;
			}
			.video-progress {
			}
		}
		.video-info-right {
			position: absolute;
			right: 10px;
			bottom: 40px;
			z-index: 9999;
			.video-tools {
				margin-bottom: 20px;
			}
		}
	}
}
</style>
