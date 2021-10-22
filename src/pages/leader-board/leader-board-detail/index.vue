<template>
	<view class="leader-board-detail">
		<play-list-navbar></play-list-navbar>
		<view class="leader-board-detail-wrap">
			<u-image
				class="image-bg"
				width="100%"
				height="400rpx"
				:src="playlistDetail.coverImgUrl"
				mode="aspectFill"
			></u-image>
			<view class="header">
				<view class="tools">
					<view
						class="tools-collect"
						@click="PlaylistSubscribe(playlistDetail.subscribed, playlistDetail.id)"
					>
						<u-icon
							:name="likedIcon"
							custom-prefix="iconfont"
							:color="playlistDetail.subscribed ? '#ff0000' : '#ffffff'"
							size="48"
						></u-icon>
						<text class="title">{{ utils.tranNumber(playlistDetail.subscribedCount, 1) }}</text>
					</view>
					<view class="tools-comment" @click="toComment">
						<u-icon
							name="iconfont icon-pinglun"
							custom-prefix="iconfont"
							color="#ffffff"
							size="48"
						></u-icon>
						<text class="title">{{ utils.tranNumber(playlistDetail.commentCount, 1) }}</text>
					</view>
					<view class="tools-share">
						<u-icon
							name="iconfont icon-fenxiang1"
							custom-prefix="iconfont"
							color="#ffffff"
							size="58"
						></u-icon>
						<text class="title">{{ utils.tranNumber(playlistDetail.shareCount, 1) }}</text>
					</view>
				</view>
			</view>
			<view class="content"><play-list-music :songs="songs"></play-list-music></view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-22 2:42:38 ?F10: PM?
 * description 榜单详情
 */
import { mapGetters } from 'vuex';
import { createSong } from '@/utils/song.js';

export default {
	name: 'leader-board-detail',
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

	component: {},
	mounted() {
		let id = this.$Route.query.id;
		if (id) {
			this.playListId = id;
			this._initIaLize(id);
		}
	},
	methods: {
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

		_initIaLize(id) {
			this.getPlaylistDetail(id, this.s);
		}
	}
};
</script>

<style lang="scss" scoped>
.leader-board-detail {
	width: 100%;
	.leader-board-detail-wrap {
		width: 100%;
		position: relative;
		.image-bg {
			position: absolute;
			top: 0;
			left: 0;
			filter: brightness(70%) opacity(1);
		}
		.header {
			width: 100%;
			height: 400rpx;
			padding: 30rpx;
			.tools {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 60rpx;
				margin-top: 300rpx;
				.tools-collect {
					display: flex;
					align-items: center;
					z-index: 1;
					.title {
						margin-left: 10rpx;
						text-align: center;
						font-size: 26rpx;
						color: #ffffff;
					}
				}
				.tools-comment {
					display: flex;
					align-items: center;
					z-index: 1;
					.title {
						margin-left: 10rpx;
						text-align: center;
						font-size: 26rpx;
						color: #ffffff;
					}
				}
				.tools-share {
					display: flex;
					align-items: center;
					z-index: 1;
					.title {
						margin-left: 10rpx;
						text-align: center;
						font-size: 26rpx;
						color: #ffffff;
					}
				}
			}
		}
		.content {
		}
	}
}
</style>
