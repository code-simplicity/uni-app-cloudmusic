<template>
	<view class="user-info">
		<view class="user-info-header"><play-list-navbar :title="userProfile.nickname"></play-list-navbar></view>
		<view class="user-info-content">
			<view class="user-info-wrap">
				<view class="user-info-background">
					<image class="image-background" :src="userProfile.backgroundUrl" lazy-load="true"></image>
				</view>
				<view class="user-info-detail">
					<view class="user-avatar"><u-avatar :src="userProfile.avatarUrl" size="150"></u-avatar></view>
					<view class="user-info-list">
						<view class="user-info-basic">
							<view class="user-info-fan">
								<view class="user-info-fan-num">{{ userProfile.followeds }}</view>
								<view class="title">粉丝</view>
							</view>
							<view class="user-info-focus">
								<view class="user-info-focus-num">{{ userProfile.newFollows }}</view>
								<view class="title">关注</view>
							</view>
							<view class="user-info-level">
								<view class="user-info-level-num">{{ userDetail.level }}</view>
								<view class="title">等级</view>
							</view>
						</view>
						<view class="user-info-edit">编辑</view>
					</view>
				</view>
			</view>
			<view class="user-info-sign">
				<text>签名：</text>
				{{ userProfile.signature }}
			</view>
			<view class="user-info-tabs">
				<view class="user-tabs-list">
					<u-tabs
						:list="listTabs"
						:bold="true"
						:is-scroll="false"
						bg-color="#f0f0f0"
						:current="current"
						@change="checkTabs"
					></u-tabs>
				</view>
				<view class="user-tabs-check">
					<!-- 主页 -->
					<view class="user-info-home-page" v-if="mode === 0">
						<view class="basic-information">
							<view class="basic-information-header">基本信息</view>
							<view class="basic-information-content">
								<view class="basic-information-village-age">
									<text class="title">村龄：</text>
									<text class="desc">{{ userDetail.createDays }}天</text>
								</view>
								<view class="basic-information-village-age">
									<text class="title">年龄：</text>
									<text class="desc">41</text>
								</view>
								<view class="basic-information-village-age">
									<text class="title">性别：</text>
									<text class="desc" v-if="userProfile.gender === 1">男</text>
									<text class="desc" v-if="userProfile.gender === 2">女</text>
								</view>
								<view class="basic-information-village-age">
									<text class="title">地区：</text>
									<text class="desc">天津</text>
								</view>
							</view>
							<view class="user-info-introduce">
								<view class="user-info-introduce-title">个人介绍</view>
								<view class="user-info-introduce-desc">{{ userProfile.signature }}</view>
							</view>
						</view>
						<view class="user-info-musical-taste">
							<view class="user-info-musical-header">基本信息</view>
							<view class="user-info-musical-content">
								<view class="image">
									<image
										class="image-cover image-border"
										src="../../../static/images/ranking.png"
										mode="aspectFit"
									></image>
								</view>
								<view class="user-info-musical-info">
									<view class="music-like">听歌排行</view>
									<view class="info-text">累计听歌{{ userDetail.listenSongs }}</view>
								</view>
							</view>
							<view class="user-info-musical-content" v-for="(item, index) in likeMusic" :key="index">
								<view class="image">
									<image
										class="image-cover image-border"
										:src="item.coverImgUrl"
										mode="aspectFit"
									></image>
								</view>
								<view class="user-info-musical-info">
									<view class="music-like">我喜欢的音乐</view>
									<view class="info-text">{{ item.trackCount }}首</view>
								</view>
							</view>
						</view>
						<view class="user-info-musical-taste">
							<user-play-list :songList="userPlayList" :header="myPlayTxt"></user-play-list>
						</view>
						<view class="user-info-musical-taste">
							<user-play-list :songList="collectPlayList" :header="collectPlayTxt"></user-play-list>
						</view>
					</view>
					<!-- 动态 -->
					<view class="user-info-home-dynamic" v-if="mode === 1">123</view>
					<!-- 播客 -->
					<view class="user-info-home-play" v-if="mode === 2">23</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-4 7:33:52 ?F10: PM?
 * description
 */

import { mapGetters } from 'vuex';
export default {
	name: 'user-info',
	data() {
		return {
			// title
			title: '',
			listTabs: [
				{
					name: '主页'
				},
				{
					name: '动态',
					count: ''
				},
				{
					name: '播客'
				}
			],
			// 默认索引
			current: 0,
			// 切换模式
			mode: 0,
			// 我创建的歌单
			myPlayTxt: '我创建的歌单',
			// 我收藏的歌单
			collectPlayTxt: '我收藏的歌单',
			// 用户创建的歌单
			userPlayList: [],
			// 用户收藏的歌单
			collectPlayList: [],
			// 用户基本信息
			userProfile: {},
			// 用户详细信息
			userDetail: {},
			// 我喜欢的音乐
			likeMusic: []
		};
	},

	computed: {
		...mapGetters('user', ['userInfo'])
	},

	watch: {
		$Route(newId, oldId) {
			if (newId.query.id) {
				this.getUserInfo(newId.query.id);
			} else {
				this.getUserInfo(this.userInfo.userId);
			}
			this._initIaLize();
		}
	},

	component: {},
	mounted() {
		let id = this.$Route.query.id || this.userInfo.userId;
		if (id) {
			this._initIaLize(id);
			this.getUserInfo(id);
		} else {
			this.getUserInfo(this.userInfo.userId);
		}
	},

	methods: {
		// 获取用户信息
		async getUserInfo(uid) {
			try {
				let res = await this.$api.getUserInfo(uid);
				if (res.code === this.$code.code_status) {
					this.userProfile = res.profile;
					this.userDetail = res;
				}
			} catch (e) {
				console.log(e);
			}
		},

		// 获取用户歌单
		getUserPlaylist(uid) {
			this.$api.getUserPlaylist(uid).then(res => {
				if (res.code === this.$code.code_status) {
					// 用户创建
					let myList = [];
					// 用户收藏
					let collectList = [];
					let list = [];
					list = res.playlist;
					list.map(item => {
						// 判断是我创建的还是我收藏的
						if (item.userId === uid) {
							myList.push(item);
						} else {
							collectList.push(item);
						}
					});
					this.likeMusic = myList.slice(0, 1);
					// 截取1以后的歌单，这就是我创建的歌单
					this.userPlayList = myList.slice(1);
					this.collectPlayList = collectList;
				}
			});
		},

		// 初始化
		_initIaLize(id) {
			this.getUserPlaylist(id);
		},

		// 切换tabs
		checkTabs(index) {
			if (index === 0) {
				this.current = index;
				this.mode = index;
			} else if (index === 1) {
				this.current = index;
				this.mode = index;
			} else if (index === 2) {
				this.current = index;
				this.mode = index;
			}
		},

		// 返回上一层路由
		toBack() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.user-info {
	width: 100%;
	height: 100%;
	.user-info-header {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}
	.user-info-content {
		width: 100%;
		.user-info-wrap {
			width: 100%;
			display: flex;
			flex-direction: column;
			.user-info-background {
				width: 100%;
				height: 500rpx;
				.image-background {
					width: 100%;
					height: 500rpx;
					width: 100%;
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					z-index: 1;
					opacity: 0.9;
					filter: drop-shadow(0rpx 8rpx 16rpx #111111);
				}
			}
			.user-info-detail {
				position: relative;
				margin-top: 50rpx;
				padding: 0 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.user-avatar {
					flex: 1;
					width: 150rpx;
					height: 150rpx;
				}
				.user-info-list {
					flex: 3;
					display: flex;
					flex-direction: column;
					.user-info-basic {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.user-info-fan {
							display: flex;
							align-items: center;
							flex-direction: column;
							.user-info-fan-num {
							}
						}
						.user-info-focus {
							display: flex;
							align-items: center;
							flex-direction: column;
							.user-info-focus-num {
							}
						}
						.user-info-level {
							display: flex;
							align-items: center;
							flex-direction: column;
							.user-info-level-num {
							}
						}
					}
					.user-info-edit {
						display: flex;
						align-items: center;
						justify-content: center;
						margin-top: 20rpx;
						width: 100%;
						border-radius: 50rpx;
						border: 1px solid #757381;
						padding: 10rpx;
					}
				}
			}
		}
		.user-info-sign {
			padding: 30rpx;
		}
		.user-info-tabs {
			width: 100%;
			.user-tabs-list {
				padding: 10rpx;
			}
			.user-tabs-check {
				width: 100%;
				position: relative;
				.user-info-home-page {
					width: 100%;
					padding: 10rpx 40rpx;
					.basic-information {
						display: flex;
						justify-content: flex-start;
						flex-direction: column;
						padding: 20rpx 40rpx;
						border-radius: 16rpx;
						background-color: #ffffff;
						.basic-information-header {
							font-size: 34rpx;
							font-weight: 500;
							margin-bottom: 20rpx;
						}
						.basic-information-content {
							display: flex;
							justify-content: flex-start;
							flex-direction: column;
							width: 100%;
							.basic-information-village-age {
								margin-bottom: 10rpx;
								.title {
									font-size: 28rpx;
								}
								.desc {
									margin-left: 10rpx;
								}
							}
						}
						.user-info-introduce {
							margin-top: 10rpx;
							.user-info-introduce-title {
								font-size: 34rpx;
								font-weight: 500;
								margin-bottom: 10rpx;
							}
							.user-info-introduce-desc {
								font-size: 28rpx;
							}
						}
					}
					.user-info-musical-taste {
						display: flex;
						justify-content: flex-start;
						flex-direction: column;
						padding: 20rpx 40rpx;
						border-radius: 16rpx;
						background-color: #ffffff;
						margin-top: 30rpx;
						.user-info-musical-header {
							font-size: 34rpx;
							font-weight: 500;
							margin-bottom: 20rpx;
						}
						.user-info-musical-content {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-bottom: 16rpx;
							.image {
								flex: 1;
								width: 100rpx;
								height: 100rpx;
								.image-cover {
									width: 100rpx;
									height: 100rpx;
									border-radius: 16rpx;
								}
							}

							.user-info-musical-info {
								flex: 4;
								width: 100%;
								.music-like {
									margin-bottom: 10rpx;
									font-size: 30rpx;
								}
								.info-text {
									font-size: 24rpx;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
