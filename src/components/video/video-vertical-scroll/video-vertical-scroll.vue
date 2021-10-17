<template>
	<list class="scroll-wrapper" :pagingEnabled="true" :show-scrollbar="false" @scrollend="scroll" :scrollable="true">
		<slot />
	</list>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-17 2:31:17 ?F10: PM?
 * description
 */
export default {
	name: '',
	data() {
		return {
			currentIndex: 0,
			contentOffsetY: 0
		};
	},
	props: {
		num: {
			default: 0
		}
	},
	component: {},
	mounted() {},
	methods: {
		// 滑动事件
		scroll(e) {
			console.log('scroll ==>', e);
			// 视频来源的标号
			let originalIndex = this.currentIndex;
			// 是否下一曲
			let isNext = false;
			if (e.contentOffset.y < this.contentOffsetY) {
				isNext = true;
			}
			this.contentOffsetY = e.contentOffset.y;
			// 计算值
			this.currentIndex = Math.round(Math.abs(this.contentOffsetY) / (e.contentSize.height / this.num));
			this.$emit('change', this.currentIndex);
		}
	}
};
</script>

<style></style>
