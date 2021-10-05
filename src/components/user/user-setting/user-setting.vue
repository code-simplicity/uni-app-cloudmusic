<template>
	<view class="user-setting">
		<view class="user-info-tool" @click="toUserSetting">
			<u-icon name="grid-fill" size="50" color="#000000"></u-icon>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-5 10:16:39 ?F10: AM?
 * description
 */

export default {
	name: 'user-setting',
	data() {
		return {};
	},
	component: {},
	mounted() {},
	methods: {
		toUserSetting() {
			this.$Router.push({
				name: 'UserSetting'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.user-setting {
	.user-info-tool {
		margin-right: 18rpx;
		margin-top: 10rpx;
	}
}
</style>
