<template>
	<view class="play-list-board">
		<view class="header" @click="toLeaderBoardDetail(playboardList.id)">
			{{ playboardList.name }}榜
			<u-icon name="arrow-right"></u-icon>
		</view>
		<u-cell-group :border="false">
			<u-cell-item
				:arrow="false"
				v-for="(item, index) in playList"
				:key="index"
				class="u-cell"
				@click="toPlayList(item.id)"
			>
				<view slot="icon" class="slot-icon">
					<text class="index-text">{{ index + 1 }}</text>
					<u-image
						width="100"
						height="100"
						border-radius="16"
						:src="item.coverImgUrl"
						mode="aspectFit"
					></u-image>
				</view>
				<view slot="title" class="slot-title">
					<view class="name">{{ item.name }}</view>
					<view class="des">
						<text>播放：{{ utils.tranNumber(item.playCount, 1) }}次</text>
						<text>, by. {{ item.creator.nickname }}</text>
					</view>
				</view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-23 3:35:51 ?F10: PM?
 * description
 */

export default {
	name: 'play-list-board',
	data() {
		return {
			// 歌单
			playList: []
		};
	},
	props: {
		playboardList: {
			type: Object
		}
	},

	component: {},
	mounted() {
		this.getTopPlayList();
	},
	methods: {
		// 进入歌单详情
		toPlayList(id) {
			this.$Router.push({
				name: 'PlayDetail',
				params: {
					id
				}
			});
		},

		// 获取歌单(网友精选)
		getTopPlayList() {
			let params = {
				cat: this.playboardList.name,
				limit: this.limit,
				offset: this.offset
			};
			this.$api.getTopPlayList(params).then(res => {
				if (res.code === this.$code.code_status) {
					let playList = res.playlists;
					this.playList = playList.slice(0, 3);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.play-list-board {
	width: 100%;
	padding: 10rpx;
	.header {
		text-align: center;
		font-size: 30rpx;
		margin-bottom: 10rpx;
	}
	.u-cell {
		padding: 16rpx;
		.slot-icon {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 16rpx;
			.index-text {
				margin-right: 20rpx;
				font-size: 32rpx;
				color: #ff0000;
			}
		}

		.slot-title {
			display: flex;
			flex-direction: column;
			.name {
				margin-left: 16rpx;
				font-size: 26rpx;
				-webkit-line-clamp: 1; // 用来限制在一个块元素显示的文本的行数
				display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
				-webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
				text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
				overflow: hidden;
			}
			.des {
				font-size: 22rpx;
				margin-left: 6rpx;
			}
		}
	}
}
</style>
