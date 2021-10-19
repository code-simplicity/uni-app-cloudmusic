<template>
	<view class="lyric-wrap">
		<scroll-view scroll-y="true" :scroll-top="scrollTop" scroll-with-animation="true" class="lyric-scroll">
			<view class="lyric-panel">
				<block v-for="(item, index) in lyricList" :key="index">
					<view :class="index === nowLyricIndex ? 'hightlight-lyric' : ''" class="lyric">{{ item.txt }}</view>
				</block>
			</view>
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
	name: 'lyric-scroll',
	data() {
		return {
			// 歌词高亮
			nowLyricIndex: 0,
			// 歌词移动高度
			scrollTop: 0,
			// 歌词
			lyricList: [],
			// 歌词高度
			lyricHeight: 0
		};
	},

	props: {
		currentLyric: {
			type: String
		}
	},

	watch: {
		currentLyric(txt) {
			if (txt === '') {
				(this.lyricList = [
					{
						txt,
						time: 0
					}
				]),
					(this.nowLyricIndex = -1);
			} else {
				// 格式化歌词
				this._parseLyric(txt);
			}
		},
		immediate: true
	},

	onShow() {
		// 获取页面高度
		uni.getSystemInfo({
			success(res) {
				this.lyricHeight = (res.screenWidth / 750) * 64;
			}
		});
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
		])
	},

	component: {},
	mounted() {},

	methods: {
		update(currentTime) {
			// 歌词高亮 从父组件拿到值
			let lyricList = null;
			if (this.lyricList) {
				lyricList = this.lyricList;
			}
			if (lyricList.length === 0) {
				return;
			}
			// 歌词滚动
			if (currentTime > lyricList[lyricList.length - 1].time) {
				if (this.nowLyricIndex !== -1) {
					(this.nowLyricIndex = -1), (this.scrollTop = lyricList.length * this.lyricHeight);
				}
			}
			for (let i = 0, len = lyricList.length; i < len; i++) {
				if (currentTime <= lyricList[i].time) {
					this.nowLyricIndex = i - 1;
					this.scrollTop = (i - 1) * this.lyricHeight;
					break;
				}
			}
		},

		// 格式化歌词
		_parseLyric(sLyric) {
			console.log('sLyric', sLyric);
			let line = sLyric.split('\n');
			let _lrcList = [];
			line.forEach(elem => {
				let time = elem.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g);
				if (time != null) {
					let txt = elem.split(time)[1]; //获取到歌词
					let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/); //获取到时间
					// 吧时间转换成秒
					let time2Senconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000;
					_lrcList.push({
						txt,
						time: time2Senconds
					});
				}
			});
			this.lyricList = _lrcList;
		}
	}
};
</script>

<style lang="scss" scoped>
.lyric-wrap {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 80rpx;
	left: 0;
	right: 0;
	.lyric-scroll {
		width: 100%;
		height: 70%;
		color: #ccc;
		font-size: 30rpx;
		.lyric-panel {
			position: relative;
			top: 20%;
			text-align: center;
			.lyric {
				min-height: 70rpx;
			}

			.hightlight-lyric {
				color: #d43c33;
			}
		}
	}
}
</style>
