<template>
	<view class="play-list-box">
		<view class="play-list-wrap">
			<view class="play-list" v-for="(item, index) in playListBox" :key="index" @click="toPlayList(item.id)">
				<view class="image">
					<u-image
						border-radius="16"
						width="200"
						height="200"
						:src="item.coverImgUrl"
						mode="aspectFill"
					></u-image>
					<view class="play-count">{{ utils.tranNumber(item.playCount, 1) }}</view>
				</view>
				<view class="bottom-desc">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-23 6:18:33 ?F10: PM?
 * description 歌单组件
 */

export default {
	name: 'play-list-box',
	data() {
		return {
			// 歌单列表
			playListBox: [],
			// 返回数据
			limit: 30,
			// 偏移量
			offset: 0
		};
	},
	props: {},

	component: {},
	mounted() {},
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

		// 获取歌单列表
		getTopPlayList(cat) {
			let params = {
				cat: cat,
				limit: this.limit,
				offset: this.offset
			};
			this.$api.getTopPlayList(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.playListBox = res.playlists;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.play-list-box {
	width: 100%;
	.play-list-wrap {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.play-list {
			display: flex;
			flex-direction: column;
			margin-left: 28rpx;
			.image {
				position: relative;
				margin-top: 30rpx;
				.play-count {
					position: absolute;
					top: 6rpx;
					right: 10rpx;
					color: #ffffff;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 10rpx;
					padding: 0 5rpx;
					font-size: 22rpx;
				}
			}
			.bottom-desc {
				margin-top: 20rpx;
				font-size: 24rpx;
				height: 60rpx;
				-webkit-line-clamp: 2;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				overflow: hidden;
				width: 210rpx;
			}
		}
	}
}
</style>
