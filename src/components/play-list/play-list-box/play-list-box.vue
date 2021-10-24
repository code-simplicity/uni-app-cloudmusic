<template>
	<view class="play-list-box">
		<view class="play-list-wrap">
			<view class="play-list" v-for="(item, index) in playListBox" :key="item.id" @click="toPlayList(item.id)">
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
		<!-- 底部加载更多 -->
		<!-- <u-loading color="red" size="40"></u-loading> -->
		<u-loadmore :status="status" :icon="true" icon-color="#ff2a00" />
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
			// 是否拥有更多
			hasmore: true,
			status: 'loadmore'
		};
	},
	props: {},

	component: {},
	mounted() {
		this.getStatus();
	},
	methods: {
		// 传递是否有更多信息给父组件
		getStatus() {
			this.$emit('getStatus', this.status, this.hasmore);
		},

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
		getTopPlayList(cat, offset) {
			let params = {
				cat: cat,
				limit: this.limit,
				offset: offset
			};
			this.$api.getTopPlayList(params).then(res => {
				if (res.code === this.$code.code_status) {
					// 刷新之后出现数据
					this.playListBox = this.playListBox.concat(res.playlists);
					if (res.hasmore) {
						this.hasmore = res.hasmore;
						this.limit += this.limit * offset;
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.play-list-box {
	width: 100%;
	padding: 0 15rpx;
	padding-bottom: 100rpx;
	.play-list-wrap {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin-bottom: 26rpx;
		.play-list {
			display: flex;
			flex-direction: column;
			margin-left: 26rpx;
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
