<template>
	<view class="recommend-play-list">
		<view class="recommend-play-header">
			<text class="recommend-play-title">新歌</text>
			<text class="recommend-play-title-more">更多</text>
		</view>
		<view class="recommend-play-content">
			<swiper class="swiper" :indicator-dots="false" :autoplay="false">
				<block v-for="(num, column) in parseInt(newSong.length / 3)" :key="column">
					<swiper-item class="recommend-play-wrap ">
						<view
							class="wrapper flex-center"
							v-for="(item, index) in newSong.slice(column * 3, column * 3 + 3)"
							:key="item.id"
							:class="index === currentIndex && currentSong.id == item.id && playing ? 'playing' : ''"
						>
							<view class="index-container flex-center">
								<view class="cover">
									<image
										style="width: 100rpx; height: 100rpx;"
										mode="aspectFit"
										border-radius="10"
										:src="item.image + '?param=270y270'"
									></image>
								</view>
								<view class="play-icon">
									<view class="line animate__animated animate__bounce animate__delay-5s 5s"></view>
									<view class="line animate__animated animate__bounce animate__delay-4s 4s"></view>
									<view class="line animate__animated animate__bounce animate__delay-3s 3s"></view>
									<view class="line animate__animated animate__bounce animate__delay-2s 2s"></view>
									<view class="line animate__animated animate__bounce animate__delay-1s 1s"></view>
								</view>
								<u-icon
									class="play-btn"
									custom-prefix="iconfont"
									name="iconfont icon-bofang1"
									@click="playMusci(item, index)"
								></u-icon>
								<u-icon
									class="pause-btn"
									custom-prefix="iconfont"
									name="iconfont icon-zanting1"
									@click="pauseMusci"
								></u-icon>
							</view>
							<view class="song-info">
								<view class="song-name">
									<text>{{ item.name }}</text>
								</view>
								<view class="song-singer">
									<text>{{ item.singer }}</text>
								</view>
							</view>
						</view>
						<view class="swiper-item"></view>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-25 6:38:12 ?F10: PM?
 * description
 */
import { mapGetters, mapActions } from 'vuex';
export default {
	name: 'recommend-new-song',
	data() {
		return {};
	},

	props: {
		newSong: {
			type: Array
		}
	},
	computed: {
		...mapGetters('player', ['currentIndex', 'currentSong', 'playing'])
	},
	component: {},
	mounted() {},
	methods: {
		// 暂停
		pauseMusci() {
			this.pausePlay();
		},

		// 播放音乐
		playMusci(item, index) {
			this.selectPlay({
				list: this.newSong,
				index
			});
		},

		// 响应状态
		...mapActions('player', ['selectPlay', 'pausePlay', 'playAll'])
	}
};
</script>

<style lang="scss" scoped>
.recommend-play-list {
	padding: 6rpx;
	border-radius: 16rpx;
	background-color: $uni-bg-color;
	width: 100%;
	margin-top: 16rpx;
	.recommend-play-header {
		display: flex;
		height: 60rpx;
		align-items: center;
		justify-content: space-between;
		.recommend-play-title {
			padding: 0 10rpx;
		}
		.recommend-play-title-more {
			padding: 0 10rpx;
			border-radius: 16rpx;
			border: 1rpx solid #000000;
			height: 46rpx;
			&:hover {
				background-color: #eaeaea;
			}
		}
	}
	.recommend-play-content {
		margin-top: 10rpx;
		.swiper {
			height: 380rpx;
			.recommend-play-wrap {
				margin-bottom: 10rpx;
				.wrapper {
					width: 100%;
					position: relative;
					margin-bottom: 40rpx;
					.index-container {
						margin-right: 26rpx;
						position: relative;
						margin-bottom: 30rpx;

						.cover {
							width: 100rpx;
							height: 100rpx;
							position: absolute;
						}
						.play-icon {
							display: none;
							height: 46rpx;
							margin: 10rpx 0;
							text-align: center;
							align-items: center;
							overflow: hidden;
							position: relative;
							z-index: 1;
							transform: rotate(180deg);
							left: 10rpx;
							top: 10rpx;
							font-size: 64rpx;
							.line {
								width: 10rpx;
								height: 100%;
								margin-left: 4rpx;
								background-color: $uni-bg-color;
								animate-delay: play 1.6s linear;
								animation-iteration-count: infinite; //是否循环执行动画
								animation-duration: 2.5s; //动画持续时间完成
							}
						}
						.play-btn {
							cursor: pointer;
							position: relative;
							align-items: center;
							font-size: 64rpx;
							color: #ffffff;
							&:hover {
								color: rgb(211, 213, 210);
							}
						}
						.pause-btn {
							font-size: 64rpx;
							display: none;
							cursor: pointer;
							position: relative;
							text-align: center;
						}
					}
					.song-info {
						flex: 1;
						.song-name {
							font-size: 28rpx;
							font-weight: 500;
							margin-bottom: 10rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						.song-singer {
							font-size: 26rpx;
							font-weight: 400;
							white-space: nowrap;
							text-overflow: ellipsis;
							&:after {
								content: '/';
								margin: 0 6rpx;
							}
							&:last-child {
								&:after {
									content: '';
								}
							}
						}
					}
					&.playing {
						.index-container {
							.play-icon {
								display: flex;
							}
							.play-btn {
								display: none;
							}
							.pause-btn {
								display: none;
							}
						}
					}
					&:hover {
						.index-container {
							.play-btn {
								display: block;
							}
						}
						&.playing {
							.index-container {
								.play-btn {
									display: none;
								}
								.play-icon {
									display: none;
								}
								.pause-btn {
									display: block;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
