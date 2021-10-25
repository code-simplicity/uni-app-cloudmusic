<template>
	<view class="search-user">
		<u-cell-group class="search-cell-group" :border="false" v-if="user && user.length > 0">
			<u-cell-item class="u-cell" :arrow="false" v-for="(item, index) in user" :key="index">
				<view slot="icon" class="singer-image">
					<u-image
						shape="circle"
						width="100rpx"
						height="100rpx"
						:src="item.avatarUrl"
						mode="aspectFill"
					></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name box-line1">{{ item.nickname }}</view>
					<view class="singer-num box-line1"><!-- <text>{{ item.albumSize }}人关注</text> --></view>
				</view>
				<view slot="right-icon">
					<u-icon
						class="focus"
						name="plus"
						size="26"
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
 * time     2021-10-6 9:00:47 ?F10: PM?
 * description 用户搜索
 */

export default {
	name: 'search-user',
	data() {
		return {
			// 用户
			user: [],
			// 搜索类型为 1002: 歌手
			searchType: 1002
		};
	},
	component: {},
	mounted() {},
	methods: {
		// 歌单搜索
		getSearchUser(keyword) {
			// 调用搜索接口
			let params = {
				keywords: keyword,
				type: this.searchType
			};
			this.$api.getSearch(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.user = res.result.userprofiles;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.search-user {
	width: 100%;
	.search-cell-group {
		width: auto;
		padding: 10rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		.u-cell {
			padding: 18rpx 16rpx;
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
		}
	}
}
</style>
