<template>
	<view class="leader-board">
		<play-list-navbar></play-list-navbar>
		<view class="leader-board-wrap">
			<view class="tabs">
				<u-sticky>
					<u-tabs
						:list="listTabs"
						gutter="46"
						:is-scroll="true"
						:current="currentIndex"
						@change="changeTabs"
					></u-tabs>
				</u-sticky>
			</view>
			<view class="content-wrap">
				<!-- 官方歌单 -->
				<view class="leader-list">
					<view class="header">
						<u-icon name="kefu-ermai" size="40" color="#ff060a"></u-icon>
						官方榜
					</view>
					<leader-list
						v-for="(item, index) in leaderList"
						:key="index"
						:leaderList="item"
						:indexs="index"
					></leader-list>
				</view>

				<!-- 精选榜 -->
				<leader-recomd :featuredLeaderList="featuredLeaderList" :title="featuredTitle"></leader-recomd>
				<!-- 曲风榜 -->
				<leader-recomd :featuredLeaderList="genreList" :title="genreLTitle"></leader-recomd>
				<!-- 全球榜 -->
				<leader-recomd :featuredLeaderList="worldList" :title="worldTitle"></leader-recomd>
				<!-- 特色榜 -->
				<leader-recomd :featuredLeaderList="traitList" :title="traitTitle"></leader-recomd>
			</view>
		</view>
		<music-player></music-player>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-22 1:56:11 ?F10: PM?
 * description 排行榜页面
 */

export default {
	name: 'leader-board',
	data() {
		return {
			// 顶部状态
			listTabs: [
				{
					name: '官方'
				},
				{
					name: '精选'
				},
				{
					name: '曲风'
				},
				{
					name: '全球'
				},
				{
					name: 'MV'
				},
				{
					name: '特色'
				}
			],
			currentIndex: 0,
			// 官方歌单
			leaderList: {},
			// 精选榜
			featuredLeaderList: [],
			// 精选榜title
			featuredTitle: '精选榜',
			// 曲风榜
			genreList: [],
			// 曲风榜title
			genreLTitle: '曲风榜',
			// 全球榜
			worldList: [],
			// 全球榜title
			worldTitle: '全球榜',
			// 特色榜
			traitList: [],
			// 特色榜title
			traitTitle: '特色榜'
		};
	},
	component: {},
	mounted() {
		this.getTopListDetail();
	},
	methods: {
		// 获取榜单的列表
		getTopListDetail() {
			this.$api.getTopListDetail().then(res => {
				if (res.code === this.$code.code_status) {
					let leaderList = res.list;
					this.leaderList = leaderList.slice(0, 4);
					// 精选榜
					this.featuredLeaderList = leaderList.slice(4, 5).concat(leaderList.slice(25, 30));
					// 曲风榜
					this.genreList = leaderList
						.slice(19, 22)
						.concat(leaderList.slice(5, 9), leaderList.slice(10, 11), leaderList.slice(24, 25));
					// 全球榜
					this.worldList = leaderList
						.slice(9, 10)
						.concat(
							leaderList.slice(11, 19),
							leaderList.slice(23, 24),
							leaderList.slice(30, 32),
							leaderList.slice(33, 34)
						);
					// 特色榜
					this.traitList = leaderList.slice(22, 23).concat(leaderList.slice(32, 33));
				}
			});
		},
		// 改变tabs
		changeTabs(val) {
			this.currentIndex = val;
		}
	}
};
</script>

<style lang="scss" scoped>
.leader-board {
	width: 100%;
	padding-bottom: 80rpx;
	.leader-board-wrap {
		width: 100%;
		position: relative;
		.content-wrap {
			.leader-list {
				.header {
					padding: 20rpx 30rpx 10rpx;
					font-size: 38rpx;
					font-weight: 600;
				}
			}
		}
	}
}
</style>
