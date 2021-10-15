<template>
	<view class="radio-station-songs">
		<view class="radio-top">
			<view class="left">
				<u-tabs-swiper
					active-color="#ff0004"
					inactive-color="#000000"
					:is-scroll="false"
					:current="currentIndex"
					@change="changeTabs"
					ref="uTabs"
					:list="listTabs"
					font-size="26"
				></u-tabs-swiper>
			</view>
			<view class="right" v-if="currentIndex === 0">
				<view class="right-sort"><u-icon name="list" size="50"></u-icon></view>
				<view class="right-choose"><u-icon name="checkmark-circle" size="50"></u-icon></view>
			</view>
		</view>
		<swiper
			class="search-swiper"
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
		>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%; height: 100%;" @scrolltolower="onreachBottom">
					<u-cell-group>
						<u-cell-item
							class="u-cell"
							:arrow="false"
							v-for="(item, index) in radioSongsList.radioMusicList"
							:key="index"
						>
							<view slot="icon" class="left-icon">
								<u-image border-radius="16" width="100rpx" height="100rpx" :src="item.image"></u-image>
							</view>
							<view slot="title" class="title">
								<view class="title-top">{{ item.name }}</view>
								<view class="title-bottom">
									<view class="create-time">{{ utils.formatMsgTime(item.createTime) }}</view>
									<view class="play-count">
										<u-icon name="play-right" size="22"></u-icon>
										{{ utils.tranNumber(item.playCount, 1) }}
									</view>
									<view class="duration">
										<u-icon name="clock" size="22"></u-icon>
										{{ utils.formatSecondTime(item.duration) }}
									</view>
								</view>
							</view>
							<view slot="right-icon" class="right-icon">
								<u-icon class="more-dot-fill" size="40" name="more-dot-fill"></u-icon>
							</view>
						</u-cell-item>
					</u-cell-group>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%; height: 100%;" @scrolltolower="onreachBottom">
					<view class="radio-station-detail">
						<view class="header">内容简介</view>
						<view class="content-des">{{ radioStationList.desc }}</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-15 5:59:33 ?F10: PM?
 * description
 */
export default {
	name: 'radio-station-songs',
	data() {
		return {
			listTabs: [
				{
					name: '声音',
					count: this.radioSongsList.count
				},
				{
					name: '详情'
				}
			],
			currentIndex: 0,
			// 电台歌曲
			radioMusicList: [],
			// 控制切换选项卡
			swiperCurrent: 0
		};
	},
	props: {
		radioSongsList: {
			type: Object
		},
		radioStationList: {
			type: Object
		}
	},

	computed: {},

	component: {},
	mounted() {},
	methods: {
		// 切换tabs
		changeTabs(index) {
			this.swiperCurrent = index;
			console.log(index);
		},

		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},

		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.currentIndex = current;
		},

		// scroll-view到底部加载更多
		onreachBottom() {
			console.log('没有更多了!');
		}
	}
};
</script>

<style lang="scss" scoped>
.radio-station-songs {
	width: 100%;
	height: 100%;
	padding: 10rpx;
	.radio-top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #ffffff;
		.left {
			width: 220rpx;
		}
		.right {
			display: flex;
			margin-right: 20rpx;
			.right-sort {
				margin-right: 26rpx;
			}
		}
	}
	.search-swiper {
		flex: 1;
		height: 1400rpx;
		.swiper-item {
			height: 100%;
			.u-cell {
				padding: 16rpx 20rpx;
				.left-icon {
					margin-right: 16rpx;
				}
				.title {
					.title-top {
						font-size: 30rpx;
						flex-wrap: nowrap;
						height: 50rpx;
						-webkit-line-clamp: 1; // 用来限制在一个块元素显示的文本的行数
						display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
						-webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
						text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
						word-break: break-all;
						overflow: hidden;
					}
					.title-bottom {
						display: flex;
						align-items: center;
						font-size: 24rpx;
						.create-time {
						}
						.play-count {
							margin: 0 16rpx;
						}
					}
				}
				.right-icon {
					.more-dot-fill {
						transform: rotate(90deg);
					}
				}
			}
			.radio-station-detail {
				padding: 20rpx;
				display: flex;
				flex-direction: column;
				background-color: #ffffff;
				.header {
					font-size: 28rpx;
					font-weight: 500;
				}
				.content-des {
					font-size: 24rpx;
					color: #5a5a5a;
					white-space: pre-line;
					line-height: 36rpx;
				}
			}
		}
	}
}
</style>
