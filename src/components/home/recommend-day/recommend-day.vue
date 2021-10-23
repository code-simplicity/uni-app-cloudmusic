<template>
	<view class="recommend-day">
		<view class="recommend-day-list">
			<u-icon
				v-for="(item, index) of list"
				:key="item.value"
				:name="item.name"
				:label="item.label"
				class="icon-style"
				size="50"
				label-size="26"
				label-pos="bottom"
				:custom-prefix="item.icon"
				@click="toDetail(item.label)"
			></u-icon>
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
	methods: {
		toDetail(lable) {
			if (lable === '每日推荐') {
				this.$Router.push({
					name: 'RecommendSongs'
				});
			} else if (lable === '歌单') {
				this.$Router.push({
					name: 'PlayList'
				});
			} else if (lable === '排行榜') {
				this.$Router.push({
					name: 'LeaderBoard'
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.recommend-day {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 10rpx;
	.recommend-day-list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		.icon-style {
			height: 100rpx;
			margin: 0 16rpx;
			border-radius: 50%;
			color: #ff0000;
		}
	}
}
</style>
