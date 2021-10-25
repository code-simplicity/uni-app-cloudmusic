<template>
	<view class="user-list">
		<view class="user-list-top">
			<u-navbar :is-back="true" title="">
				<view class="u-tabs">
					<u-tabs-swiper
						active-color="#ff0004"
						inactive-color="#000000"
						:is-scroll="false"
						:current="currentIndex"
						@change="changeTabs"
						ref="uTabs"
						:list="listTabs"
					></u-tabs-swiper>
				</view>
				<view slot="right" class="right">
					<u-icon name="search" size="50" color="#7a7a7a" @click="toSearch"></u-icon>
				</view>
			</u-navbar>
		</view>
		<swiper
			class="search-swiper"
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
			:style="{ height: screenHeight + 'px' }"
		>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;" @scrolltolower="onreachBottom">
					<view class="tools-list">
						<u-grid :col="5" :border="false">
							<u-grid-item :key="index" v-for="(item, index) in userGridData" @click="toPage(item.text)">
								<view class="m-icon" :style="{ backgroundColor: item.backgroundColor }">
									<u-icon class="u-icon" size="60" :name="item.icon" color="#ffffff"></u-icon>
								</view>
								<view class="m-text">{{ item.text }}</view>
							</u-grid-item>
						</u-grid>
					</view>
					<view class="content">
						<view class="title">你可能感兴趣的人</view>
						<u-cell-group :border="false" v-if="user && user.length > 0">
							<u-cell-item class="u-cell" :arrow="false" v-for="(item, index) in user" :key="index">
								<view slot="icon" class="user-avatar">
									<u-avatar shape="circle" size="70" :src="item.avatarUrl"></u-avatar>
								</view>
								<view slot="title" class="user-title">
									<view class="singer-name">{{ item.nickname }}</view>
									<view class="singer-num">
										<text>10</text>
										<text>1</text>
									</view>
								</view>
								<view slot="right-icon">
									<u-icon
										class="focus"
										name="plus"
										size="26"
										label="关注"
										label-size="26"
										color="#ff0000"
										label-color="#ff0000"
									></u-icon>
								</view>
							</u-cell-item>
						</u-cell-group>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;" @scrolltolower="onreachBottom">
					<user-focus :userFollows="userFollows"></user-focus>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;" @scrolltolower="onreachBottom">
					<user-focus :userFollows="userFolloweds"></user-focus>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-24 8:30:34 ?F10: PM?
 * description   用户列表 推荐，关注，粉丝
 */
import { mapGetters } from 'vuex';
export default {
	name: 'user-list',
	data() {
		return {
			listTabs: [
				{
					name: '推荐'
				},
				{
					name: '关注'
				},
				{
					name: '粉丝'
				}
			],
			userGridData: [
				{ text: '认识的人', icon: 'account-fill', backgroundColor: '#e1262a' },
				{ text: '明星用户', icon: 'level', backgroundColor: '#cec437' },
				{ text: '音乐人', icon: 'play-circle-fill', backgroundColor: '#2f89e3' },
				{ text: '音乐达人', icon: 'star-fill', backgroundColor: '#7f63c1' },
				{ text: '附近的人', icon: 'checkmark-circle-fill', backgroundColor: '#df807d' }
			],
			currentIndex: 0,
			// 控制切换选项卡
			swiperCurrent: 0,
			// 屏幕高度
			screenHeight: 0,
			// 用户
			user: [],
			// 用户关注列表
			userFollows: [],
			limit: 30,
			// 用户粉丝列表
			userFolloweds: []
		};
	},
	onReady() {
		uni.getSystemInfo({
			success: res => {
				this.screenHeight = res.screenHeight;
			}
		});
	},

	computed: {
		...mapGetters('user', ['userInfo'])
	},

	component: {},
	mounted() {
		this.getUserFollows();
		this.getUserFolloweds();
		// 通过currentIndex获取到对应的tabs
		let currentIndex = this.$Route.query.index;
		if (currentIndex) {
			// this.currentIndex = currentIndex;
			this.swiperCurrent = currentIndex
		}
	},
	methods: {
		// 获取用户关注列表
		getUserFollows() {
			let params = {
				uid: this.userInfo.userId,
				limit: this.limit
			};
			this.$api.getUserFollows(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.userFollows = res.follow;
				}
			});
		},
		// 获取用户粉丝列表
		getUserFolloweds() {
			let params = {
				uid: this.userInfo.userId,
				limit: this.limit
			};
			this.$api.getUserFolloweds(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.userFolloweds = res.followeds;
				}
			});
		},

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
.user-list {
	width: 100%;
	background-color: #ffffff;
	.user-list-top {
		.u-tabs {
			padding: 0 40rpx;
			flex: 1;
		}
		.right {
			margin-right: 20rpx;
		}
	}
	.search-swiper {
		width: 100%;
		flex: 1;
		.swiper-item {
			width: 100%;
			flex: 1;
			.tools-list {
				width: 100%;
				margin-bottom: 16rpx;
				.m-icon {
					border-radius: 50%;
					width: 100rpx;
					height: 100rpx;
					position: relative;
					.u-icon {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 20%;
					}
				}
				.m-text {
					margin-top: 12rpx;
					font-size: 24rpx;
				}
			}
			.content {
				padding: 0 20rpx;
				.title {
					font-size: 28rpx;
				}
				.u-cell {
					padding: 18rpx 16rpx;
					.user-avatar {
						margin-right: 20rpx;
					}
					.user-title {
						.singer-name {
							font-size: 30rpx;
						}
						.singer-num {
							font-size: 22rpx;
							color: #999;
						}
					}
					.focus {
						border: 1rpx solid #c7c7c7;
						padding: 6rpx 16rpx;
						border-radius: 16rpx;
						&:active {
							background-color: #e0dee1;
						}
					}
				}
			}
			.focus-page {
				padding: 20rpx;
				.title {
					font-size: 28rpx;
					margin-bottom: 16rpx;
				}
				.u-cell {
					padding: 16rpx;
					.icon {
						margin-right: 16rpx;
					}
					.title {
						.user-name {
							font-size: 28rpx;
						}
						.user-info {
							font-size: 22rpx;
						}
					}
				}
			}
			.no-focus {
				text-align: center;
				margin-top: 40rpx;
			}
		}
	}
}
</style>
