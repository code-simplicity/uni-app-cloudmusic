<template>
	<view class="play-music-search">
		<u-navbar><search-bar @search="search" @custom="search" @change="change"></search-bar></u-navbar>
		<view class="search-suggest-box" v-if="showList">
			<u-cell-item
				v-for="(item, index) in searchSuggest"
				:key="index"
				icon="search"
				:title="item.keyword"
				:arrow="false"
				icon-size="36"
				@click="tagSearch(item.keyword)"
			></u-cell-item>
		</view>
		<!-- 最近播放列表 -->
		<view class="music-list" v-if="!showSuggest">
			<view class="header">播放历史记录</view>
			<u-cell-item
				class="u-cell"
				:arrow="false"
				v-for="(item, index) of historyList"
				:key="item.id"
				@click="addMusic(item, index)"
			>
				<view slot="icon" class="slot-icon">
					<view class="">{{ utils.formatZero(index + 1, 2) }}</view>
					<view class="image">
						<u-image width="100" height="100" border-radius="16" :src="item.image"></u-image>
					</view>
				</view>
				<view slot="title" class="singer-title">
					<view class="songs-name">{{ item.name }}</view>
					<view class="singer-name">{{ item.singer }}</view>
				</view>
				<view slot="right-icon"><u-icon name="plus" @click="addMusic(item, index)" size="36"></u-icon></view>
			</u-cell-item>
		</view>
		<view class="music-list" v-if="!showList">
			<u-cell-item
				class="u-cell"
				:arrow="false"
				v-for="(item, index) of searchList"
				:key="item.id"
				@click="addMusic(item, index)"
			>
				<view slot="icon" class="slot-icon">
					<view class="">{{ utils.formatZero(index + 1, 2) }}</view>
					<view class="image">
						<u-image width="100" height="100" border-radius="16" :src="item.image"></u-image>
					</view>
				</view>
				<view slot="title" class="singer-title">
					<view class="songs-name">{{ item.name }}</view>
					<view class="singer-name">{{ item.singer }}</view>
				</view>
				<view slot="right-icon"><u-icon name="plus" @click="addMusic(item, index)" size="36"></u-icon></view>
			</u-cell-item>
		</view>
		<view><u-toast ref="uToast" /></view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-19 10:36:11 ?F10: AM?
 * description 歌单搜索结果
 */
import { mapGetters } from 'vuex';
import { createSong } from '@/utils/song.js';
export default {
	name: 'play-music-search',
	data() {
		return {
			// 歌单id
			pid: '',
			// 显示搜索建议
			showSuggest: false,
			// 建议搜索
			searchSuggest: [],
			// 搜索关键字
			searchKeyword: '',
			// 展示数据
			showList: false,
			// 搜索结果
			searchList: [],
			// 搜索类型为 1:单曲
			searchType: 1
		};
	},
	computed: {
		...mapGetters('player', ['historyList'])
	},

	component: {},
	mounted() {
		let pid = this.$Route.query.pid;
		if (pid) {
			this.pid = pid;
		}
	},
	methods: {
		// 添加音乐到歌单
		addMusic(item, index) {
			let { pid } = this;
			let params = {
				op: 'add',
				pid: pid,
				tracks: item.id
			};
			this.$api.addPlaylistTracks(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.$refs.uToast.show({
						title: '已收藏到歌单',
						type: 'success',
						duration: 2000
					});
				}
			});
		},
		// 输入框内容变化之后展示建议搜索列表
		change(val) {
			if (val) {
				this.getSearchSuggest(val);
				this.showSuggest = !this.showSuggest;
				this.showList = !this.showList;
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

		// 点击标签搜索
		tagSearch(searchKeyword) {
			this.getSearchSongs(searchKeyword);
			this.showList = !this.showList;
		},

		// 单曲搜索
		getSearchSongs(keyword) {
			// 调用搜索接口
			let params = {
				keywords: keyword,
				type: this.searchType
			};
			this.$api.getSearch(params).then(res => {
				if (res.code === this.$code.code_status) {
					let list = res.result.songs;
					let sliceArr = [];
					list.map(item => {
						sliceArr.push(item.id);
					});
					this.getSongDetail(sliceArr);
				}
			});
		},

		// 将搜索结果的单曲id赋值给获取歌曲id的接口，
		getSongDetail(sliceArr) {
			let timestamp = new Date().valueOf();
			// 将歌曲以逗号隔开
			let ids = sliceArr.join(',');
			let params = {
				ids,
				timestamp
			};
			this.$api.getSongDetail(params).then(res => {
				this.searchList = this._normalizeSongs(res.songs);
			});
		},

		// 处理歌曲
		_normalizeSongs(list) {
			let res = [];
			list.map(item => {
				if (item.id) {
					res.push(createSong(item));
				}
			});
			return res;
		}
	}
};
</script>

<style lang="scss" scoped>
.play-music-search {
	width: 100%;
	.music-list {
		width: 100%;
		.header {
			margin-top: 20rpx;
			font-size: 30rpx;
			margin-left: 20rpx;
		}
		.u-cell {
			padding: 14rpx;
			.slot-icon {
				display: flex;
				align-items: center;
				margin-right: 30rpx;
				.image {
					margin-left: 16rpx;
				}
			}
			.singer-title {
				.songs-name {
					font-size: 28rpx;
					-webkit-line-clamp: 1; // 用来限制在一个块元素显示的文本的行数
					display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
					-webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
					text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
					overflow: hidden;
				}
				.singer-name {
					font-size: 24rpx;
					-webkit-line-clamp: 1; // 用来限制在一个块元素显示的文本的行数
					display: -webkit-box; // 将对象作为弹性伸缩盒模型显示
					-webkit-box-orient: vertical; //设置或检查伸缩盒对象的子元素的排列方式
					text-overflow: ellipsis; // 在多行文本的情况下，用...隐藏超出范围的文本
					overflow: hidden;
				}
			}
		}
	}
}
</style>
