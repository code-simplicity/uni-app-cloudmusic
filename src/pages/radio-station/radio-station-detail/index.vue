<template>
	<view class="radio-station-detail">
		<play-list-navbar></play-list-navbar>
		<view class="play-music-wrap">
			<image class="image-bg" mode="aspectFill" :src="radioStationList.dj.backgroundUrl" />
			<view class="play-musci-header">
				<view class="play-musci-header-content">
					<view class="play-musci-info-left">
						<image class="image-cover image-border" :src="radioStationList.picUrl" mode="aspectFit"></image>
					</view>
					<view class="play-musci-info-right">
						<view class="music-title">{{ radioStationList.name }}</view>
						<view class="music-username" @click="toUserDetail(radioStationList.dj.userId)">
							<u-avatar :src="radioStationList.dj.avatarUrl" size="50"></u-avatar>
							<view class="music-user-name">{{ radioStationList.dj.nickname }}</view>
						</view>
						<view class="music-detail">{{ radioStationList.desc }}</view>
					</view>
				</view>
				<view class="play-musci-tools">
					<view
						class="play-musci-tools-collect"
						@click="PlaylistSubscribe(radioStationList.subed, radioStationList.id)"
					>
						<u-icon
							:name="likedIcon"
							custom-prefix="iconfont"
							:color="radioStationList.subed ? '#ff0000' : '#ffffff'"
							size="48"
						></u-icon>
						<text class="title">{{ radioStationList.subCount }}</text>
					</view>
					<view class="play-musci-tools-comment" @click="toComment">
						<u-icon
							name="iconfont icon-pinglun"
							custom-prefix="iconfont"
							color="#ffffff"
							size="48"
						></u-icon>
						<text class="title">{{ radioStationList.commentCount }}</text>
					</view>
					<view class="play-musci-tools-share">
						<u-icon
							name="iconfont icon-fenxiang1"
							custom-prefix="iconfont"
							color="#ffffff"
							size="58"
						></u-icon>
						<text class="title">{{ radioStationList.shareCount }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="radio-station-content">
			<radio-station-songs
				:radioSongsList="radioSongsList"
				:radioStationList="radioStationList"
			></radio-station-songs>
		</view>
		<!-- 播放器 -->
		<music-player></music-player>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-15 5:16:59 ?F10: PM?
 * description 电台详情
 */
import { createDj } from '@/utils/dj.js';
export default {
	name: 'radio-station-detail',
	data() {
		return {
			// 电台详情信息
			radioStationList: {
				dj: {}
			},
			// 电台的节目歌曲数据
			radioSongsList: {
				radioMusicList: []
			},
			// 电台节目的参数
			limit: 30,
			offset: 0,
			asc: false
		};
	},
	computed: {
		likedIcon() {
			return this.radioStationList.subed
				? 'iconfont icon-shoucangyishoucang-copy-copy'
				: 'iconfont icon-shoucang2';
		}
	},
	// 设置沉浸式导航栏
	onShow() {
		setTimeout(() => {
			uni.setNavigationBarColor({
				backgroundColor: '#6a6a6a',
				frontColor: '#ffffff'
			}),
				uni.setNavigationBarTitle({
					title: this.radioStationList.name
				});
		}, 1000);
	},

	component: {},
	mounted() {
		let id = this.$Route.query.id;
		if (id) {
			this._initIaLize(id);
			this.getDjProgram(id);
		}
	},
	methods: {
		// 电台节目，获取节目id，并且将id赋值给音乐接口，即可获取资源
		getDjProgram(rid) {
			let params = {
				rid: rid,
				limit: this.limit,
				offset: this.offset,
				asc: this.asc
			};
			this.$api.getDjProgram(params).then(res => {
				if (res.code === this.$code.code_status) {
					// 传递所有数据
					this.radioSongsList = res;
					this.radioSongsList.radioMusicList = this._normaLizeSongs(res.programs);
				}
			});
		},

		// 获取电台详情
		getDjDetail(rid) {
			this.$api.getDjDetail(rid).then(res => {
				if (res.code === this.$code.code_status) {
					this.radioStationList = res.data;
					this.radioStationList.dj = res.data.dj;
				}
			});
		},

		// 处理歌曲
		_normaLizeSongs(res) {
			let resArr = [];
			res.map(item => {
				resArr.push(createDj(item));
			});
			return resArr;
		},

		_initIaLize(id) {
			this.getDjDetail(id);
		}
	}
};
</script>

<style lang="scss" scoped>
.radio-station-detail {
	width: 100%;
	.play-music-wrap {
		width: 100%;
		position: relative;
		.image-bg {
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			height: 400rpx;
			filter: brightness(40%) opacity(1);
		}
		.play-musci-header {
			width: 100%;
			height: 400rpx;
			padding: 20rpx 30rpx;
			.play-musci-header-content {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-top: 10rpx;
				.play-musci-info-left {
					width: 240rpx;
					height: 240rpx;
					flex: 1;
					.image-cover {
						width: 240rpx;
						height: 240rpx;
						position: relative;
					}
				}
				.play-musci-info-right {
					flex: 2;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 20rpx;
					width: 0;
					z-index: 1;
					.music-title {
						font-size: 32rpx;
						margin-bottom: 30rpx;
						color: #ffffff;
						font-weight: 500;
					}
					.music-username {
						margin-bottom: 30rpx;
						display: flex;
						align-items: center;
						.music-user-name {
							font-size: 30rpx;
							color: #10ffec;
							margin-left: 28rpx;
						}
					}
					.music-detail {
						font-size: 24rpx;
						margin-bottom: 30rpx;
						flex-wrap: nowrap;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						word-break: break-all;
						color: #ffffff;
					}
				}
			}
			.play-musci-tools {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 26rpx;
				padding: 10rpx 60rpx;
				.play-musci-tools-collect {
					display: flex;
					align-items: center;
					z-index: 1;
					.title {
						margin-left: 10rpx;
						text-align: center;
						font-size: 26rpx;
						color: #ffffff;
					}
				}
				.play-musci-tools-comment {
					display: flex;
					align-items: center;
					z-index: 1;
					.title {
						margin-left: 10rpx;
						text-align: center;
						font-size: 26rpx;
						color: #ffffff;
					}
				}
				.play-musci-tools-share {
					display: flex;
					align-items: center;
					z-index: 1;
					.title {
						margin-left: 10rpx;
						text-align: center;
						font-size: 26rpx;
						color: #ffffff;
					}
				}
			}
		}
	}
}
</style>
