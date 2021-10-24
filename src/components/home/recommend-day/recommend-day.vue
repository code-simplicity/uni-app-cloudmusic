<template>
	<view class="recommend-day">
		<view class="user-grid">
			<u-grid :col="5" :border="false">
				<u-grid-item :key="index" v-for="(item, index) in userGridData" @click="toDetail(item.text)">
					<view class="m-icon" :style="{ backgroundColor: item.backgroundColor }">
						<u-icon
							class="u-icon"
							size="50"
							:name="item.icon"
							custom-prefix="iconfont"
							color="#ffffff"
						></u-icon>
					</view>
					<view class="m-text">{{ item.text }}</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-25 11:10:17 ?F10: AM?
 * description
 */

export default {
	name: 'recommend-day',
	data() {
		return {
			userGridData: [
				{ text: '每日推荐', icon: 'iconfont icon-calendar', backgroundColor: '#e1262a' },
				{ text: '私人FM', icon: 'iconfont icon-diantai', backgroundColor: '#cec437' },
				{ text: '歌单', icon: 'iconfont icon-zuixingedan', backgroundColor: '#2f89e3' },
				{ text: '排行榜', icon: 'iconfont icon-paixingbang', backgroundColor: '#7f63c1' },
				{ text: '专辑', icon: 'iconfont icon-zhuanji', backgroundColor: '#c15726' }
			]
		};
	},
	component: {},
	mounted() {},
	methods: {
		toDetail(text) {
			switch (text) {
				case '每日推荐': {
					this.$Router.push({
						name: 'RecommendSongs'
					});
					break;
				}
				case '歌单': {
					this.$Router.push({
						name: 'PlayList'
					});
					break;
				}
				case '排行榜': {
					this.$Router.push({
						name: 'LeaderBoard'
					});
					break;
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.recommend-day {
	width: 100%;
	background-color: #ffffff;
	border-radius: 16rpx;
	.user-grid {
		width: 100%;
		.m-icon {
			border-radius: 50%;
			width: 80rpx;
			height: 80rpx;
			position: relative;
			.u-icon {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 20%;
			}
		}
		.m-text {
			margin-top: 12rpx;
			font-size: 24rpx;
		}
	}
}
</style>
