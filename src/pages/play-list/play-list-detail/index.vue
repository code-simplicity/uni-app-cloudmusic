<template>
	<view class="play-list-detail">
		<u-navbar :back-text="titleName"></u-navbar>
		<view class=""><play-list-box ref="refRes"></play-list-box></view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-23 10:31:34 ?F10: PM?
 * description 歌单列表点击详情
 */

export default {
	name: 'play-list-detail',
	data() {
		return {
			// title
			titleName: ''
		};
	},
	component: {},
	mounted() {
		let name = this.$Route.query.name;
		if (name) {
			this.titleName = name;
			this.getPlayList(name);
		}
	},
	methods: {
		getPlayList(name) {
			this.$refs.refRes.getTopPlayList(name);
		}
	}
};
</script>

<style lang="scss" scoped>
.play-list-detail {
}
</style>
