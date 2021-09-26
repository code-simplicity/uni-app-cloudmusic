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
						>
							<view class="index-container flex-center">
								<view
									class="cover"
									:class="
										index === currentIndex && currentSong.id === item.id && playing ? 'playing' : ''
									"
								>
									<u-image
										mode="widthFix"
										border-radius="10"
										:src="item.image + '?param=270y270'"
									></u-image>
								</view>
								<view class="play-icon">
									<div class="line" style="animation-delay: -1.2s"></div>
									<div class="line" style="animation-delay: -1s"></div>
									<div class="line" style="animation-delay: -0.8s"></div>
									<div class="line" style="animation-delay: -0.6s"></div>
									<div class="line" style="animation-delay: -0.4s"></div>
								</view>
								<u-icon
									class="play-btn"
									custom-prefix="my-icon"
									name="bofang1"
									size="64"
									@click="playMusci(item, index)"
								></u-icon>
								<u-icon class="pause-btn" name="pause-circle" size="36" @click="pauseMusci"></u-icon>
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
					justify-content: start;
					position: relative;
					margin-bottom: 40rpx;
					.index-container {
						margin-right: 26rpx;
						position: relative;
						margin-bottom: 20rpx;
						.cover {
							width: 100rpx;
							height: 100rpx;
							position: absolute;
						}
						.play-icon {
							display: none;
							height: 16rpx;
							min-width: 18rpx;
							overflow: hidden;
							position: relative;
							z-index: 2;
							line {
								width: 2rpx;
								height: 100%;
								margin-left: 2rpx;
								background-color: $uni-bg-color;
								animation: play 0.9s linear infinite alternate;
							}
						}
						.play-btn {
							cursor: pointer;
							position: relative;
							margin: 0 auto;
							align-items: center;
							color: #ffffff;
							&:hover {
								color: rgb(211, 213, 210);
							}
						}
						.pause-btn {
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
				}
				&.playing {
					.index-container {
						.pause-btn {
							display: none;
						}
						.play-icon {
							display: flex;
						}
						.play-btn {
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
				.play-name {
					height: auto;
					color: #333;
					margin-top: 8rpx;
					font-size: 26rpx;
					word-wrap: break-word;
					word-break: normal;
				}
			}
		}
	}
}
</style>
