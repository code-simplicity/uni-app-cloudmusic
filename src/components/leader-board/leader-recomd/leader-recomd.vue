<template>
	<view class="leader-recomd">
		<view class="leader-recomd-wrap">
			<view class="top-title">{{ title }}</view>
			<view class="content">
				<view
					class="content-wrap"
					v-for="(item, index) in featuredLeaderList"
					:key="item.id"
					@click="toLeaderBoardDetail(item.id)"
				>
					<view class="image">
						<u-image
							border-radius="16"
							width="200"
							height="200"
							:src="item.coverImgUrl"
							mode="aspectFill"
						></u-image>
						<u-icon
							class="play-btn"
							custom-prefix="iconfont"
							name="iconfont icon-bofang1"
							size="70"
							color="#efefef"
						></u-icon>
						<view class="list-update-info">{{ item.updateFrequency }}</view>
					</view>
					<view class="text">{{ item.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-22 4:32:46 ?F10: PM?
 * description 榜单推荐
 */

export default {
	name: 'leader-recomd',
	data() {
		return {};
	},
	props: {
		featuredLeaderList: {
			type: Array
		},
		title: {
			type: String
		}
	},

	component: {},
	mounted() {},
	methods: {
		// 去歌单详情列表
		toLeaderBoardDetail(id) {
			this.$Router.push({
				name: 'LeaderBoardDetail',
				params: {
					id
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.leader-recomd {
	width: 100%;
	background-color: #ffffff;
	border-radius: 26rpx;
	margin: 20rpx 0;
	.leader-recomd-wrap {
		width: 100%;
		padding: 20rpx;
		.top-title {
			font-size: 34rpx;
			font-weight: 600;
		}
		.content {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			.content-wrap {
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;
				.image {
					position: relative;
					margin-top: 30rpx;
					.play-btn {
						right: 6rpx;
						bottom: 0;
						cursor: pointer;
						position: absolute;
					}
					.list-update-info {
						position: absolute;
						top: 10rpx;
						right: 30rpx;
						font-size: 22rpx;
						color: #ffffff;
					}
				}
				.text {
					margin-top: 20rpx;
					font-size: 26rpx;
					height: 40rpx;
					-webkit-line-clamp: 2;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					text-overflow: ellipsis;
					overflow: hidden;
					width: 210rpx;
				}
			}
		}
	}
}
</style>
