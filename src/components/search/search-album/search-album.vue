<template>
	<view class="search-album">
		<u-cell-group class="search-cell-group" :border="false" v-if="album && album.length > 0">
			<u-cell-item class="u-cell" :arrow="false" v-for="(item, index) in album" :key="index">
				<view slot="icon" class="singer-image">
					<u-image
						border-radius="16"
						width="100rpx"
						height="100rpx"
						:src="item.picUrl"
						mode="aspectFill"
					></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name box-line1">{{ item.name }}</view>
					<view class="singer-num box-line1">
						<text>{{ item.artist.name }}</text>
					</view>
				</view>
				<view slot="right-icon"><u-icon class="focus" name="arrow-right" size="30"></u-icon></view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-6 8:59:33 ?F10: PM?
 * description 专辑搜索
 */

export default {
	name: 'search-album',
	data() {
		return {
			// 获取专辑
			album: [],
			// 搜索类型
			searchType: 10
		};
	},
	component: {},
	mounted() {},
	methods: {
		// 搜索获取关键字
		getSearchAlbum(keyword) {
			// 调用搜索接口
			let params = {
				keywords: keyword,
				type: this.searchType
			};
			this.$api.getSearch(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.album = res.result.albums;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.search-album {
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
