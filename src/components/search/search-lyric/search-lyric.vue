<template>
	<view class="search-lyric">
		<!-- 		<u-cell-group class="search-cell-group" :border="false" v-if="lyric && lyric.length > 0">
			<u-cell-item class="u-cell" :arrow="false" v-for="(item, index) in lyric" :key="index">
				<view slot="title" class="slot-title">
					<view class="singer-name">{{ utils.strslice(item.name) }}</view>
					<view class="singer-num">
						<text class="singer">{{ item.artists[0].name }}</text>
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
				<u-read-more class="read-more" :toggle="true">
					<rich-text :nodes="item.lyrics.txt"></rich-text>
				</u-read-more>
			</u-cell-item>
		</u-cell-group> -->
		<view class="search-lyric-box" v-for="(item, index) in lyric" :key="index">
			<view class="search-lyric-song">
				<view class="search-lyric-song-left">
					<view class="singer-name">{{ utils.strslice(item.name) }}</view>
					<view class="singer-num">
						<text class="singer">{{ item.artists[0].name }}</text>
					</view>
				</view>
				<view class="search-lyric-song-right">
					<u-icon class="video" custom-prefix="iconfont" name="iconfont icon-shipin" size="40"></u-icon>
					<u-icon class="tools" name="more-dot-fill" size="40"></u-icon>
				</view>
			</view>
			<view class="read-more-lyric">
				<u-read-more
					text-indent="0"
					close-text="展开歌词"
					font-size="22"
					color="#111111"
					show-height="100"
					class="read-more"
					:toggle="true"
					:shadow-style="shadowStyle"
				>
					<rich-text class="rich-text" :nodes="item.lyrics.txt"></rich-text>
				</u-read-more>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-6 8:58:37 ?F10: PM?
 * description 歌词搜索
 */
import { createSong } from '@/utils/song.js';
export default {
	name: 'search-lyric',
	data() {
		return {
			// 歌词
			lyric: [],
			// 搜索类型为 1006: 歌词
			searchType: 1006,
			// 歌曲信息
			songs: [],
			shadowStyle: {
				backgroundImage: 'none',
				paddingTop: '0',
				marginTop: '20rpx'
			}
		};
	},
	component: {},
	mounted() {},
	methods: {
		// 通过歌词搜索接口获取到id，将歌曲id查找到歌曲信息
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

		// 歌词搜索
		getSearchLyric(keyword) {
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
					// 装载id
					this.getSongDetail(sliceArr);
					this.lyric = res.result.songs;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.search-lyric {
	width: 100%;
	height: 100%;
	background-color: #ffffff;
	.search-lyric-box {
		display: flex;
		flex-direction: column;
		padding: 10rpx 20rpx;
		width: 100%;
		background-color: #ffffff;
		border-bottom: 1px solid #ababab;
		.search-lyric-song {
			display: flex;
			justify-content: space-between;
			.search-lyric-song-left {
				.singer-name {
					font-size: 32rpx;
					margin-bottom: 10rpx;
					color: #ff8447;
				}
				.singer-num {
					font-size: 22rpx;
					margin-bottom: 10rpx;
					.singer {
						color: #2019ff;
					}
					.album {
						margin-left: 16rpx;
					}
				}
			}
			.search-lyric-song-right {
				.video {
					margin-right: 20rpx;
				}
				.tools {
					transform: rotate(90deg);
				}
			}
		}
		.read-more-lyric {
			.rich-text {
				margin-top: 40rpx;
				font-size: 16rpx;
			}
		}
	}
}
</style>
