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
						label-pos="bottom "
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
					name: 'calendar',
					icon: 'my-icon',
					value: '每日推荐'
				},
				{
					label: '私人FM',
					name: 'diantai',
					icon: 'my-icon',
					value: '私人FM'
				},
				{
					label: '歌单',
					name: 'zuixingedan',
					icon: 'my-icon',
					value: '歌单'
				},
				{
					label: '排行榜',
					name: 'paixingbang',
					icon: 'my-icon',
					value: '排行榜'
				},
				{
					label: '专辑',
					name: 'zhuanji',
					icon: 'my-icon',
					value: '专辑'
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
