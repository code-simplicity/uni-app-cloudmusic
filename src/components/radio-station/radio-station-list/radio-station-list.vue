<template>
	<view class="radio-station-list">
		<view class="radio-station-list-top">
			<view class="left">{{ radioRecommendList.categoryName }}</view>
			<view class="right">
				<view class="rihgt-more">
					更多
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<view class="radio-station-content">
			<view
				class="radio-station-box"
				v-for="(item, index) in radioRecommendList.radios"
				:key="index"
				@click="toRadioDetail(item.id)"
			>
				<view class="radio-top">
					<view class="image">
						<u-image width="100%" height="230rpx" border-radius="16" :src="item.picUrl"></u-image>
						<view class="playcount">
							<view class="playcount-text">
								<u-icon name="play-right" size="16" color="#ffffff"></u-icon>
								{{ utils.tranNumber(item.playCount, 1) }}
							</view>
						</view>
					</view>
				</view>
				<view class="radio-bottom">
					<view class="radio-bottom-text">{{ item.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-15 2:24:43 ?F10: PM?
 * description
 */

export default {
	name: 'radio-station-list',
	data() {
		return {};
	},
	props: {
		radioRecommendList: {
			type: Object
		}
	},

	component: {},
	mounted() {},
	methods: {
		//去电台详情页面
		toRadioDetail(id) {
			this.$Router.push({
				name: 'radio-station-detail',
				params: {
					id: id
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.radio-station-list {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	padding: 10rpx;
	margin-bottom: 16rpx;
	.radio-station-list-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		.left {
			font-size: 32rpx;
		}
		.right {
			border: 1px solid #818181;
			border-radius: 16rpx;
			padding: 4rpx 10rpx;
			text-align: center;
			font-size: 26rpx;
		}
	}
	.radio-station-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.radio-station-box {
			display: flex;
			flex-direction: column;
			.radio-top {
				display: flex;
				align-items: center;
				flex-direction: row;
				justify-content: space-between;
				flex-wrap: nowrap;
				.image {
					width: 230rpx;
					padding: 5rpx;
					position: relative;
					.playcount {
						position: absolute;
						right: 10rpx;
						top: 16rpx;
						background-color: rgba(125, 121, 122, 0.5);
						padding: 2rpx 20rpx;
						border-radius: 16rpx;
						text-align: center;
						font-size: 24rpx;
						.playcount-text {
							color: #ffffff;
						}
					}
				}
			}
			.radio-bottom {
				margin-top: 12rpx;
				height: 60rpx;
				-webkit-line-clamp: 2; // 用来限制在一个块元素显示的文本的行数
				display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
				-webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
				text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
				overflow: hidden;
				.radio-bottom-text {
					font-size: 22rpx;
					flex-wrap: wrap;
				}
			}
		}
	}
}
</style>
