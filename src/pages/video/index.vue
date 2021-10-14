<template>
	<view class="video-box">
		<!-- 头部固定 -->
		<my-search :searchShow="searchShow" :micShow="micShow"></my-search>
		<scroll-view
			scroll-y="true"
			:refresher-enabled="true"
			:refresher-triggered="triggered"
			@refresherrefresh="onRefresh"
			@refresherrestore="onRestore"
		>
			<view class="video-list">
				<view
					class="video-wrap"
					v-for="(item, index) in videoList"
					:key="index"
					@click="toVideoDetail(item.id)"
				>
					<view class="video-conent">
						<view class="image-cover">
							<image class="image" :src="item.image" mode="aspectFill"></image>
							<view class="user">
								<view class="user-avatar"><u-avatar :src="item.avatar" size="60"></u-avatar></view>
								<view class="duration">{{ item.duration }}</view>
							</view>
						</view>
						<view class="video-wrap-bottom">
							<view class="video-name">{{ item.name }}</view>
							<view class="video-singer">
								<view class="video-left">
									<view class="play-circle">
										<u-icon name="play-circle" size="38"></u-icon>
										{{ utils.tranNumber(item.playCount, 1) }}
									</view>
									<view class="thumb-up">
										<u-icon name="thumb-up" size="38"></u-icon>
										{{ item.praisedCount }}
									</view>
								</view>
								<view class="video-right">{{ item.nickName }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<u-loadmore :status="status" />
		<!-- 底部播放器 -->
		<!-- <music-player></music-player> -->
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-24 9:31:07 ?F10: PM?
 * description
 */
import { createVideo } from '@/utils/video.js';

export default {
	name: 'Video',
	data() {
		return {
			searchShow: true,
			micShow: true,
			videoList: [],
			// 视频数量添加
			offset: 0,
			status: 'loadmore',
			// 设置·当前下拉刷新是否被触发
			triggered: false,
			// 当前的数据是否还有
			hasmore: false
		};
	},
	onLoad() {
		setTimeout(() => {
			this.triggered = true;
		}, 1000);
	},
	// 上拉刷新
	onReachBottom() {
		if (this.hasmore === true) {
			setTimeout(() => {
				this.status = 'loading';
				this.offset += 1;
				this.getVideoTimelineRecommend();
			}, 1000);
		} else if (this.hasmore === false) {
			this.status = 'nomore';
		}
	},
	component: {},
	mounted() {
		this.getVideoTimelineRecommend();
	},
	methods: {
		// 去视频列表
		toVideoDetail(id) {
			this.$Router.push({
				name: 'VideoDetail',
				params: {
					id
				}
			});
		},

		// 自定义下拉刷新
		onRefresh() {
			setTimeout(() => {
				this.triggered = false;
			}, 1000);
			// 重新请求数据
			this.offset += 1;
			let params = {
				offset: this.offset
			};
			this.$api.getVideoTimelineRecommend(params).then(res => {
				if (res.code === this.$code.code_status) {
					// 刷新之后出现数据
					this.videoList = this._normalizeVideos(res.datas);
					if (res.hasmore) {
						this.hasmore = res.hasmore;
					}
				}
			});
		},

		// 重置复位
		onRestore() {
			this.triggered = 'restore'; // 需要重置
		},

		// 获取视频
		getVideoTimelineRecommend() {
			let params = {
				offset: this.offset
			};
			this.$api.getVideoTimelineRecommend(params).then(res => {
				if (res.code === this.$code.code_status) {
					// 刷新之后出现数据
					this.videoList = this.videoList.concat(this._normalizeVideos(res.datas));
					if (res.hasmore) {
						this.hasmore = res.hasmore;
					}
				}
			});
		},

		// 处理视频
		_normalizeVideos(list) {
			let resArr = [];
			list.map(item => {
				// 视频数据
				let res = item.data;
				// 直播数据
				let liveRes = item.data.liveData;
				// 视频id存在就是视频，否则就是直播
				if (res.vid) {
					resArr.push(
						createVideo({
							id: res.vid,
							nickName: res.creator.nickname,
							name: res.title,
							playCount: res.playTime,
							duration: res.durationms,
							image: res.coverUrl,
							isLive: false,
							avatar: res.creator.avatarUrl,
							praisedCount: res.praisedCount
						})
					);
				} else {
					resArr.push(
						createVideo({
							id: liveRes.liveRoom.liveRoomNo,
							nickName: liveRes.liveUser.nickName,
							name: liveRes.liveRoom.title,
							playCount: liveRes.liveRoom.popularity,
							duration: liveRes.liveRoom.liveStatus === 1 ? '正在直播' : '直播已关闭',
							image: liveRes.liveRoom.coverUrl,
							isLive: true,
							avatar: liveRes.liveUser.avatarUrl,
							praisedCount: liveRes.praisedCount
						})
					);
				}
			});
			return resArr;
		}
	}
};
</script>

<style lang="scss" scoped>
.video-box {
	width: 100%;
	height: 100%;
	padding: 0 16rpx;
	.video-list {
		width: 100%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 10rpx;
		.video-wrap {
			flex: 0 0 50%;
			max-width: 50%;
			padding: 10rpx;
			.video-conent {
				width: 100%;
				border-radius: 16rpx;
				margin-bottom: 20rpx;
				background-color: #ffffff;
				.image-cover {
					width: 340rpx;
					height: 400rpx;
					margin-bottom: 20rpx;
					.image {
						width: 100%;
						height: 100%;
					}
					.user {
						position: absolute;
						margin-top: -90rpx;
						width: 50%;
						display: flex;
						align-items: center;
						.user-avatar {
							flex: 1;
						}
						.duration {
							margin-right: 50rpx;
							color: #ffffff;
							font-size: 16rpx;
						}
					}
				}
			}
			.video-wrap-bottom {
				display: flex;
				flex-direction: column;
				padding: 10rpx;
				.video-name {
					font-size: 24rpx;
					height: 60rpx;
					-webkit-line-clamp: 2; // 用来限制在一个块元素显示的文本的行数
					display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
					-webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
					text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
					word-break: break-all;
					overflow: hidden;
				}
				.video-singer {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 16rpx;
					height: 60rpx;
					.video-left {
						display: flex;
						align-items: center;
						margin-right: 10rpx;
						font-size: 18rpx;
						transform: scale(0.9);
						.play-circle {
							width: 120rpx;
							display: flex;
							align-items: center;
							margin-right: 10rpx;
						}
						.thumb-up {
							display: flex;
							align-items: center;
						}
					}
					.video-right {
						font-size: 18rpx;
						transform: scale(0.9);
						-webkit-line-clamp: 1;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						text-overflow: ellipsis;
						word-break: break-all;
						overflow: hidden;
					}
				}
			}
		}
	}
}
</style>
