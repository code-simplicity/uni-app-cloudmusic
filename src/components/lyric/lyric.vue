<template>
	<view class="lyric-wrap">
		<view class="lyric-muted">
			<view class="lyric-volume"><u-icon name="volume-up" size="46"></u-icon></view>
			<view class="lyric-slider">
				<slider
					activeColor="#FFCC33"
					backgroundColor="#000000"
					block-color="#8A6DE9"
					block-size="10"
					:value="volumeNum"
					@change="changeVolume"
				/>
			</view>
		</view>
		<scroll-view
			scroll-y="true"
			class="lyric"
			scroll-with-animation="true"
			scroll-top="marginTop"
			@scroll="scrollChange"
		>
			<view class="lyric-wrapper" v-if="currentLyric">
				<view
					class="lyric-text"
					v-for="(item, index) of currentLyric.lines"
					:key="index"
					:class="currentLyricNum === index ? 'active' : ''"
				>
					{{ item.txt }}
				</view>
			</view>
			<view class="no-lyric" v-else>暂无歌词,请搜索重试</view>
		</scroll-view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-29 8:31:31 ?F10: PM?
 * description
 */
import { mapGetters } from 'vuex';
export default {
	name: 'Lyric',
	data() {
		return {
			// 音量
			volumeNum: 40,
			// 是否静音
			isMuted: false,
			// 挂载音乐
			// audio: uni.createInnerAudioContext(),
			// 竖向滚动的位置
			marginTop: 0
		};
	},

	props: {
		currentLyricNum: {
			type: Number
		},

		currentLyric: {
			type: Object
		},
		
		audio: {
			type: Object
		}
	},

	computed: {
		...mapGetters('player', [
			'playList',
			'playing',
			'currentSong',
			'currentIndex',
			'mode',
			'sequenceList',
			'historyList'
		]),
		mutedIcon() {
			return this.isMuted ? 'volume-off' : 'volume-up';
		}
	},

	component: {},
	mounted() {
		this.mTop();
	},
	methods: {
		// 滚动触发的事件
		scrollChange() {},

		// 分发滚动位置给父组件
		mTop() {
			this.$emit('marginTop', this.marginTop);
		},

		// 改变声音大小
		changeVolume(val) {
			val.detail.value === 0 ? (this.isMuted = true) : (this.isMuted = false);
			this.volume = val.detail.value / 100;
			this.audio.volume = val.detail.value / 100;
		},

		// 改变音量
		changeMuted() {
			return this.isMuted ? this.mutedHandle(false, 40) : this.mutedHandle(true, 0);
		},

		// 是否静音
		mutedHandle(state, num) {
			this.isMuted = state;
			this.volumeNum = num;
			this.audio.volume = num / 100;
		}
	}
};
</script>

<style lang="scss" scoped>
.lyric-wrap {
	position: fixed;
	top: 80rpx;
	height: 100%;
	width: 100%;
	left: 0;
	right: 0;
	bottom: 0;
	.lyric-muted {
		padding: 0 20rpx;
		margin-top: 10rpx;
		display: flex;
		.lyric-volume {
			color: #000000;
		}
		.lyric-slider {
			width: 100%;
		}
	}
	.lyric {
		display: inline-block;
		width: 100%;
		height: 60%;
		overflow: hidden;
		vertical-align: top;
		.lyric-wrapper {
			margin: 0 auto;
			overflow: hidden;
			display: flex;
			width: 100%;
			justify-content: center;
			flex-direction: column;
			.lyric-text {
				line-height: 50rpx;
				height: 50rpx;
				border-radius: 16rpx;
				font-size: 30rpx;
				font-weight: 500;
				text-align: center;
				color: #000000;
				&:hover {
					background-color: #000001;
					color: #d0a73d;
				}
				&.active {
					color: #d0a73d;
				}
				&::after {
					color: #ffffff;
				}
			}
		}
		.no-lyric {
			text-align: center;
			font-size: 36rpx;
			color: #000000;
		}
	}
}
</style>
