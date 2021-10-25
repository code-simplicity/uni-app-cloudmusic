<template>
	<view class="search-play-list">
		<u-cell-group class="search-cell-group" :border="false" v-if="playList && playList.length > 0">
			<u-cell-item class="u-cell" :arrow="false" v-for="(item, index) in playList" :key="index">
				<view slot="icon" class="singer-image">
					<u-image
						border-radius="16"
						width="100rpx"
						height="100rpx"
						:src="item.coverImgUrl"
						mode="aspectFill"
					></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name box-line1">{{ item.name }}</view>
					<view class="singer-num box-line1">
						<text>{{ item.trackCount }}首</text>
						<text>, by. {{ item.creator.nickname }}</text>
						<text>播放：{{ utils.tranNumber(item.playCount, 1) }}次</text>
					</view>
				</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-6 8:56:13 ?F10: PM?
 * description 歌单搜索
 */

export default {
	name: 'search-play-list',
	data() {
		return {
			// 歌单
			playList: [],
			// 搜索类型为 1000: 歌单
			searchType: 1000
		};
	},
	component: {},
	mounted() {},
	methods: {
		// 歌单搜索
		getSearchPlayList(keyword) {
			// 调用搜索接口
			let params = {
				keywords: keyword,
				type: this.searchType
			};
			this.$api.getSearch(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.playList = res.result.playlists;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.search-play-list {
	width: 100%;
	height: 100%;
	.search-cell-group {
		width: auto;
		padding: 10rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		.singer-image {
			margin-right: 20rpx;
		}
		.singer-title {
			.singer-name {
				font-size: 28rpx;
			}
			.singer-num {
				font-size: 22rpx;
				color: #999;
			}
		}

		.u-cell {
			padding: 18rpx 16rpx;
		}
	}
}
</style>
