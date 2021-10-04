<template>
	<view ref="wrapper"><slot></slot></view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-30 9:55:27 ?F10: AM?
 * description
 */
import BetterScroll from 'better-scroll';
// 定义两个常量,表示水平方向
const DIRECTION_H = 'horizontal';
// 定义两个常量,表示垂直方向
const DIRECTION_V = 'vertical';
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
			default: false
		},
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
		beforeScroll: {
			type: Boolean,
			default: false
		},
		refreshDelay: {
			type: Number,
			default: 20
		},
		direction: {
			type: String,
			default: DIRECTION_V
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
		setTimeout(() => {
			this.initScroll();
		}, 50);
	},
	methods: {
		// 歌词初始化滚动
		initScroll() {
			this.scroll = new BetterScroll(this.$refs.wrapper, {
				probeType: this.probeType,
				click: this.click,
				mouseWheel: true,
				eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V,
				pullup: this.pullup
			});
			// 监听滚动的位置 需要设置 probeType
			if (this.listenScroll) {
				this.scroll.on('scroll', pos => {
					this.$emit('scroll', pos);
					console.log(pos);
				});
			}

			if (this.pullup) {
				this.scroll.on('scrollEnd', () => {
					if (this.scroll.y <= this.scroll.maxScrollY + 50) {
						this.$emit('scrollToEnd');
					}
				});
			}

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
			this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
		},

		// 滚动到指定目标元素
		scrollToElement() {
			this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
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
