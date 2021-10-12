<template>
	<view ref="wrapper"><slot></slot></view>
</template>

<script type="text/ecmascript-6">
/**
 * author	bugdr
 * time     2021-9-30 9:55:27 ?F10: AM?
 * description
 */
import BetterScroll from 'better-scroll';

export default {
	name: 'Scroll',
	data() {
		return {};
	},
	// 接受组件传参
	props: {
		probeType: {
			type: Number,
			default: 1
		},
		click: {
			type: Boolean,
			default: true
		},
		// 是否监听滚动
		listenScroll: {
			type: Boolean,
			default: false
		},
		data: {
			type: Array,
			default: null
		},
		// 上拉加载
		pullup: {
			type: Boolean,
			default: false
		},
		// 滚动前是否触发事件，如：滚动前让输入框失去焦点，避免滚动搜索结果时移动端键盘遮挡
		beforeScroll: {
			type: Boolean,
			default: false
		},
		refreshDelay: {
			type: Number,
			default: 20
		}
	},
	watch: {
		data() {
			setTimeout(() => {
				this.refresh();
			}, this.refreshDelay);
		}
	},

	component: {},
	created() {},

	mounted() {
		this.$nextTick(() =>{
			setTimeout(() => {
				this._initScroll();
			}, 20);
		})


	},
	methods: {
		// 歌词初始化滚动
		_initScroll() {
			if (!this.$refs.wrapper) {
				return;
			}
			this.scroll = new BetterScroll(this.$refs.wrapper, {
				probeType: this.probeType,
				click: this.click,
				scrollY: true,
				mouseWheel: true
			});
			console.log(this.scroll);
			// 监听滚动的位置 需要设置 probeType
			if (this.listenScroll) {
				this.scroll.on('scroll', pos => {
					this.$emit('scroll', pos);
					console.log(pos);
				});
			}
			debugger

			if (this.pullup) {
				this.scroll.on('scrollEnd', () => {
					if (this.scroll.y <= this.scroll.maxScrollY + 50) {
						// 滑动到底部了
						this.$emit('scrollToEnd');
					}
				});
			}

			// 滚动前是否触发事件
			if (this.beforeScroll) {
				this.scroll.on('beforeScrollStart', () => {
					this.$emit('beforeScroll');
				});
			}
		},

		disable() {
			this.scroll && this.scroll.disable();
		},

		enable() {
			this.scroll && this.scroll.enable();
		},

		// 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
		refresh() {
			this.scroll && this.scroll.refresh();
		},

		scrollTo() {
			this.scroll && this.scroll.scrollTo(this.scroll, arguments);

		},

		// 滚动到指定目标元素
		scrollToElement() {
			this.scroll && this.scroll.scrollToElement(this.scroll, arguments);
		},

		stop() {
			this.scroll && this.scroll.stop();
		},

		activated() {
			this.enable();
		},

		deactivated() {
			this.disable();
		},

		beforeDestroy() {
			this.disable();
		}
	}
};
</script>

<style lang="scss" scoped></style>
