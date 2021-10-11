<template>
	<view class="play-music-detail">
		<play-list-navbar></play-list-navbar>
		<view class="play-music-wrap">
			<view class="play-musci-header">
				<image class="image-bg" mode="aspectFill" :src="playlistDetail.coverImgUrl" />
				<view class="play-musci-header-content">
					<view class="play-musci-info-left">
						<image
							class="image-cover image-border"
							:src="playlistDetail.coverImgUrl"
							mode="aspectFit"
						></image>
					</view>
					<view class="play-musci-info-right">
						<view class="music-title">{{ playlistDetail.name }}</view>
						<view class="music-username" @click="toUserDetail(creatorInfo.userId)">
							<u-avatar :src="creatorInfo.avatarUrl" size="50"></u-avatar>
							<view class="music-user-name">{{ creatorInfo.nickname }}</view>
						</view>
						<view class="music-detail">{{ playlistDetail.description }}</view>
					</view>
				</view>
				<view class="play-musci-tools">
					<view
						class="play-musci-tools-collect"
						@click="PlaylistSubscribe(playlistDetail.subscribed, playlistDetail.id)"
					>
						<u-icon
							:name="likedIcon"
							custom-prefix="iconfont"
							:color="playlistDetail.subscribed ? '#ff0000' : '#000000'"
							size="48"
						></u-icon>
						<text class="title">{{ playlistDetail.subscribedCount }}</text>
					</view>
					<view class="play-musci-tools-comment" @click="toComment">
						<u-icon
							name="iconfont icon-pinglun"
							custom-prefix="iconfont"
							color="#000000"
							size="48"
						></u-icon>
						<text class="title">{{ playlistDetail.commentCount }}</text>
					</view>
					<view class="play-musci-tools-share">
						<u-icon
							name="iconfont icon-fenxiang1"
							custom-prefix="iconfont"
							color="#000000"
							size="58"
						></u-icon>
						<text class="title">{{ playlistDetail.shareCount }}</text>
					</view>
				</view>
			</view>
			<view class="play-music-content"><play-list-music :songs="songs"></play-list-music></view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-2 5:52:10 ?F10: PM?
 * description
 */

import { mapGetters } from 'vuex';
import { createSong } from '@/utils/song.js';
export default {
	name: 'play-music-detail',
	data() {
		return {
			// 歌单收藏者人数
			s: 20,
			// 歌单详情
			playlistDetail: [],
			// 创作者信息
			creatorInfo: [],
			// 歌曲
			songs: [],
			// 歌单id
			playListId: ''
		};
	},
	component: {},

	computed: {
		...mapGetters('user', ['userInfo', 'loginState']),
		likedIcon() {
			return this.playlistDetail.subscribed
				? 'iconfont icon-shoucangyishoucang-copy-copy'
				: 'iconfont icon-shoucang2';
		}
	},

	watch: {
		$Route(newId, oldId) {
			console.log(newId, oldId);
			let id = this.$route.query.id || this.userInfo.userId || newId;
			if (id) {
				this._initIaLize(id);
			}
		}
	},

	mounted() {
		let id = this.$Route.query.id;
		if (id) {
			this.playListId = id;
			this._initIaLize(id);
		}
	},
	methods: {
		// 收藏
		PlaylistSubscribe(t, id) {
			let params = {
				id
			};
			if (t) {
				params.t = 2;
			} else {
				params.t = 1;
			}
			let title = t ? '取消收藏' : '收藏成功';
			this.$api.playlistSubscribe(params).then(res => {
				if (res.code === this.$code.code_status) {
					uni.showToast({
						title: title,
						icon: 'success'
					});
				}
			});
		},
		// 去评论列表
		toComment() {
			this.$Router.push({
				name: 'Comment',
				params: {
					id: this.playListId
				}
			});
		},

		// 去用户信息
		toUserDetail(id) {
			this.$Router.push({
				name: 'UserInfoDetail',
				params: {
					id: id
				}
			});
		},

		// 获取歌单详情
		getPlaylistDetail(id, s) {
			this.$api.getPlaylistDetail(id, s).then(res => {
				if (res.code === this.$code.code_status) {
					if (res.playlist.description !== null) {
						res.playlist.description = res.playlist.description.replace(/(\r\n|\n\r)/gm, '<br />');
					}
					this.playlistDetail = res.playlist;
					this.creatorInfo = res.playlist.creator;
					// 组装歌曲id
					let trackIds = res.playlist.trackIds;
					// 数量超过一千，进行分割
					let arrLength = 1000;
					let sliceArr = [];
					for (let i = 0; i < trackIds.length; i += arrLength) {
						// 切割数组
						sliceArr.push(trackIds.slice(i, i + arrLength));
					}
					// 传参给该函数
					this.getSongDetail(sliceArr);
				}
			});
		},

		// 获取音乐详情
		async getSongDetail(sliceArr) {
			let before = sliceArr[0];
			let after = sliceArr[1];
			let timestamp = new Date().valueOf();
			let beforeIds = [];
			let afterIds = [];
			if (before) {
				before.map(item => {
					beforeIds.push(item.id);
				});
				// 格式化id，使用逗号依次隔开
				beforeIds = beforeIds.join(',');
			}
			if (after) {
				after.map(item => {
					afterIds.push(item.id);
				});
				afterIds = afterIds.join(',');
			}
			let params = {
				ids: beforeIds,
				timestamp
			};

			let params1 = {
				ids: afterIds,
				timestamp: timestamp + 1
			};
			if (after) {
				let beforeRes = await this.$api.getSongDetail(params);
				let afterRes = await this.$api.getSongDetail({ params: params1 });
				// 数组连接起来
				let res = beforeRes.songs.concat(afterRes.songs);
				this.songs = this._normaLizeSongs(res);
			} else {
				let beforeRes = await this.$api.getSongDetail(params);
				let res = beforeRes.songs;
				this.songs = this._normaLizeSongs(res);
			}
		},

		// 处理歌曲
		_normaLizeSongs(res) {
			let resArr = [];
			res.map(item => {
				resArr.push(createSong(item));
			});
			return resArr;
		},

		// 返回上一个路由
		toBack() {
			uni.navigateBack({
				delta: 1
			});
		},

		// 初始化
		_initIaLize(id) {
			this.getPlaylistDetail(id, this.s);
		}
	}
};
</script>

<style lang="scss" scoped>
.play-music-detail {
	width: 100%;
	height: 100%;
	.play-music-wrap {
		width: 100%;
		.play-musci-header {
			width: 100%;
			height: 400rpx;
			padding: 30rpx;
			.image-bg {
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				opacity: 0.3;
				filter: blur(110rpx) drop-shadow(0rpx 8rpx 16rpx #111111);
			}

			.play-musci-header-content {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-top: 10rpx;
				.play-musci-info-left {
					width: 280rpx;
					height: 280rpx;
					flex: 1;
					.image-cover {
						width: 240rpx;
						height: 240rpx;
						position: relative;
					}
				}
				.play-musci-info-right {
					flex: 2;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 20rpx;
					width: 0;
					.music-title {
						font-size: 32rpx;
						margin-bottom: 30rpx;
					}
					.music-username {
						margin-bottom: 30rpx;
						display: flex;
						align-items: center;
						.music-user-name {
							font-size: 30rpx;
							color: #21327f;
							margin-left: 28rpx;
						}
					}
					.music-detail {
						font-size: 24rpx;
						margin-bottom: 30rpx;
						flex-wrap: nowrap;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						word-break: break-all;
					}
				}
			}
			.play-musci-tools {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 60rpx;
				.play-musci-tools-collect {
					display: flex;
					align-items: center;
					.title {
						margin-left: 10rpx;
						text-align: center;
						font-size: 26rpx;
						color: #000000;
					}
				}
				.play-musci-tools-comment {
					display: flex;
					align-items: center;
					.title {
						margin-left: 10rpx;
						text-align: center;
						font-size: 26rpx;
						color: #000000;
					}
				}
				.play-musci-tools-share {
					display: flex;
					align-items: center;
					.title {
						margin-left: 10rpx;
						text-align: center;
						font-size: 26rpx;
						color: #000000;
					}
				}
			}
		}
		.play-music-content {
		}
	}
}
</style>
