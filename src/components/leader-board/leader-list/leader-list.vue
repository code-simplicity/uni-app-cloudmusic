<template>
	<view class="leader-list" :style="{ backgroundColor: backgroundColor[indexs].backgroundColor }">
		<view class="leader-list-wrap" @click="toLeaderBoardDetail(leaderList.id)">
			<view class="list-container">
				<view class="list-update-info">{{ leaderList.updateFrequency }}</view>
				<view class="left">
					<view class="left-top" :style="{ color: color[indexs].color }">{{ leaderList.name }}</view>
					<view class="left-bottom">
						<u-image
							border-radius="16"
							width="140"
							height="140"
							mode="aspectFill"
							:src="songs[0].image"
						></u-image>
						<u-icon
							class="play-btn"
							custom-prefix="iconfont"
							name="iconfont icon-bofang1"
							size="70"
							color="#efefef"
						></u-icon>
					</view>
				</view>
				<view class="right">
					<u-cell-group :border="false">
						<u-cell-item
							:bg-color="backgroundColor[indexs].backgroundColor"
							:border-bottom="false"
							:border-top="false"
							:arrow="false"
							v-for="(item, index) in songs"
							:key="index"
							class="u-cell"
						>
							<view slot="icon" class="slot-icon">
								<text>{{ index + 1 }}.</text>
							</view>
							<view slot="title" class="slot-title">
								<text class="name">{{ item.name }} -</text>
								<text class="singer">{{ item.singer }}</text>
							</view>
							<view slot="right-icon" class="right-icon">new</view>
						</u-cell-item>
					</u-cell-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-22 4:35:14 ?F10: PM?
 * description 官方榜单列表
 */
import { createSong } from '@/utils/song.js';
export default {
	name: 'leader-list',
	data() {
		return {
			// 歌曲
			songs: [],
			// 收藏该榜单的人
			s: 8,
			// 背景颜色
			backgroundColor: [
				{
					backgroundColor: '#cae1e1'
				},
				{
					backgroundColor: '#e7e8db'
				},
				{
					backgroundColor: '#e8e1db'
				},
				{
					backgroundColor: '#f5e7ff'
				}
			],
			// 字体颜色
			color: [
				{
					color: '#b61699'
				},
				{
					color: '#459029'
				},
				{
					color: '#162aac'
				},
				{
					color: '#b51d1d'
				}
			]
		};
	},
	props: {
		leaderList: {
			type: Object
		},
		// index
		indexs: {
			type: Number
		}
	},

	component: {},
	mounted() {
		this.getPlayListDetail();
	},
	methods: {
		// 去歌单详情列表
		toLeaderBoardDetail(id) {
			this.$Router.push({
				name: 'LeaderBoardDetail',
				params: {
					id
				}
			});
		},

		// 获取歌单详情
		getPlayListDetail() {
			let timestamp = new Date().valueOf();
			let params = {
				id: this.leaderList.id,
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
					let songs = this._normaLizeSongs(res);
					this.songs = songs.slice(0, 3);
				} else {
					let beforeRes = await this.$api.getSongDetail(params);
					let res = beforeRes.songs;
					let songs = this._normaLizeSongs(res);
					this.songs = songs.slice(0, 3);
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
		}
	}
};
</script>

<style lang="scss" scoped>
.leader-list {
	border-radius: 26rpx;
	margin: 20rpx 30rpx;
	background-color: #ffffff;
	.leader-list-wrap {
		width: 100%;
		.list-container {
			display: flex;
			align-items: center;
			width: 100%;
			position: relative;
			padding: 30rpx;
			.list-update-info {
				position: absolute;
				top: 10rpx;
				right: 30rpx;
				font-size: 22rpx;
				color: #767676;
			}
			.left {
				display: flex;
				flex-direction: column;
				margin-right: 40rpx;
				.left-top {
					font-size: 36rpx;
					margin-bottom: 16rpx;
					font-weight: 700;
				}
				.left-bottom {
					position: relative;
					.play-btn {
						top: 0;
						bottom: 0;
						left: 25%;
						cursor: pointer;
						position: absolute;
					}
				}
			}
			.right {
				flex: 1;
				.u-cell {
					padding: 6rpx;
					.slot-icon {
						margin-right: 12rpx;
					}
					.slot-title {
						-webkit-line-clamp: 1;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						text-overflow: ellipsis;
						overflow: hidden;
						.name {
							font-size: 28rpx;
							margin: 16rpx 6rpx;
						}
						.singer {
							font-size: 24rpx;
							font-weight: 400;
							color: #999999;
						}
					}
					.right-icon {
						font-size: 28rpx;
						color: #7d9fe6;
						font-weight: 500;
						font-family: 华文楷体;
					}
				}
			}
		}
	}
}
</style>
