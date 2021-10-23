<template>
	<view class="board-list">
		<view class="header" @click="toLeaderBoardDetail(boardList.id)">
			{{ boardList.name }}
			<u-icon name="arrow-right"></u-icon>
		</view>
		<u-cell-group :border="false">
			<u-cell-item
				:arrow="false"
				v-for="(item, index) in hotSong"
				:key="index"
				class="u-cell"
				:class="index === currentIndex && currentSong.id === item.id && playing ? 'playing' : ''"
				@click="playMusci(item, index)"
			>
				<view slot="icon" class="slot-icon">
					<u-image width="80" height="80" border-radius="1" :src="item.image" mode="aspectFit"></u-image>
					<u-icon
						class="play-btn"
						custom-prefix="iconfont"
						name="iconfont icon-bofang1"
						size="62"
						color="#ffffff"
						@click="playMusci(item, index)"
					></u-icon>
					<u-icon
						class="pause-btn"
						custom-prefix="iconfont"
						name="iconfont icon-zanting1"
						size="62"
						color="#ffffff"
						@click="pauseMusci"
					></u-icon>
				</view>
				<view slot="title" class="slot-title">
					<text>{{ index + 1 }}</text>
					<text class="center-text">{{ item.name }} -</text>
					<text class="left-text">{{ item.singer }}</text>
				</view>
				<view slot="right-icon" class="right-icon">new</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-22 12:59:45 ?F10: PM?
 * description
 */
import { createSong } from '@/utils/song.js';

import { mapGetters, mapActions } from 'vuex';
export default {
	name: 'board-list',
	data() {
		return {
			// 榜单id
			topId: '',
			// 收藏该榜单的人
			s: 8,
			songs: []
		};
	},
	props: {
		// 榜单列表
		boardList: {
			type: Object
		}
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
		this.getPlayListDetail();
	},
	methods: {
		// 去排行榜页面
		toLeaderBoardDetail(id) {
			this.$Router.push({
				name: 'LeaderBoardDetail',
				params: {
					id
				}
			});
		},

		// 播放音乐
		playMusci(item, index) {
			this.selectPlay({
				list: this.songs,
				index
			});
		},

		// 暂停音乐
		pauseMusci() {
			this.pausePlay();
			this.$audio_player.pause();
		},

		// 获取歌单详情
		getPlayListDetail() {
			let timestamp = new Date().valueOf();
			let params = {
				id: this.boardList.id,
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
.board-list {
	width: 100%;
	padding: 10rpx;
	.header {
		text-align: center;
		font-size: 30rpx;
		margin-bottom: 10rpx;
	}
	.u-cell {
		padding: 16rpx;
		.slot-icon {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: row;
			margin-right: 16rpx;
			.play-btn {
				margin: 10rpx 10rpx;
				cursor: pointer;
				position: absolute;
				align-items: center;
			}
			.pause-btn {
				margin: 10rpx 10rpx;
				display: none;
				cursor: pointer;
				position: absolute;
				text-align: center;
			}
		}
		&.playing {
			.slot-icon {
				.play-btn {
					display: none;
				}
				.pause-btn {
					display: block;
				}
			}
		}
		.slot-title {
			-webkit-line-clamp: 1; // 用来限制在一个块元素显示的文本的行数
			display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
			-webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
			text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
			overflow: hidden;
			.center-text {
				margin-left: 16rpx;
				font-size: 26rpx;
			}
			.left-text {
				font-size: 22rpx;
				margin-left: 6rpx;
			}
		}
		.right-icon {
			font-size: 26rpx;
			color: #0e12ff;
			font-family: 华文楷体;
		}
	}
}
</style>
