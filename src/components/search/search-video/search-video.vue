<template>
	<view class="search-video">
		<u-cell-group class="search-cell-group" :border="false" v-if="video && video.length > 0">
			<u-cell-item class="u-cell" :arrow="false" v-for="(item, index) in video" :key="index">
				<view slot="icon" class="singer-image">
					<u-image
						border-radius="16rpx"
						width="240rpx"
						height="140rpx"
						:src="item.coverUrl"
						mode="aspectFill"
					></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name box-line1">{{ item.title }}</view>
					<view class="singer-num box-line1">
						<text>来自：{{ item.creator[0].userName }}</text>
					</view>
				</view>
				<view slot="right-icon" class="slot-right">
					<u-icon class="tools" name="more-dot-fill" size="40"></u-icon>
				</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-6 8:56:56 ?F10: PM?
 * description   视频搜索
 */

export default {
	name: 'search-video',
	data() {
		return {
			// 歌手
			video: [],
			// 搜索类型为 1014: 视频
			searchType: 1014
		};
	},
	component: {},
	mounted() {},
	methods: {
		// 歌单搜索
		getSearchVideo(keyword) {
			// 调用搜索接口
			let params = {
				keywords: keyword,
				type: this.searchType
			};
			this.$api.getSearch(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.video = res.result.videos;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.search-video {
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
		.slot-right {
			.tools {
				transform: rotate(90deg);
			}
		}

		.u-cell {
			padding: 18rpx 16rpx;
		}
	}
}
</style>
