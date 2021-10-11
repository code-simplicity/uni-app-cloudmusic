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
		<scroll class="lyric" ref="lyricList" :data="currentLyric && currentLyric.lines">
			<view class="lyric-wrapper">
				<view v-if="currentLyric">
					<view
						ref="lyricLine"
						class="lyric-text"
						v-for="(item, index) in currentLyric.lines"
						:class="currentLyricNum === index ? 'active' : ''"
						:key="item.key"
					>
						{{ item.txt }}
					</view>
				</view>
				<view class="no-lyric" v-else>暂无歌词,请搜索重试</view>
			</view>
		</scroll>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-29 8:31:31 ?F10: PM?
 * description
 */
import BScroll from 'better-scroll';
import { mapGetters } from 'vuex';

export default {
	name: 'Lyric',
	data() {
		return {
			// 音量
			volumeNum: 40,
			// 是否静音
			isMuted: false
			// 底部
		};
	},

	props: {
		currentLyricNum: {
			type: Number
		},

		currentLyric: {
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
	mounted() {},

	methods: {
		// 滚动触发的事件
		scrollChange() {},

		// 改变声音大小
		changeVolume(val) {
			val.detail.value === 0 ? (this.isMuted = true) : (this.isMuted = false);
			this.volume = val.detail.value / 100;
			this.$audio_player.volume = val.detail.value / 100;
		},

		// 改变音量
		changeMuted() {
			return this.isMuted ? this.mutedHandle(false, 40) : this.mutedHandle(true, 0);
		},

		// 是否静音
		mutedHandle(state, num) {
			this.isMuted = state;
			this.volumeNum = num;
			this.$audio_player.volume = num / 100;
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
		width: 100%;
		height: 60%;
		overflow: hidden;
		overflow-y: scroll;
		.lyric-wrapper {
			line-height: 60rpx;
			display: flex;
			width: 100%;
			justify-content: center;
			flex-direction: column;
			.lyric-text {
				line-height: 60rpx;
				height: 60rpx;
				border-radius: 16rpx;
				font-size: 30rpx;
				font-weight: 500;
				text-align: center;
				color: #000000;
				&:hover {
					background-color: #f9fffc;
					color: #000000;
				}
				&.active {
					color: #e10003;
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
