<template>
	<view class="user-play-list">
		<u-cell-group :border="false">
			<view class="user-play-header">
				<view class="user-play-header-text">{{ header }}</view>
				<view class="user-play-header-tools">
					<view class="user-play-header-add" v-if="header === '我创建的歌单'" @click="createUserPlay">
						<u-icon name="plus" color="#000000" size="30"></u-icon>
					</view>
					<view class="user-play-header-more" @click="updatePlayList">
						<u-icon class="tools-more" name="more-dot-fill" color="#000000" size="30"></u-icon>
					</view>
				</view>
			</view>

			<u-cell-item
				class="u-cell"
				:arrow="false"
				v-for="(item, index) of songList"
				:key="item.id"
				v-if="loginState"
			>
				<view slot="icon" class="user-play-image" @click="toPlayDetail(item.id)">
					<u-image
						width="100"
						height="100"
						border-radius="16"
						class="image-cover"
						:src="item.coverImgUrl"
						mode="aspectFit"
					></u-image>
					<view class="is-private" v-if="item.privacy === 10">
						<u-icon name="lock-fill" color="#000000" size="22"></u-icon>
					</view>
				</view>
				<view slot="title" class="user-play-detail" @click="toPlayDetail(item.id)">
					<view class="user-play-name">{{ item.name }}</view>
					<view class="user-play-num">
						<text class="user-list-count">{{ item.trackCount }}首</text>
						<text>by.{{ item.creator.nickname }}</text>
					</view>
				</view>
				<view slot="right-icon" class="user-play-tools">
					<u-icon
						class="tools-more"
						name="more-dot-fill"
						color="#000000"
						size="30"
						@click="showUpdatePlayList(item)"
					></u-icon>
				</view>
			</u-cell-item>
			<view class="user-play-no-login" v-if="!loginState">暂无歌单，请登录之后刷新</view>
		</u-cell-group>
		<!-- 打开弹窗 -->
		<view>
			<u-popup mode="bottom" border-radius="26" v-model="showPlay" height="400">
				<view class="user-play-create">
					<view class="header">
						<view class="header-left" @click="createUserPlay">取消</view>
						<view class="header-right" @click="createPlayList">完成</view>
					</view>
					<view class="center">
						<view class="center-tabs">
							<u-tabs
								:list="list"
								:is-scroll="false"
								:current="currentIndex"
								@change="changeTab"
							></u-tabs>
						</view>
					</view>
					<view class="bottom">
						<view class="input">
							<u-input
								v-model="playNamevalue"
								:type="type"
								:border="border"
								placeholder="输入新建歌单标题"
								:focus="true"
							/>
						</view>
						<view class="checkbox">
							<u-checkbox
								icon-size="26"
								label-size="26"
								size="26"
								shape="circle"
								@change="checkboxChange"
								v-model="valueRadio"
								name="10"
							>
								设置为隐私歌单
							</u-checkbox>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<view>
			<u-popup mode="bottom" border-radius="30" v-model="showUpdate" height="400">
				<view class="user-play-create">
					<u-cell-group :title="'歌单:' + popTitle" :title-style="{ 'font-size': '26rpx' }">
						<u-cell-item
							icon="file-text"
							title="编辑歌单信息"
							:arrow="false"
							v-if="this.header === '我创建的歌单'"
						></u-cell-item>
						<u-cell-item
							v-for="(item, index) in listCell"
							:key="index"
							:icon="item.icon"
							:title="item.title"
							:arrow="false"
							@click="checkCell(index)"
						></u-cell-item>
					</u-cell-group>
				</view>
			</u-popup>
			<!-- 弹窗删除框 -->
			<u-modal v-model="showDelete" :mask-close-able="true" :show-cancel-button="true" @confirm="deletePlayList">
				<view class="slot-content"><rich-text class="rich-text" :nodes="content"></rich-text></view>
			</u-modal>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-1 10:16:19 ?F10: PM?
 * description
 */
import { mapGetters } from 'vuex';
export default {
	name: 'user-play-list',
	data() {
		return {
			showPlay: false,
			list: [
				{
					name: '音乐歌单'
				},
				{
					name: '视频歌单'
				}
			],
			currentIndex: 0,
			// 歌单名称
			playNamevalue: '',
			// 类型
			type: 'text',
			// 是否展示边框
			border: true,
			// 选择是否为私密,传10为私密
			privacy: '',
			// 判断是否被选中
			valueRadio: false,
			// 单击编辑歌单
			showUpdate: false,
			// 右侧功能
			listCell: [
				{
					icon: 'download',
					title: '下载'
				},
				{
					icon: 'share',
					title: '分享'
				},
				{
					icon: 'trash',
					title: '删除'
				}
			],
			// 弹窗的标题
			popTitle: '',
			// 删除弹窗
			showDelete: false,
			// 删除提示
			content: '确定要删除此歌单吗？',
			// 歌单id
			playListId: ''
		};
	},

	props: {
		songList: {
			type: Array
		},

		header: {
			type: String
		}
	},

	computed: {
		...mapGetters('user', ['loginState'])
	},

	component: {},
	mounted() {},
	methods: {
		// 删除歌单
		deletePlayList() {
			let id = this.playListId;
			this.$api.deletePlayList(id).then(res => {
				if (res.code === this.$code.code_status) {
					uni.showToast({
						title: '删除歌单成功',
						icon: 'success'
					});
				}
			});
		},

		// 点击弹窗框
		checkCell(index) {
			// 打开删除弹窗
			if (index === 2) {
				this.showDelete = true;
			}
			this.showUpdatePlayList();
		},

		// 单击编辑歌单
		showUpdatePlayList(val) {
			this.showUpdate = !this.showUpdate;
			this.popTitle = val.name;
			this.playListId = val.id;
		},

		// 编辑歌单
		updatePlayList() {},

		// 改变tabs
		changeTab(index) {
			this.currentIndex = index;
		},

		// 选择框选择数据
		checkboxChange(e) {
			if (e.value) {
				this.privacy = e.name;
			} else {
				this.privacy = '';
			}
		},

		// 添加用户歌单
		createUserPlay() {
			this.showPlay = !this.showPlay;
		},

		// 创建用户歌单，有视频歌单和用户歌单
		createPlayList() {
			// 判断选中的是音乐歌单还是视频歌单
			let type = '';
			if (this.currentIndex === 0) {
				type = 'NORMAL';
			} else if (this.currentIndex === 1) {
				type = 'VIDEO';
			}
			let params = {
				name: this.playNamevalue,
				type: type,
				privacy: this.privacy
			};
			this.$api.createPlayList(params).then(res => {
				if (res.code === this.$code.code_status) {
					uni.showToast({
						title: '创建歌单成功',
						icon: 'success'
					});
					// 关闭弹窗
					this.resetValue();
					// 刷新数据
					this.$forceUpdate();
				}
			});
		},

		// 清空输入框的内容。关闭弹窗
		resetValue() {
			this.showPlay = false;
			this.playNamevalue = '';
		},

		// 去详情界面
		toPlayDetail(id) {
			this.$Router.push({
				name: 'PlayDetail',
				params: {
					id: id
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.user-play-list {
	width: 100%;
	display: flex;
	flex-direction: column;
	.user-play-create {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 20rpx 30rpx;
		.header {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.header-left {
				font-size: 32rpx;
			}
			.header-right {
				font-size: 32rpx;
			}
		}
		.center {
			display: flex;
			align-items: center;
			margin: 0 auto;
			margin-bottom: 20rpx;
			.center-tabs {
				width: 400rpx;
			}
		}
		.bottom {
			display: flex;
			flex-direction: column;
			.input {
				margin-bottom: 20rpx;
			}
			.checkbox {
				margin-bottom: 20rpx;
			}
		}
	}
	.slot-content {
		display: flex;
		align-items: center;
		.rich-text {
			margin: 0 auto;
		}
	}
	.user-play-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 12rpx;
		margin-bottom: 12rpx;
		.user-play-header-text {
			font-size: 30rpx;
		}
		.user-play-header-tools {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.user-play-header-add {
				font-size: 26rpx;
				margin-right: 40rpx;
			}
			.user-play-header-more {
				font-size: 26rpx;
				.tools-more {
					transform: rotate(90deg);
				}
			}
		}
	}
	.u-cell {
		padding: 14rpx 10rpx;
		.user-play-image {
			position: relative;
			.image-cover {
			}
			.is-private {
				position: absolute;
				bottom: 0;
				right: 6rpx;
				background-color: rgb(195, 195, 195, 0.5);
				border-radius: 16rpx;
			}
		}
		.user-play-detail {
			margin-left: 20rpx;
			.user-play-name {
				font-size: 28rpx;
				-webkit-line-clamp: 1; // 用来限制在一个块元素显示的文本的行数
				display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
				-webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
				text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
				overflow: hidden;
			}
			.user-play-num {
				font-size: 22rpx;
				.user-list-count {
					margin-right: 20rpx;
				}
			}
		}
		.user-play-tools {
			font-size: 26rpx;
			.tools-more {
				transform: rotate(90deg);
			}
		}
	}
	.user-play-no-login {
		display: flex;
		justify-content: center;
		margin: 10rpx auto;
		text-align: center;
		font-size: 26rpx;
	}
}
</style>
