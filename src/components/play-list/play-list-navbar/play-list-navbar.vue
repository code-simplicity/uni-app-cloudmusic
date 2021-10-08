<template>
	<view class="play-list-navbar">
		<u-navbar :is-back="true" back-text="返回" :title="title" :background="background">
			<view class="play-musci-header-top">
				<view class="header-right">
					<u-icon name="search" color="#3b3b3b" size="50" @click="toSearch"></u-icon>
					<u-icon class="tools" name="more-dot-fill" color="#3b3b3b" size="50"></u-icon>
				</view>
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
				// 渐变色
				backgroundImage: 'linear-gradient(45deg, rgb(227, 227, 227), rgb(206, 201, 201))'
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
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	.play-musci-header-top {
		margin-left: auto;
		.header-right {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			.tools {
				margin-left: 30rpx;
				transform: rotate(90deg);
			}
		}
	}
}
</style>
