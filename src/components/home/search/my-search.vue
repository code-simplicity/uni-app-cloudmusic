<template>
	<view class="my-search">
		<u-navbar :is-back="false" title="">
			<user-setting></user-setting>
			<view class="my-search-input" v-if="searchShow">
				<u-search
					placeholder="输入歌曲/MV/歌手"
					v-model="search"
					:clearabled="true"
					:show-action="false"
					border-color="#3b3b3b"
					@click="toSearch"
					@focus="toSearch"
				></u-search>
			</view>
			<view class="my-search-mike" v-if="micShow"><u-icon name="mic" size="50" color="#3b3b3b"></u-icon></view>
			<view class="user-info-search" v-if="searchIconShow">
				<u-icon name="search" size="50" color="#3b3b3b" @click="toSearch"></u-icon>
			</view>
		</u-navbar>
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
		};
	},
	props: {
		searchShow: {
			type: Boolean,
			default: false
		},

		micShow: {
			type: Boolean,
			default: false
		},

		searchIconShow: {
			type: Boolean,
			default: false
		}
	},

	component: {},
	mounted() {},
	methods: {
		// 去用户搜索界面
		toSearch(val) {
			this.$Router.push({
				name: 'Search',
				params: {
					key: val
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.my-search {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	.my-search-input {
		flex: 1;
	}
	.my-search-mike {
		margin: 0 10rpx;
	}
	.user-info-search {
		margin-left: auto;
		margin-right: 10rpx;
	}
}
</style>
