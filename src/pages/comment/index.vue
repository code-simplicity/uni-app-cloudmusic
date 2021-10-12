<template>
	<view class="comment-box">
		<!-- 头部 -->
		<view class="">
			<u-navbar back-text="返回" title="评论">
				<view slot="right">
					<u-icon
						class="right-icon"
						name="iconfont icon-fenxiang"
						custom-prefix="iconfont"
						size="40"
					></u-icon>
				</view>
			</u-navbar>
		</view>
		<!-- 内容区 -->
		<view class="comment-content">
			<view class="comment-content-header">
				<view class="comment-content-left">评论区</view>
				<view class="comment-content-right">
					<view
						class="title"
						v-for="(item, index) in commentType"
						:key="item.value"
						:class="commentTypeIndex === item.value ? 'active' : ''"
						@click="chooseType(item.value)"
					>
						{{ item.label }}
					</view>
				</view>
			</view>
			<comment-list @doCommentLike="doCommentLike" :commentList="commentList"></comment-list>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-8 7:12:40 ?F10: PM?
 * description 评论
 */

export default {
	name: 'Comment',
	data() {
		return {
			// 评论选项
			commentType: [
				{
					value: '推荐',
					label: '推荐'
				},
				{
					value: '最热',
					label: '最热'
				},
				{
					value: '最新',
					label: '最新'
				}
			],
			commentTypeIndex: '推荐',
			// 返回数量
			limit: 40,
			// 页数
			totle: 0,
			// 偏移量
			offset: 0,
			// 评论数据
			commentList: [],
			// 歌单id
			playListId: '',
			// 判断是歌单评论还是歌曲评论,传1是歌曲，传2是歌单
			type: 1
		};
	},
	computed: {},

	watch: {
		$Route(newVal, oldVal) {
			console.log(newVal, oldVal);
			let id = this.$Route.query.id;
			if (id) {
				this._initIaLize(id);
			}
		}
	},

	component: {},
	mounted() {
		let id = this.$Route.query.id;
		let type = this.$Route.query.type;
		this.type = type;
		if (id) {
			this.playListId = id;
			this._initIaLize(id);
		}
	},
	methods: {
		// 点赞
		doCommentLike(cid, liked) {
			let params = {
				id: this.playListId,
				cid,
				type: 2
			};
			// 判断是点赞还是取消点赞
			if (liked) {
				// 取消点赞
				params.t = 0;
			} else {
				params.t = 1;
			}
			let title = liked ? '取消点赞' : '点赞成功';
			this.$api.doCommentLike(params).then(res => {
				if (res.code === this.$code.code_status) {
					uni.showToast({
						title: title,
						icon: 'success'
					});
					this.getCommentPlayList(this.playListId);
				}
			});
		},

		// 获取相关评论
		getCommentPlayList(id, val) {
			let params = {
				id,
				limit: this.limit,
				offset: this.offset
			};
			if (this.type === 1) {
				this.$api.getCommentMusic(params).then(res => {
					if (res.code === this.$code.code_status) {
						if (val === '推荐') {
							this.commentList = res.hotComments;
						} else if (val === '最热') {
							// if (res.moreHot) {
							// 	this.offset += 40;
							// }
							this.commentList = res.hotComments;
						} else if (val === '最新') {
							// if (res.more) {
							// if (res.more) {
							// 	this.offset += 40;
							// }
							this.commentList = res.comments;
						}
					}
				});
			} else if (this.type === 2) {
				this.$api.getCommentPlayList(params).then(res => {
					if (res.code === this.$code.code_status) {
						if (val === '推荐') {
							this.commentList = res.hotComments;
						} else if (val === '最热') {
							// if (res.moreHot) {
							// 	this.offset += 40;
							// }
							this.commentList = res.hotComments;
						} else if (val === '最新') {
							// if (res.more) {
							// if (res.more) {
							// 	this.offset += 40;
							// }
							this.commentList = res.comments;
						}
					}
				});
			}
		},

		// 切换评论类型
		chooseType(val) {
			this.commentTypeIndex = val;
			this.getCommentPlayList(this.playListId, this.commentTypeIndex);
		},

		// 初始化函数
		_initIaLize(id) {
			this.getCommentPlayList(id, this.commentTypeIndex);
		}
	}
};
</script>

<style lang="scss" scoped>
.comment-box {
	width: 100%;
	height: 100%;
	.right-icon {
		margin-right: 30rpx;
	}
	.comment-content {
		width: 100%;
		padding: 20rpx;
		.comment-content-header {
			display: flex;
			justify-content: space-between;
			text-align: center;
			.comment-content-left {
				font-size: 28rpx;
			}
			.comment-content-right {
				display: flex;
				justify-content: space-between;
				text-align: center;
				.title {
					margin-left: 20rpx;
					color: #959595;
					&.active {
						color: #000000;
					}
				}
			}
		}
		.comment-content-bot {
			width: 100%;
			margin-top: 20rpx;
			.comment-content-hot-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.comment-left {
					display: flex;
					.avatar {
						margin-right: 20rpx;
					}
					.user-info {
						.user-name {
							font-size: 32rpx;
							margin-bottom: 10rpx;
						}
						.comment-time {
							font-size: 10rpx;
						}
					}
				}
				.comment-right {
					.text {
						font-size: 26rpx;
						margin-right: 20rpx;
					}
					.icon-like {
						&.active {
							color: #ff0000;
						}
					}
				}
			}
			.comment-info {
				margin-top: 20rpx;
				margin-left: 90rpx;
				.comment-info-txt {
					font-size: 28rpx;
				}
				.comment-info-num {
					margin-top: 6rpx;
					color: #000080;
					font-size: 24rpx;
				}
			}
		}
	}
}
</style>
