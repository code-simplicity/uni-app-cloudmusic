<template>
	<view class="focus-content">
		<!-- 关注列表 -->
		<view class="focus-user-list">
			<scroll-view scroll-x="true" class="scroll-x">
				<view class="scroll-box">
					<view class="left">
						<view class="left-find"><u-avatar src="src" size="90"></u-avatar></view>
						<view class="left-find-user">发现好友</view>
					</view>
					<view
						class="center"
						v-for="(item, index) in focusUserList"
						:key="index"
						@click="toUserDetail(item.userId)"
					>
						<view class="center-list">
							<view class="center-user"><u-avatar :src="item.avatarUrl" size="90"></u-avatar></view>
							<view class="center-user-name">{{ item.nickname }}</view>
						</view>
					</view>
					<view class="right">
						<view class="left-find"><u-avatar src="src" size="90"></u-avatar></view>
						<view class="left-find-user">全部好友</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 用户动态 -->
		<view class="focus-user-dynamics">
			<view class="dynamics-header flex-between">
				<view class="left">我的关注</view>
				<view class="right flex">
					<view
						class="musci"
						v-for="(item, index) in list"
						:key="index"
						:class="listIndex === item.value ? 'active' : ''"
						@click="chooseType(item.value)"
					>
						{{ item.label }}
					</view>
				</view>
			</view>
			<view class="dynamics-content flex-layout" v-for="(item, index) in eventList" :key="index">
				<view class="left">
					<u-avatar :src="item.user.avatarUrl" size="80" @click="toUserDetail(item.user.userId)"></u-avatar>
				</view>
				<view class="right">
					<view class="right-top">
						<view class="user-name">{{ item.user.nickname }}</view>
						<view class="time">{{ utils.formatMsgTime(item.showTime) }}</view>
					</view>
					<view class="right-center">{{ eventJson[index].msg }}</view>
					<view class="image-box" v-if="item.pics.length > 1">
						<view
							class="image-list"
							v-for="(item1, index1) in item.pics"
							:key="index1"
							@click="previewImage(item.pics, index1)"
						>
							<u-image
								border-radius="16rpx"
								width="100%"
								height="100%"
								mode="aspectFill"
								:src="item1.originUrl"
							></u-image>
						</view>
					</view>
					<view class="image-box-one" v-if="item.pics.length === 1">
						<view
							class="image-list"
							v-for="(item2, index2) in item.pics"
							:key="index2"
							@click="previewImage(item.pics, index2)"
						>
							<u-image
								border-radius="16rpx"
								width="100%"
								height="100%"
								mode="aspectFill"
								:src="item2.originUrl"
							></u-image>
						</view>
					</view>
					<view class="music" v-if="eventJson[index].song" @click="playMusic(index)">
						<view class="music-image">
							<u-image width="70rpx" height="70rpx" :src="eventJson[index].song.img80x80"></u-image>
							<view class="play-icon"><u-icon name="play-right" size="30" color="#eeebee"></u-icon></view>
						</view>
						<view class="music-info">
							<view class="music-info-name">{{ eventJson[index].song.name }}</view>
							<view class="music-info-singer">{{ eventJson[index].song.artists[0].name }}</view>
						</view>
					</view>
					<view class="tools">
						<view class="share">
							<u-icon name="share" size="36" :label="item.info.shareCount"></u-icon>
						</view>
						<view class="chat">
							<u-icon name="chat" size="36" :label="item.info.commentCount"></u-icon>
						</view>
						<view class="thumb-up">
							<u-icon name="thumb-up" size="36" :label="item.info.likedCount"></u-icon>
						</view>
						<view class="more-dot-fill"><u-icon name="more-dot-fill" size="36"></u-icon></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-14 9:59:12 ?F10: PM?
 * description 动态
 */

import { mapGetters, mapActions } from 'vuex';
import { createSong } from '@/utils/song.js';
export default {
	name: 'focus-dynamics',
	data() {
		return {
			// 功能列表
			list: [
				{
					label: '全部',
					value: '全部'
				},
				{
					label: '音乐人',
					value: '音乐人'
				},
				{
					label: '朋友',
					value: '朋友'
				}
			],
			listIndex: '全部',
			// 用户关注列表
			focusUserList: [],
			// 动态每页返回数据
			pagesize: 20,
			// 动态数据
			eventList: [],
			// 解析之后的json数据
			eventJson: [],
			// 歌曲
			newSong: []
		};
	},
	component: {},
	computed: {
		...mapGetters('user', ['userInfo'])
	},

	mounted() {
		let uid = this.userInfo.userId;
		if (uid) {
			this.getUserFollows(uid);
		}
		this.getEvent();
	},
	methods: {
		// 图片预览
		previewImage(list, index) {
			// 将图片遍历成一个字符串数组
			let urlsArr = [];
			if (list.length > 0) {
				list.map(item => {
					urlsArr.push(item.originUrl);
				});
			}
			uni.previewImage({
				current: index,
				urls: urlsArr,
				loop: true,
				longPressActions: {
					//长按保存图片到相册
					itemList: ['发送给朋友', '保存图片', '收藏'],
					success: res => {
						uni.saveImageToPhotosAlbum({
							//保存图片到相册
							filePath: urlsArr[res.index],
							success: function() {
								uni.showToast({ icon: 'success', title: '保存成功' });
							},
							fail: err => {
								uni.showToast({ icon: 'none', title: '保存失败，请重新尝试' });
							}
						});
					},
					fail: err => {
						console.log(err.errMsg);
					}
				}
			});
		},

		// 播放音乐
		playMusic(index) {
			this.selectPlay({
				list: this.newSong,
				index
			});
		},

		// 格式化音乐
		formatSongs(list) {
			let arr = [];
			list.map(item => {
				if (item.id) {
					arr.push(createSong(item));
				}
			});
			return arr;
		},

		// 选择类型
		chooseType(val) {
			this.listIndex = val;
			this.getEvent();
		},

		// 获取用户动态
		getEvent() {
			let pagesize = this.pagesize;
			this.$api.getEvent(pagesize).then(res => {
				if (res.code === this.$code.code_status) {
					this.eventList = res.event;
					let eventJson = [];
					// 解析json
					let arr = res.event;
					arr.forEach(item => {
						let Object = {};
						Object = JSON.parse(item.json);
						eventJson.push(Object);
					});
					this.eventJson = eventJson;
					let newSong = [];
					eventJson.map(item => {
						if (item.song) {
							newSong.push(item.song);
						}
					});
					this.newSong = this.formatSongs(newSong);
					console.log('this.eventJson', this.eventJson);
				}
			});
		},

		// 去用户信息列表
		toUserDetail(id) {
			this.$Router.push({
				name: 'UserInfoDetail',
				params: {
					id
				}
			});
		},

		// 获取用户关注列表
		getUserFollows(uid) {
			let params = {
				uid
			};
			this.$api.getUserFollows(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.focusUserList = res.follow;
				}
			});
		},

		...mapActions('player', {
			selectPlay: 'selectPlay'
		})
	}
};
</script>

<style lang="scss" scoped>
.focus-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 16rpx;
	.focus-user-list {
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #bebebe;
		.scroll-x {
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			.scroll-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;
				.left,
				.right {
					.left-find {
					}
					.left-find-user {
						font-size: 22rpx;
					}
				}

				.center {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.center-list {
						font-size: 22rpx;
						width: 130rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						.center-user {
						}
						.center-user-name {
							width: 100rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							text-align: center;
							word-break: break-word;
						}
					}
				}
			}
		}
	}
	.focus-user-dynamics {
		width: 100%;
		margin-top: 20rpx;
		.dynamics-header {
			.right {
				.musci {
					margin: 0 10rpx;
					color: #afafaf;
					&.active {
						color: #000000;
					}
				}
			}
		}
		.dynamics-content {
			margin-top: 20rpx;
			padding: 0 10rpx 16rpx 10rpx;
			border-bottom: 1px solid #bebebe;
			.left {
				margin-right: 20rpx;
			}
			.right {
				width: 100%;
				display: flex;
				flex-direction: column;
				.right-top {
					.user-name {
						font-size: 30rpx;
						margin-bottom: 10rpx;
					}
					.time {
						font-size: 22rpx;
						margin-bottom: 16rpx;
					}
				}
				.right-center {
					margin-bottom: 16rpx;
				}
				.image-box {
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;
					margin-bottom: 20rpx;
					.image-list {
						width: 200rpx;
						height: 200rpx;
						padding: 5rpx;
						box-sizing: border-box;
					}
				}
				.image-box-one {
					width: 100%;
					margin-bottom: 20rpx;
					.image-list {
						width: 100%;
						height: 300rpx;
						border: 1px solid #bebebe;
						box-sizing: border-box;
					}
				}
				.music {
					width: 100%;
					background-color: #d8d8d8;
					border-radius: 16rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					padding: 10rpx;
					margin-bottom: 20rpx;
					.music-image {
						margin-right: 20rpx;
						position: relative;
						.play-icon {
							position: absolute;
							top: 25%;
							left: 25%;
							display: flex;
						}
					}
					.music-info {
						.music-info-name {
							font-size: 26rpx;
						}
						.music-info-singer {
							font-size: 22rpx;
							color: #505050;
						}
					}
				}
				.tools {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.more-dot-fill {
						transform: rotate(90deg);
					}
				}
			}
		}
	}
}
</style>
