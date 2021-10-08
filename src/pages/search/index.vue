<template>
	<view class="search-box">
		<view class="search-header">
			<u-navbar><search-bar @search="search" @custom="search" @change="change"></search-bar></u-navbar>
		</view>
		<view class="search-suggest-box" v-if="showSuggest">
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
		<view class="search-content">
			<view class="search-history">
				<view class="search-history-title">
					<text>历史记录</text>
					<view class="search-history-trash">
						<u-icon name="trash" color="#515151" size="45" @click="delAllSearch"></u-icon>
					</view>
				</view>
				<view class="search-history-tags" v-if="searchHistory.length > 0">
					<view class="search-tags" v-for="(item, index) in searchHistory" :key="index">
						<view class="search-btn" @click="tagSearch(item)">{{ item }}</view>
						<view class="close-dark" @click="delTags(item)">
							<u-icon name="close-circle" color="#515151" size="28"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="search-hot">
				<view class="search-hot-title">热搜榜</view>
				<view class="search-hot-list">
					<u-row gutter="16" justify="bewteen">
						<u-col span="6" v-for="(item, index) in hotSearch" :key="index">
							<view class="search-hot-content" @click="tagSearch(item.searchWord)">
								<view class="number" :class="index < 3 ? 'red-index' : ''">{{ index + 1 }}</view>
								<view class="word u-line-1" :class="index < 3 ? 'bold-word' : ''">
									{{ item.searchWord }}
								</view>
								<view class="tip" v-if="item.iconUrl">
									<image
										class="image-tip"
										:src="item.iconUrl + '?param=300y300'"
										mode="aspectFit"
									></image>
								</view>
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-9-24 9:30:28 ?F10: PM?
 * description
 */
import { mapGetters, mapActions } from 'vuex';
export default {
	name: 'Search',
	data() {
		return {
			// 搜索关键字
			searchKeyword: '',
			// 热搜榜
			hotSearch: [],
			// 输入框默认搜索
			// searchDefault: '',
			searchSuggest: [],
			// 显示搜索建议
			showSuggest: false
		};
	},

	computed: {
		...mapGetters('search', ['searchHistory'])
	},

	component: {},
	mounted() {
		this.getSearchHotDetail();
		// this.getSearchDefault();
	},
	methods: {
		// 输入框内容变化之后展示建议搜索列表
		change(val) {
			if (val) {
				this.getSearchSuggest(val);
				this.showSuggest = true;
			} else {
				this.showSuggest = false;
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

		// 删除全部
		delAllSearch() {
			this.clearSearchHistory();
		},

		// 删除搜索历史记录
		delTags(searchKeyword) {
			this.deleteSearchHistory(searchKeyword);
		},

		// 点击标签搜索
		tagSearch(searchKeyword) {
			// 跳转到搜索结果页面
			this.$Router.push({
				name: 'SearchResult',
				params: {
					searchKeyword: searchKeyword
				}
			});
		},

		// 输入框搜索
		search(val) {
			if (val.split(' ').join(' ').length !== 0) {
				// 跳转到搜索结果页面
				this.$Router.push({
					name: 'SearchResult',
					params: {
						searchKeyword: val
					}
				});
				// 保存搜索记录
				this.saveSearchHistory(val);
				// 清空搜索框
				this.searchKeyword = '';
			}
		},

		// // 获取默认搜索关键字
		// getSearchDefault() {
		// 	this.$api.getSearchDefault().then(res => {
		// 		if (res.code === this.$code.code_status) {
		// 			this.searchDefault = res.data.showKeyword;
		// 		}
		// 	});
		// },

		// 获取热搜榜(详细)
		getSearchHotDetail() {
			this.$api.getSearchHotDetail().then(res => {
				if (res.code === this.$code.code_status) {
					this.hotSearch = res.data;
				}
			});
		},

		...mapActions('search', ['saveSearchHistory', 'deleteSearchHistory', 'clearSearchHistory'])
	}
};
</script>

<style lang="scss" scoped>
.search-box {
	width: 100%;
	height: 100%;
	.search-header {
		width: 100%;
	}
	.search-suggest-box {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ffffff;
		border: 1px solid #b0b0b0;
		border-radius: 16rpx;
		z-index: 666;
	}
	.search-content {
		width: 100%;
		padding: 20rpx;
		.search-history {
			display: flex;
			flex-direction: column;
			.search-history-title {
				display: flex;
				margin-bottom: 16rpx;
				justify-content: space-between;
				.search-history-trash {
				}
			}
			.search-history-tags {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				.search-tags {
					background-color: #dfdadc;
					display: flex;
					margin: 10rpx;
					padding: 10rpx;
					border-radius: 16rpx;
					flex-direction: row;
					align-items: center;
					.search-btn {
						color: #515151;
					}
					.close-dark {
						margin-left: 10rpx;
						text-align: center;
					}
				}
			}
		}
		.search-hot {
			margin-top: 16rpx;
			display: flex;
			flex-direction: column;
			.search-hot-title {
				margin-bottom: 16rpx;
			}
			.search-hot-list {
				display: flex;
				flex-direction: row;
				width: 100%;
				background-color: #ffffff;
				border-radius: 16rpx;
				.search-hot-content {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin: 16rpx;
					.number {
						margin-right: 16rpx;
						font-size: 30rpx;
						&.red-index {
							color: #ff0000;
						}
					}
					.word {
						flex-wrap: nowrap;
						&.bold-word {
							font-weight: 600;
						}
					}
					.tip {
						width: 30rpx;
						height: 30rpx;
						.image-tip {
							margin-left: 10rpx;
							width: 50rpx;
							height: 50rpx;
						}
					}
				}
			}
		}
	}
}
</style>
