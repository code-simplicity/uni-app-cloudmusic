<template>
	<view class="recommend-play-list">
		<view class="recommend-play-header">
			<view class="recommend-play-title">{{ title }}</view>
			<view class="recommend-play-title-more">
				更多
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="recommend-play-content scroll-x-box">
			<scroll-view scroll-x="true" class="scroll-x">
				<view
					class="recommend-play-wrap"
					v-for="(item, index) of songlist"
					:key="item.id"
					@click="toPlayList(item.id)"
				>
					<view class="cover">
						<u-image
							class="image-border"
							mode="widthFix"
							border-radius="10"
							:src="item.picUrl ? item.picUrl : item.coverImgUrl"
						></u-image>
						<view class="play-count">{{ utils.tranNumber(item.playCount, 1) }}</view>
					</view>
					<view class="play-name u-line-1">{{ item.name }}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-25 6:38:12 ?F10: PM?
 * description
 */

export default {
	name: 'recommend-play-list',
	data() {
		return {};
	},

	props: {
		songlist: {
			type: Array
		},
		title: {
			type: String
		}
	},

	component: {},
	mounted() {},
	methods: {
		// 进入歌单详情
		toPlayList(id) {
			this.$Router.push({
				name: 'PlayDetail',
				params: {
					id
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.recommend-play-list {
	padding: 6rpx;
	border-radius: 16rpx;
	background-color: $uni-bg-color;
	width: 100%;
	.recommend-play-header {
		display: flex;
		height: 60rpx;
		align-items: center;
		justify-content: space-between;
		.recommend-play-title {
			padding: 0 10rpx;
		}
		.recommend-play-title-more {
			border-radius: 16rpx;
			border: 1px solid #c2c2c2;
			padding: 4rpx 8rpx;
			font-size: 26rpx;
			&:active {
				background-color: #dd4816;
				color: #ffffff;
			}
		}
	}
	.recommend-play-content {
		display: flex;
		justify-content: center;
		margin-top: 10rpx;
		height: 250rpx;
		.scroll-x-box,
		.scroll-x {
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
		}
		.recommend-play-wrap {
			width: 200rpx;
			display: inline-block;
			margin-right: 30rpx;
			.cover {
				width: 200rpx;
				height: 200rpx;
				position: relative;
				.play-count {
					position: absolute;
					top: 0;
					right: 0;
					color: #ffffff;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 10rpx;
					padding: 0 5rpx;
					font-size: 26rpx;
				}
			}
			.play-name {
				height: auto;
				color: #333;
				margin-top: 8rpx;
				font-size: 26rpx;
				word-wrap: break-word;
				word-break: normal;
			}
		}
	}
}
</style>
