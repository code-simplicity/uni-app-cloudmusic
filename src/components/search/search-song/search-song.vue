<template>
	<view class="search-song">
		<u-cell-group :border="false" class="search-cell-group" v-if="songs && songs.length > 0">
			<view class="play-list-header">
				<view class="play-list-play-left">
					<view class="play-list-left-circle">
						<u-icon name="play-circle-fill" color="#ff0000" size="50"></u-icon>
					</view>
					<view class="play-list-left-all">
						播放全部
						<text>({{ songs.length }})</text>
					</view>
				</view>
				<view class="play-list-play-right">
					<view class="play-list-right-download">
						<u-icon name="download" color="#7b777c" size="40"></u-icon>
					</view>
					<view class="play-list-right-checkmark">
						<u-icon name="checkmark-circle" color="#7b777c" size="40"></u-icon>
					</view>
				</view>
			</view>
			<u-cell-item
				:arrow="false"
				v-for="(item, index) in songs"
				:key="index"
				@click="playMusci(item, index)"
				class="u-cell"
			>
				<view slot="icon" class="slot-icon">
					<view class="index">{{ utils.formatZero(index + 1, 2) }}</view>
					<image class="image-cover image-border" :src="item.image" mode="aspectFit"></image>
				</view>
				<view slot="title" class="slot-title">
					<view class="singer-name">{{ utils.strslice(item.name) }}</view>
					<view class="singer-num">
						<text class="singer">{{ item.singer }}</text>
						<text class="album">{{ item.album }}</text>
					</view>
				</view>
				<view slot="right-icon" class="slot-right">
					<u-icon
						v-if="item.mv"
						class="video"
						custom-prefix="iconfont"
						name="iconfont icon-shipin"
						size="40"
					></u-icon>
					<u-icon class="tools" name="more-dot-fill" size="40"></u-icon>
				</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-6 8:55:05 ?F10: PM?
 * description 单曲搜索
 */
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { createSong } from '@/utils/song.js';
export default {
	name: 'search-song',
	data() {
		return {
			// 单曲
			songs: [],
			// 搜索类型为 1:单曲
			searchType: 1
		};
	},
	computed: {
		...mapGetters('player', ['currentIndex', 'currentSong', 'playing'])
	},

	component: {},
	mounted() {},
	methods: {
		// 播放音乐
		playMusci(item, index) {
			this.$Router.push({
				name: 'Player',
				params: {
					newSong: this.songs,
					index: index
				}
			});
		},

		// 单曲搜索
		getSearchSongs(keyword) {
			// 调用搜索接口
			let params = {
				keywords: keyword,
				type: this.searchType
			};
			this.$api.getSearch(params).then(res => {
				if (res.code === this.$code.code_status) {
					let list = res.result.songs;
					let sliceArr = [];
					list.map(item => {
						sliceArr.push(item.id);
					});
					this.getSongDetail(sliceArr);
				}
			});
		},

		// 将搜索结果的单曲id赋值给获取歌曲id的接口，
		getSongDetail(sliceArr) {
			let timestamp = new Date().valueOf();
			// 将歌曲以逗号隔开
			let ids = sliceArr.join(',');
			let params = {
				ids,
				timestamp
			};
			this.$api.getSongDetail(params).then(res => {
				this.songs = this._normalizeSongs(res.songs);
			});
		},

		// 处理歌曲
		_normalizeSongs(list) {
			let res = [];
			list.map(item => {
				if (item.id) {
					res.push(createSong(item));
				}
			});
			return res;
		},

		...mapActions('player', ['selectPlay', 'pausePlay', 'playAll']),

		// 响应状态
		...mapMutations('player', {
			setPlayingState: 'PLAYING_STATE',
			setCurrentIndex: 'CURRENT_INDEX',
			setPlayMode: 'PLAY_MODE',
			setPlayList: 'PLAY_LIST'
		})
	}
};
</script>

<style lang="scss" scoped>
.search-song {
	width: 100%;
	.search-cell-group {
		width: auto;
		padding: 16rpx 10rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		.play-list-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: row;
			margin: 10rpx 14rpx;
			.play-list-play-left {
				display: flex;
				align-items: center;
				.play-list-left-circle {
					margin-right: 40rpx;
				}
				.play-list-left-all {
					font-size: 32rpx;
					text {
						margin-left: 16rpx;
						font-size: 20rpx;
						text-align: center;
					}
				}
			}
			.play-list-play-right {
				display: flex;
				.play-list-right-checkmark {
					margin-left: 30rpx;
				}
			}
		}
		.u-cell {
			padding: 18rpx 16rpx;
			.slot-icon {
				display: flex;
				align-items: center;
				.index {
					font-size: 32rpx;
					margin: 0 19rpx;
					text-align: center;
				}

				.image-cover {
					width: 90rpx;
					height: 90rpx;
					margin: 0 20rpx;
				}
			}
			.slot-title {
				.singer-num {
					font-size: 22rpx;
					.singer {
						color: #2019ff;
					}
					.album {
						margin-left: 16rpx;
					}
				}
			}
			.slot-right {
				.tools {
					transform: rotate(90deg);
				}
			}
		}
	}
}
</style>
