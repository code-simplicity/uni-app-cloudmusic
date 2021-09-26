<template>
	<view class="my-search flex-row">
		<view class="my-search-item">
			<u-icon name="grid-fill" size="50" color="#000000" @click="showUserInfo = true"></u-icon>
		</view>
		<view class="hmy-search-input">
			<u-search
				placeholder="输入歌曲/MV/歌手"
				v-model="search"
				:clearabled="true"
				:show-action="false"
				border-color="#111"
			></u-search>
		</view>
		<view class="my-search-mike"><u-icon name="mic" size="50" color="#000000"></u-icon></view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-25 10:21:52 ?F10: AM?
 * description
 */

export default {
	name: 'my-search',
	data() {
		return {
			// 搜索关键字
			search: '',
			// 左侧弹出框
			show: false
		};
	},
	props: {
		showUserInfo: {
			type: Boolean,
			default: false
		}
	},
	
	component: {},
	mounted() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.my-search {
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: #eaeaea;
	text-align: center;
	.my-search-item {
		margin-right: 20rpx;
		margin-top: 10rpx;
	}
	.hmy-search-input {
		flex: 1;
	}
	.my-search-mike {
		margin-left: 10px;
		margin-top: 10rpx;
	}
}
</style>
