<template>
	<view class="play-list">
		<play-list-navbar :titleHeader="titleHeader"></play-list-navbar>
		<view class="play-list-box">
			<view class="wrap">
				<view class="left">
					<u-tabs-swiper
						ref="uTabs"
						:list="playList"
						:current="currentTab"
						@change="tabChange"
						:is-scroll="true"
						active-color="#e51419"
					></u-tabs-swiper>
				</view>
				<view class="right" @click="toPlayListBox">
					<u-icon name="grid" size="50" color="#626262"></u-icon>
				</view>
			</view>
		</view>

		<swiper
			class="search-swiper"
			:style="{ height: screenHeight + 'px' }"
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
		>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" style="height: 100%;">
					<recommend-play-list :songlist="songlist" :title="songTitle"></recommend-play-list>
					<!-- 歌单排行榜 -->
					<view class="play-board">
						<view class="play-board-header">
							<view class="play-board-text">排行榜</view>
							<view class="play-board-more" @click="toLeaderBoard">
								更多
								<u-icon name="arrow-right"></u-icon>
							</view>
						</view>
						<view class="play-board-swiper">
							<swiper :indicator-dots="false" class="swiper">
								<swiper-item v-for="(item, index) in playboardList" :key="index">
									<play-list-board :playboardList="item"></play-list-board>
								</swiper-item>
							</swiper>
						</view>
					</view>
					<!-- 懂你的官方榜 -->
					<recommend-play-list :songlist="officialList" :title="officialTitle"></recommend-play-list>
				</scroll-view>
			</swiper-item>
			<!-- 华语 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
					<play-list-box ref="ref0" @getStatus="getStatus"></play-list-box>
				</scroll-view>
			</swiper-item>
			<!-- 流行 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
					<play-list-box ref="ref1" @getStatus="getStatus"></play-list-box>
				</scroll-view>
			</swiper-item>
			<!-- 摇滚 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
					<play-list-box ref="ref2" @getStatus="getStatus"></play-list-box>
				</scroll-view>
			</swiper-item>
			<!-- 民谣 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
					<play-list-box ref="ref3" @getStatus="getStatus"></play-list-box>
				</scroll-view>
			</swiper-item>
			<!-- 电子 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
					<play-list-box ref="ref4" @getStatus="getStatus"></play-list-box>
				</scroll-view>
			</swiper-item>
			<!-- 另类 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
					<play-list-box ref="ref5" @getStatus="getStatus"></play-list-box>
				</scroll-view>
			</swiper-item>
			<!-- 轻音乐 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
					<play-list-box ref="ref6"></play-list-box>
				</scroll-view>
			</swiper-item>
			<!-- 综艺 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
					<play-list-box ref="ref7" @getStatus="getStatus"></play-list-box>
				</scroll-view>
			</swiper-item>
			<!-- 影视原声 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
					<play-list-box ref="ref8" @getStatus="getStatus"></play-list-box>
				</scroll-view>
			</swiper-item>
			<!-- ACG -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
					<play-list-box ref="ref9" @getStatus="getStatus"></play-list-box>
				</scroll-view>
			</swiper-item>
		</swiper>
		<music-player></music-player>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-9 10:02:04 ?F10: PM?
 * description 歌单
 */

export default {
	name: 'play-list',
	data() {
		return {
			// 选项卡
			playList: [],
			// 返回的选项卡值
			playLists: [
				{
					name: ''
				}
			],
			// 选项卡的值
			currentTab: 0,
			// 控制切换选项卡
			swiperCurrent: 0,
			// 推荐歌单
			songlist: [],
			songTitle: '推荐歌单',
			// 歌单返回数量
			limit: 12,
			// 推荐歌单分类
			playboardList: [],
			// 官方榜单
			officialList: [],
			//
			officialTitle: '懂你的官方榜',
			// 屏幕高度
			screenHeight: 0,
			// 是否拥有更多
			hasmore: true,
			status: '',
			// 偏移量
			offset: 0,
			// 顶部title
			titleHeader: '歌单广场'
		};
	},
	component: {},
	onReady() {
		uni.getSystemInfo({
			success: res => {
				this.screenHeight = res.screenHeight;
			}
		});
	},

	mounted() {
		this.getPlayListHot();
		this.getPersonalized();
		this.getTopPlayList();
		this.getPlayList(this.playLists, this.swiperCurrent - 1, this.offset);
	},
	methods: {
		// 去所有歌单列表
		toPlayListBox() {
			this.$Router.push({
				name: 'PlayListBox'
			});
		},

		// 传递cat的值，调用给子组件，传递index，通知tabs更新
		getPlayList(playLists, index, offset) {
			switch (index) {
				case 0: {
					this.$refs.ref0.getTopPlayList(playLists[index].name, offset);
					break;
				}
				case 1: {
					this.$refs.ref1.getTopPlayList(playLists[index].name, offset);
					break;
				}
				case 2: {
					this.$refs.ref2.getTopPlayList(playLists[index].name, offset);
					break;
				}
				case 3: {
					this.$refs.ref3.getTopPlayList(playLists[index].name, offset);
					break;
				}
				case 4: {
					this.$refs.ref4.getTopPlayList(playLists[index].name, offset);
					break;
				}
				case 5: {
					this.$refs.ref5.getTopPlayList(playLists[index].name, offset);
					break;
				}
				case 6: {
					this.$refs.ref6.getTopPlayList(playLists[index].name, offset);
					break;
				}
				case 7: {
					this.$refs.ref7.getTopPlayList(playLists[index].name, offset);
					break;
				}
				case 8: {
					this.$refs.ref8.getTopPlayList(playLists[index].name, offset);
					break;
				}
				case 9: {
					this.$refs.ref9.getTopPlayList(playLists[index].name, offset);
					break;
				}
			}
		},

		// 获取歌单(网友精选)
		getTopPlayList() {
			let params = {
				limit: this.limit,
				offset: this.offset
			};
			this.$api.getTopPlayList(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.officialList = res.playlists;
				}
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

		// 获取热门歌单
		getPlayListHot() {
			this.$api.getPlayListHot().then(res => {
				let tags = [
					{
						name: '推荐'
					}
				];
				this.playList = tags.concat(res.tags);
				this.playLists = res.tags;
				this.playboardList = res.tags.slice(0, 3);
			});
		},

		// tabs通知swiper切换
		tabChange(index) {
			this.swiperCurrent = index;
			// 通知切换之后，分页偏移需要为0，从0开始
			this.offset = 0;
			this.getPlayList(this.playLists, index - 1, this.offset);
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
			if (this.currentTab !== current) {
				this.getPlayList(this.playLists, current - 1, this.offset);
			}
			this.currentTab = current;
		},

		// 获取状态
		getStatus(state, hasmore) {
			this.status = status;
			this.hasmore = hasmore;
		},

		// scroll-view到底部加载更多
		onreachBottom() {
			if (this.hasmore === true) {
				setTimeout(() => {
					this.status = 'loading';
					this.offset += 1;
					this.getPlayList(this.playLists, this.swiperCurrent - 1, this.offset);
				}, 1000);
			} else if (this.hasmore === false) {
				this.status = 'nomore';
				console.log('没有更多了!');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.play-list {
	width: 100%;
	height: 100%;
	padding-bottom: 40rpx;
	background-color: #ffffff;
	.play-list-box {
		width: 100%;
		position: sticky;
		top: 70rpx;
		left: 0;
		right: 0;
		z-index: 99;
		.wrap {
			width: 100%;
			position: relative;
			background-color: #ffffff;
			.left {
				width: 90%;
				overflow: hidden;
			}
			.right {
				position: absolute;
				top: 2rpx;
				right: 10rpx;
				padding: 10rpx 10rpx 10rpx 0;
			}
		}
	}
	.search-swiper {
		flex: 1;
		.swiper-item {
			flex: 1;
			.play-board {
				display: flex;
				flex-direction: column;
				position: relative;
				padding: 20rpx;
				border-radius: 16rpx;
				margin-bottom: 16rpx;
				.play-board-header {
					display: flex;
					flex: 1;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20rpx;
					.play-board-text {
					}
					.play-board-more {
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
				.play-board-swiper {
					padding: 10rpx;
					border-radius: 16rpx;
					box-shadow: 0rpx 0rpx 0rpx 2rpx rgba(182, 182, 182, 1);
					height: 100%;
					background-color: #ffffff;
					.swiper {
						display: flex;
						height: 460rpx;
						.swiper-item {
							height: 100%;
						}
					}
				}
			}
		}
	}
}
</style>
