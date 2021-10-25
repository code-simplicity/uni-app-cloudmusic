<template>
	<view class="user-message-detail">
		<u-navbar :back-text="title"></u-navbar>
		<view class="wrap"></view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-25 9:02:08 ?F10: PM?
 * description   用户消息私信通知
 */

export default {
	name: 'user-message-detail',
	data() {
		return {
			title: ''
		};
	},
	component: {},
	mounted() {
		let { uid, title } = this.$Route.query;
		this.title = title;
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.user-message-detail {
}
</style>
