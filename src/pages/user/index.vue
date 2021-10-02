<template>
	<view class="user-info">
		<view class="user-info-wrap">
			<view class="user-info-header">
				<view class="user-info-absolute">
					<view class="user-info-tool"><u-icon name="grid-fill" size="50" color="#000000"></u-icon></view>
					<view class="user-info-search"><u-icon name="mic" size="50" color="#000000"></u-icon></view>
				</view>
			</view>
			<view class="user-info-content">
				<view class="user-info-detail">
					<view class="user-info-avatar">
						<u-avatar sex-icon="man" size="100" :src="userInfo.avatarUrl"></u-avatar>
					</view>
					<view class="user-info-username">
						<view class="user-info-name">{{ userInfo.nickname }}</view>
						<view class="user-info-level">
							<view class="user-info-vip">vip1</view>
							<view class="user-info-level-num">{{ userInfo.level }}</view>
						</view>
					</view>
					<view class="user-info-to-detail">
						<u-icon name="arrow-right" color="#2979ff" size="28"></u-icon>
					</view>
				</view>
				<view class="user-info-wrap-tools">
					<view class="user-info-wrap-num"><recommend-day></recommend-day></view>
				</view>
				<view class="user-info-like">
					<view class="user-info-liked" v-for="(item, index) in likeMusic" @click="toPlayDetail(item.id)">
						<image class="image-cover image-border" :src="item.coverImgUrl" mode="aspectFit"></image>
						<view class="user-info-like-content">
							<view class="user-info-like-title">我喜欢的音乐</view>
							<view class="user-info-like-num">{{ item.trackCount }}</view>
						</view>
					</view>
				</view>
				<view class="user-info-song-list">
					<user-play-list :songList="userPlayList" :header="myPlayTxt"></user-play-list>
				</view>
				<view class="user-info-favorite-list">
					<user-play-list :songList="collectPlayList" :header="collectPlayTxt"></user-play-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-23 9:52:09 ?F10: PM?
 * description
 */
import { mapGetters } from 'vuex';
import { createSong } from '@/utils/song.js';
export default {
	name: 'User',
	data() {
		return {
			// 我喜欢的音乐
			likeMusic: [],
			// 用户创建的歌单
			userPlayList: [],
			// 用户收藏的歌单
			collectPlayList: [],
			// 我创建的歌单
			myPlayTxt: '我创建的歌单',
			// 我收藏的歌单
			collectPlayTxt: '我收藏的歌单'
			// 我喜欢的歌曲id
		};
	},
	computed: {
		...mapGetters('user', ['userInfo', 'loginState'])

		// likeMusic() {
		// 	return this.userPlayList.slice(0, 1);
		// }
	},

	watch: {
		$Route(newId, oldId) {
			console.log(newId, oldId);
			let id = this.userInfo.userId;
			if (id) {
				this._initIaLize(id);
			}
		}
	},

	component: {},
	mounted() {
		let id = this.userInfo.userId;
		if (id) {
			this._initIaLize(id);
		}
	},
	methods: {
		// 去详情界面
		toPlayDetail(id) {
			this.$Router.push({
				name: 'PlayDetail',
				params: {
					id: id
				}
			});
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

		// 获取喜欢的音乐ids
		// async getLikeList(uid) {
		// 	let res = await this.$api.getLikeList(uid);
		// 	if (res.code === this.$code.code_status) {
		// 		// 歌曲id组装成数组
		// 		let arrIds = res.ids;
		// 		this.getSongDetail(arrIds);
		// 	}
		// },

		// 获取歌曲
		// getSongDetail(arrIds) {
		// 	arrIds = arrIds.join(',');
		// 	let params = {
		// 		ids: arrIds
		// 	};
		// 	this.$api.getSongDetail(params).then(res => {
		// 		if (res.code === this.$code.code_status) {
		// 			this.likeMusic = this.formatSongs(res.songs);
		// 			this.likeImage = this.likeMusic[0].image;
		// 		}
		// 	});
		// },

		// 处理歌曲
		// formatSongs(list) {
		// 	let arr = [];
		// 	list.map(item => {
		// 		if (item.id) {
		// 			arr.push(createSong(item));
		// 		}
		// 	});
		// 	return arr;
		// },

		// 初始化
		_initIaLize(id) {
			// this.getLikeList(id);
			this.getUserPlaylist(id);
		}
	}
};
</script>

<style lang="scss" scoped>
.user-info {
	width: 100%;
	height: 100%;
	.user-info-wrap {
		width: 100%;
		height: 100%;
		padding: 0 26rpx;
		.user-info-header {
			width: 100%;
			position: fixed;
			padding: 10rpx 20rpx;
			height: 80rpx;
			line-height: 80rpx;
			top: 0;
			left: 0;
			right: 0;
			z-index: 666;
			background-color: #eaeaea;
			.user-info-absolute {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
		.user-info-content {
			width: 100%;
			margin-top: 120rpx;
			.user-info-detail {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				.user-info-avatar {
					flex: 1;
				}
				.user-info-username {
					flex: 4;
					.user-info-name {
						font-size: 38rpx;
						margin-bottom: 16rpx;
					}
					.user-info-level {
						display: flex;
						align-items: center;
						.user-info-vip {
							font-size: 30rpx;
						}
						.user-info-level-num {
							margin-left: 30rpx;
							font-size: 30rpx;
						}
					}
				}
				.user-info-to-detail {
				}
			}
			.user-info-wrap-tools {
				width: 100%;
				margin-top: 26rpx;
				background-color: #ffffff;
				border-radius: 16rpx;
			}
			.user-info-like {
				margin-top: 26rpx;
				background-color: #ffffff;
				border-radius: 16rpx;
				padding: 20rpx;
				.user-info-liked {
					width: 100%;
					display: flex;
					align-items: center;
					.image-cover {
						flex: 1;
						width: 100rpx;
						height: 100rpx;
						border-radius: 16rpx;
					}
					.user-info-like-content {
						flex: 5;
						margin-left: 20rpx;
					}
				}
			}
			.user-info-song-list {
				background-color: #ffffff;
				border-radius: 16rpx;
				margin-top: 26rpx;
				padding: 20rpx;
				width: 100%;
			}
			.user-info-favorite-list {
				background-color: #ffffff;
				border-radius: 16rpx;
				margin-top: 26rpx;
				padding: 20rpx;
				width: 100%;
			}
		}
	}
}
</style>
