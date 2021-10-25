<template>
	<view class="search-result">
		<view class="search-header">
			<u-navbar>
				<search-bar
					ref="searchBar"
					@search="onSearch"
					@custom="onSearch"
					@change="change"
					@focus="onFocus"
					@blur="onBlur"
				></search-bar>
			</u-navbar>
		</view>
		<view class="search-suggest-box" v-if="showSuggest">
			<u-cell-item
				v-for="(item, index) in searchSuggest"
				:key="index"
				icon="search"
				:title="item.keyword"
				:arrow="false"
				icon-size="36"
				@click="onSearch(item.keyword)"
			></u-cell-item>
		</view>
		<view class="search-wrap">
			<u-tabs-swiper
				ref="uTabs"
				:list="searchList"
				:current="currentTab"
				@change="tabChange"
				:is-scroll="true"
				active-color="#e51419"
				swiperWidth="750"
			></u-tabs-swiper>
		</view>
		<swiper
			class="search-swiper"
			:style="{ height: screenHeight + 'px' }"
			:current="swiperCurrent"
			@transition="transition"
			@animationfinish="animationfinish"
		>
			<!-- 综合 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%; height: 94%;" @scrolltolower="onreachBottom">
					<search-multiple ref="searchMultiple"></search-multiple>
				</scroll-view>
			</swiper-item>

			<!-- 单曲 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%; height: 94%;" @scrolltolower="onreachBottom">
					<search-song ref="searchSong"></search-song>
				</scroll-view>
			</swiper-item>

			<!-- 歌单 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%; height: 94%;" @scrolltolower="onreachBottom">
					<search-play-list ref="searchPlayList"></search-play-list>
				</scroll-view>
			</swiper-item>

			<!-- 视频 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%; height: 94%;" @scrolltolower="onreachBottom">
					<search-video ref="searchVideo"></search-video>
				</scroll-view>
			</swiper-item>

			<!-- 歌手 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%; height: 94%;" @scrolltolower="onreachBottom">
					<search-singer ref="searchSinger"></search-singer>
				</scroll-view>
			</swiper-item>

			<!-- 歌词 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%; height: 94%;" @scrolltolower="onreachBottom">
					<search-lyric ref="searchLyric"></search-lyric>
				</scroll-view>
			</swiper-item>

			<!-- 专辑 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%; height: 94%;" @scrolltolower="onreachBottom">
					<search-album ref="searchAlbum"></search-album>
				</scroll-view>
			</swiper-item>

			<!-- 用户 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="width: 100%; height: 94%;" @scrolltolower="onreachBottom">
					<search-user ref="searchUser"></search-user>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 底部播放器 -->
		<music-player></music-player>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-6 9:04:28 ?F10: AM?
 * description
 */

export default {
	name: 'search-result',
	data() {
		return {
			// 搜索关键字
			searchKeyword: '',
			// 输入框默认搜索
			searchDefault: '',
			// 选项卡
			searchList: [
				{
					type: 1018,
					name: '综合'
				},
				{
					type: 1,
					name: '单曲'
				},
				{
					type: 1000,
					name: '歌单'
				},
				{
					type: 1014,
					name: '视频'
				},
				{
					type: 100,
					name: '歌手'
				},
				{
					type: 1006,
					name: '歌词'
				},
				{
					type: 10,
					name: '专辑'
				},
				{
					type: 1002,
					name: '用户'
				}
			],
			// 选项卡的值
			currentTab: 0,
			// 控制切换选项卡
			swiperCurrent: 0,
			// 建议搜索
			searchSuggest: [],
			// 显示搜索建议
			showSuggest: false,
			// 屏幕高度
			screenHeight: 0
		};
	},

	component: {},

	onLoad() {
		// 放入这个生命周期中，当外部点击搜索之后，在直接显示出搜索结果
		let searchKeyword = this.$Route.query.searchKeyword;
		if (searchKeyword) {
			this.searchKeyword = searchKeyword;
		}
	},

	onReady() {
		this.getCloudSearch(this.searchKeyword, this.swiperCurrent);

		uni.getSystemInfo({
			success: res => {
				this.screenHeight = res.screenHeight;
			}
		});
	},

	created() {},

	mounted() {
		this.$refs.searchBar.setKeyword(this.searchKeyword);
	},

	methods: {
		// 搜索框获取焦点之后，出现搜索建议
		onFocus() {
			this.showSuggest = true;
		},

		// 失去焦点
		onBlur() {
			this.showSuggest = false;
		},
		// 值改变之后出现搜索建议的框
		change(val) {
			if (val) {
				this.getSearchSuggest(val);
			}
		},

		// 建议搜索
		getSearchSuggest(keywords) {
			let params = {
				keywords,
				type: 'mobile'
			};
			this.$api.getSearchSuggest(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.searchSuggest = res.result.allMatch;
				}
			});
		},

		// 执行搜索
		onSearch(keyword) {
			if (!keyword) {
				return;
			}
			this.searchKeyword = keyword;
			this.$refs.searchBar.setKeyword(keyword);
			// 执行搜索，传入关键字以及tabs切换的值
			this.getCloudSearch(keyword, this.swiperCurrent);
		},

		/**
		 * 搜索
		 * type: 搜索类型；取值意义 : 1: 单曲,
		 * 10: 专辑, 100: 歌手,
		 * 1000: 歌单, 1002: 用户,
		 * 1004: MV, 1006: 歌词,
		 *  1009: 电台, 1014: 视频, 1018:综合
		 */
		getCloudSearch(keyword, index) {
			if (!keyword) {
				return;
			}
			// 综合,传递输入框关键字给子组件
			switch (index) {
				case 0: {
					this.$refs.searchMultiple.getSearchMultimatch(keyword);
					break;
				}
				case 1: {
					this.$refs.searchSong.getSearchSongs(keyword);
					break;
				}
				case 2: {
					this.$refs.searchPlayList.getSearchPlayList(keyword);
					break;
				}
				case 3: {
					this.$refs.searchVideo.getSearchVideo(keyword);
					break;
				}
				case 4: {
					this.$refs.searchSinger.getSearchArtist(keyword);
					break;
				}
				case 5: {
					this.$refs.searchLyric.getSearchLyric(keyword);
					break;
				}
				case 6: {
					this.$refs.searchAlbum.getSearchAlbum(keyword);
					break;
				}
				case 7: {
					this.$refs.searchUser.getSearchUser(keyword);
					break;
				}
			}
		},

		// tabs通知swiper切换
		tabChange(index) {
			this.swiperCurrent = index;
			console.log(index);
			this.getCloudSearch(this.searchKeyword, index);
		},

		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},

		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			if (this.currentTab !== current) {
				this.getCloudSearch(this.searchKeyword, current);
			}
			this.currentTab = current;
		},

		// scroll-view到底部加载更多
		onreachBottom() {
			console.log('没有更多了!');
		}
	}
};
</script>

<style lang="scss" scoped>
.search-result {
	width: 100%;
	height: 100%;
	position: relative;
	.search-header {
		width: 100%;
	}
	.search-suggest-box {
		width: 100%;
		position: absolute;
		top: 80rpx;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ffffff;
		border: 1px solid #b0b0b0;
		border-radius: 16rpx;
		z-index: 1000;
	}
	.search-wrap {
		width: 100%;
		position: fixed;
		z-index: 999;
	}
	.search-swiper {
		flex: 1;
		margin-top: 80rpx;
	}
}
</style>
