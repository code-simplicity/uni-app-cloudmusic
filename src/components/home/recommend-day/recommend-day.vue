<template>
	<view class="recommend-day">
		<view class="recommend-day-item">
			<scroll-view scroll-x="true" @scroll="scroll">
				<view class="recommend-day-list">
					<u-icon
						v-for="(item, index) of list"
						:key="item.value"
						:name="item.name"
						:label="item.label"
						class="icon-style"
						:class="item.name ? 'active' : ''"
						size="40"
						label-pos="bottom"
						:custom-prefix="item.icon"
					></u-icon>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-25 11:10:17 ?F10: AM?
 * description
 */

export default {
	name: 'recommend-day',
	data() {
		return {
			list: [
				{
					label: '每日推荐',
					name: 'iconfont icon-calendar',
					value: '每日推荐',
					icon: 'iconfont'
				},
				{
					label: '私人FM',
					name: 'iconfont icon-diantai',
					value: '私人FM',
					icon: 'iconfont'
				},
				{
					label: '歌单',
					name: 'iconfont icon-zuixingedan',
					value: '歌单',
					icon: 'iconfont'
				},
				{
					label: '排行榜',
					name: 'iconfont icon-paixingbang',
					value: '排行榜',
					icon: 'iconfont'
				},
				{
					label: '专辑',
					name: 'iconfont icon-zhuanji',
					value: '专辑',
					icon: 'iconfont'
				}
			]
		};
	},
	component: {},
	mounted() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.recommend-day {
	display: flex;
	width: 100%;
	.recommend-day-item {
		flex: 1;
		border-radius: 16rpx;
		background-color: $uni-bg-color;
		.recommend-day-list {
			height: 120rpx;
			line-height: 80rpx;
			.icon-style {
				height: 100rpx;
				margin: 0 16rpx;
				border-radius: 50%;
				color: #ff0000;
				// &.active {
				// 	color: #111;
				// }
				// &:hover {
				// 	color: #000000;
				// 	background-color: #000000;
				// }
			}
		}
	}
}
</style>
