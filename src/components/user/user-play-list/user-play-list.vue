<template>
	<view class="user-play-list">
		<view class="user-play-header">
			<view class="user-play-header-text">{{ header }}</view>
			<view class="user-play-header-tools">
				<view class="user-play-header-add"><u-icon name="plus" color="#000000" size="30"></u-icon></view>
				<view class="user-play-header-more">
					<u-icon class="tools-more" name="more-dot-fill" color="#000000" size="30"></u-icon>
				</view>
			</view>
		</view>
		<view class="user-play-content" v-for="(item, index) of songList" :key="item.id" v-if="loginState">
			<view class="user-play-image" @click="toPlayDetail(item.id)">
				<image class="image-cover image-border" :src="item.coverImgUrl" mode="aspectFit"></image>
			</view>
			<view class="user-play-detail" @click="toPlayDetail(item.id)">
				<view class="user-play-name">{{ item.name }}</view>
				<view class="user-play-num">
					<text class="user-list-count">{{ item.trackCount }}首</text>
					<text>by.{{ item.creator.nickname }}</text>
				</view>
			</view>
			<view class="user-play-tools">
				<u-icon class="tools-more" name="more-dot-fill" color="#000000" size="30"></u-icon>
			</view>
		</view>
		<view class="user-play-no-login" v-if="!loginState">暂无歌单，请登录之后刷新</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-1 10:16:19 ?F10: PM?
 * description
 */
import { mapGetters } from 'vuex';
export default {
	name: 'user-play-list',
	data() {
		return {};
	},

	props: {
		songList: {
			type: Array
		},

		header: {
			type: String
		}
	},

	computed: {
		...mapGetters('user', ['loginState'])
	},

	component: {},
	mounted() {},
	methods: {
		// 去详情界面
		toPlayDetail(id) {
			this.$Router.push({
				name: 'PlayDetail',
				params: {
					id: id
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.user-play-list {
	width: 100%;
	display: flex;
	flex-direction: column;
	.user-play-header {
		display: flex;
		flex-direction: row;
		margin-bottom: 30rpx;
		align-items: center;
		justify-content: space-between;
		.user-play-header-text {
			font-size: 30rpx;
		}
		.user-play-header-tools {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.user-play-header-add {
				font-size: 26rpx;
				margin-right: 40rpx;
			}
			.user-play-header-more {
				font-size: 26rpx;
				.tools-more {
					transform: rotate(90deg);
				}
			}
		}
	}
	.user-play-content {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 20rpx;
		width: 100%;
		.user-play-image {
			flex: 1;
			.image-cover {
				width: 100rpx;
				height: 100rpx;
			}
		}
		.user-play-detail {
			flex: 5;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			width: 0;
			.user-play-name {
				flex: 1;
				font-size: 30rpx;
				margin-bottom: 10rpx;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				word-break: break-all;
			}
			.user-play-num {
				font-size: 26rpx;
				.user-list-count {
					margin-right: 20rpx;
				}
			}
		}
		.user-play-tools {
			font-size: 26rpx;
			.tools-more {
				transform: rotate(90deg);
			}
		}
	}
	.user-play-no-login {
		display: flex;
		justify-content: center;
		margin: 10rpx auto;
		text-align: center;
		font-size: 26rpx;
	}
}
</style>
