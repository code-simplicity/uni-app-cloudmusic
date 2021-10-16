<template>
	<view class="play-list-navbar">
		<u-navbar
			ref="navbarRef"
			:is-back="true"
			title=""
			:border-bottom="false"
			:background="background"
			back-icon-color="#ffffff"
			back-icon-size="50"
		>
			<view slot="" class="header-title">{{ title }}</view>
			<view slot="right" class="header-right">
				<u-icon name="search" color="#ffffff" size="50" @click="toSearch"></u-icon>
				<u-icon class="tools" name="more-dot-fill" color="#ffffff" size="50"></u-icon>
			</view>
		</u-navbar>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-5 10:30:08 ?F10: PM?
 * description
 */

export default {
	name: 'play-list-navbar',
	data() {
		return {
			background: {
				backgroundColor: 'rgb(111, 121, 130)'
			}
		};
	},
	props: {
		title: {
			type: String
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
.play-list-navbar {
	width: 100%;
	display: flex;
	justify-content: space-between;
	.header-title {
	}
	.header-right {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		.tools {
			margin-left: 30rpx;
			transform: rotate(90deg);
		}
	}
}
</style>
