<template>
	<view class="search-singer">
		<u-cell-group class="search-cell-group" :border="false" v-if="singer && singer.length > 0">
			<u-cell-item class="u-cell" :arrow="false" v-for="(item, index) in singer" :key="index">
				<view slot="icon" class="singer-image">
					<u-image
						shape="circle"
						width="100rpx"
						height="100rpx"
						:src="item.img1v1Url"
						mode="aspectFill"
					></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name box-line1">{{ item.name }} {{ item.alias[0] }}</view>
					<view class="singer-num box-line1">
						<text>专辑：{{ item.albumSize }}首</text>
					</view>
				</view>
				<view slot="right-icon">
					<u-icon
						class="focus"
						name="plus"
						size="30"
						label="关注"
						label-size="26"
						color="#ff0000"
						label-color="#ff0000"
					></u-icon>
				</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-6 8:57:49 ?F10: PM?
 * description 歌手搜索
 */

export default {
	name: 'search-singer',
	data() {
		return {
			// 歌手
			singer: [],
			// 搜索类型为 100: 歌手
			searchType: 100
		};
	},
	component: {},
	mounted() {},
	methods: {
		// 歌单搜索
		getSearchArtist(keyword) {
			// 调用搜索接口
			let params = {
				keywords: keyword,
				type: this.searchType
			};
			this.$api.getSearch(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.singer = res.result.artists;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.search-singer {
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
		.focus {
			border: 1rpx solid #c7c7c7;
			padding: 6rpx 16rpx;
			border-radius: 16rpx;
			&:active {
				background-color: #e0dee1;
			}
		}
		.u-cell {
			padding: 18rpx 16rpx;
		}
	}
}
</style>
