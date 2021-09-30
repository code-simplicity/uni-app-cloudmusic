<template>
	<view class="board-new-song">
		<view class="board-new-header"><text>新歌榜</text></view>
		<view class="board-new-content">
			<view
				class="board-new-warp"
				v-for="(item, index) of hotSong"
				:class="index === currentIndex && currentSong.id == item.id && playing ? 'playing' : ''"
			>
				<view class="board-new-image">
					<view class="board-new-cover">
						<image class="image-cover" :src="item.image" mode="aspectFit" lazy-load="true"></image>
					</view>
					<u-icon
						class="play-btn"
						custom-prefix="iconfont"
						name="iconfont icon-bofang1"
						@click="playMusci(item, index)"
					></u-icon>
					<u-icon
						class="pause-btn"
						custom-prefix="iconfont"
						name="iconfont icon-zanting1"
						@click="pauseMusci"
					></u-icon>
				</view>

				<view class="board-new-index">{{ index + 1 }}</view>
				<view class="board-new-info">
					<view class="song-name">{{ item.name }}</view>
					<view>--</view>
					<view class="singer-name">{{ item.singer }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-30 6:29:14 ?F10: PM?
 * description 新歌榜
 */

import { createSong } from '@/utils/song.js';

import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'board-new-song',
	data() {
		return {
			// 榜单id
			topId: '',
			// 收藏该榜单的人
			s: 8,
			// 歌曲
			songs: []
		};
	},

	computed: {
		// 截断数据
		hotSong() {
			return this.songs.slice(0, 3);
		},
		...mapGetters('player', ['currentIndex', 'currentSong', 'playing'])
	},

	component: {},
	mounted() {
		this.getTopListDetail();
	},
	methods: {
		// 播放音乐
		playMusci(item, index) {
			this.selectPlay({
				list: this.hotSong,
				index
			});
		},

		// 暂停音乐
		pauseMusci() {
			this.pausePlay();
		},

		// 获取新歌榜单的id
		getTopListDetail() {
			this.$api.getTopListDetail().then(res => {
				if (res.code === this.$code.code_status) {
					this.topId = res.list[1].id;
					this.getPlayListDetail(this.topId);
				}
			});
		},

		// 获取歌单详情
		getPlayListDetail(id) {
			let timestamp = new Date().valueOf();
			let params = {
				id,
				s: this.s,
				timestamp
			};
			this.$api.getPlayListDetail(params).then(res => {
				if (res.code === this.$code.code_status) {
					// 封装歌曲id
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

		// 获取歌曲详情
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
			const params = {
				ids: beforeIds,
				timestamp: timestamp
			};
			const params1 = {
				ids: afterIds,
				timestamp: timestamp + 1
			};
			try {
				if (after) {
					let beforeRes = await this.$api.getSongDetail(params);
					let afterRes = await this.$api.getSongDetail({ params: params1 });
					// 数组连接起来
					let res = beforeRes.songs.concat(afterRes.songs);
					this.songs = this._normaLizeSongs(res);
					console.log('this.songs', this.songs);
				} else {
					let beforeRes = await this.$api.getSongDetail(params);
					let res = beforeRes.songs;
					this.songs = this._normaLizeSongs(res);
				}
			} catch (error) {
				console.log(error);
			}
		},

		// 处理歌曲
		_normaLizeSongs(list) {
			let resArr = [];
			list.map(item => {
				resArr.push(createSong(item));
			});
			return resArr;
		},

		// 响应状态
		...mapActions('player', ['selectPlay', 'pausePlay', 'playAll'])
	}
};
</script>

<style lang="scss" scoped>
.board-new-song {
	background-color: #ffffff;
	border-radius: 16rpx;
	.board-new-header {
		text-align: center;
		margin-bottom: 10rpx;
		font-size: 30rpx;
	}
	.board-new-content {
		width: 100%;
		.board-new-warp {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: row;
			.board-new-image {
				width: 100rpx;
				height: 100rpx;
				flex: 1;
				.board-new-cover {
					.image-cover {
						width: 80rpx;
						height: 80rpx;
						position: absolute;
					}
				}
			}
			.play-btn {
				cursor: pointer;
				position: relative;
				align-items: center;
				font-size: 64rpx;
				color: #ffffff;
			}
			.pause-btn {
				font-size: 64rpx;
				display: none;
				cursor: pointer;
				position: relative;
				text-align: center;
				color: #ffffff;
			}
			.board-new-index {
				margin-left: 16rpx;
				flex: 1;
			}
			.board-new-info {
				flex: 6;
				display: flex;
				flex-wrap: nowrap;
				flex-direction: row;
				align-items: center;
				text-overflow: ellipsis;
				overflow: hidden;
				.song-name {
					font-size: 30rpx;
				}
				.singer-name {
					font-size: 26rpx;
				}
			}
			&.playing {
				.board-new-image {
					.play-btn {
						display: none;
					}
					.pause-btn {
						display: none;
					}
				}
			}
			&:hover {
				.board-new-image {
					.play-btn {
						display: block;
					}
				}
				&.playing {
					.board-new-image {
						.play-btn {
							display: none;
						}
						.play-icon {
							display: none;
						}
						.pause-btn {
							display: block;
						}
					}
				}
			}
		}
	}
}
</style>
