<template>
	<view class="leader-board">
		<play-list-navbar></play-list-navbar>
		<view class="leader-board-wrap">
			<view class="tabs">
				<u-sticky>
					<u-tabs
						:list="listTabs"
						gutter="46"
						:current="currentIndex"
						@change="changeTabs"
						:is-scroll="false"
					></u-tabs>
				</u-sticky>
			</view>
			<view class="content-wrap">
				<scroll-view
					scroll-y="true"
					class="scroll-Y"
					:style="{ height: screenHeight + 'px' }"
					@scroll="scroll"
					:scroll-into-view="tabId"
					scroll-with-animation
				>
					<!-- 官方歌单 -->
					<view class="leader-list list" :id="'list' + 0">
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
					<leader-recomd
						class="list"
						:id="'list' + 1"
						:featuredLeaderList="featuredLeaderList"
						:title="featuredTitle"
					></leader-recomd>
					<!-- 曲风榜 -->
					<leader-recomd
						class="list"
						:id="'list' + 2"
						:featuredLeaderList="genreList"
						:title="genreLTitle"
					></leader-recomd>
					<!-- 全球榜 -->
					<leader-recomd
						class="list"
						:id="'list' + 3"
						:featuredLeaderList="worldList"
						:title="worldTitle"
					></leader-recomd>
					<!-- 特色榜 -->
					<leader-recomd
						class="list"
						:id="'list' + 4"
						:featuredLeaderList="traitList"
						:title="traitTitle"
					></leader-recomd>
				</scroll-view>
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
					name: '特色'
				}
			],
			// tabs切换
			currentIndex: 0,
			// swiper切换
			swiperCurrent: 0,
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
			traitTitle: '特色榜',
			// 滑动的id
			tabId: '',
			// 滑块高度
			scrollTop: 0,
			topList: [],
			// 屏幕高度
			screenHeight: 0
		};
	},
	component: {},
	onReady() {
		uni.getSystemInfo({
			success: res => {
				this.screenHeight = res.screenHeight;
			}
		});
	},
	mounted() {
		this.getTopListDetail();
		this.getNodeInfo();
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
		changeTabs(index) {
			this.currentIndex = index;
			this.tabId = 'list' + index;
		},
		// 滚动 获取每个标题间的距离，判断滚动的高度在哪个区间内
		scroll(e) {
			// console.log(e);
			let scrollTop = e.target.scrollTop + 1;
			for (let i = 0; i < this.topList.length; i++) {
				const h1 = this.topList[i];
				let h2 = this.topList[i + 1];
				if (scrollTop >= h1 && scrollTop < h2) {
					this.currentIndex = i;
				}
			}
			// this.scrollTop = e.detail.scrollTop;
		},
		getNodeInfo() {
			// 获取DOM 取得每个标题间的高度。exec执行
			let query = uni.createSelectorQuery().in(this);
			query
				.selectAll('.list')
				.boundingClientRect(data => {
					console.log('得到布局位置信息', data);
					let arr = [];
					data.map(item => {
						arr.push(item.top);
					});
					this.topList = arr;
				})
				.exec();
		}
		// scrollToLower() {
		// 	// 滚动到底部触发
		// 	setTimeout(() => {
		// 		this.currentIndex = this.list.length - 1;
		// 	}, 80);
		// }
	}
};
</script>

<style lang="scss" scoped>
.leader-board {
	width: 100%;
	padding-bottom: 90rpx;
	.leader-board-wrap {
		width: 100%;
		position: relative;
		.content-wrap {
			.scroll-Y {
				height: 100%;
				width: 100%;
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
}
</style>
