<template>
	<view class="search-multiple">
		<!-- 感兴趣 -->
		<u-cell-group class="search-cell-group" title="你可能感兴趣" :border="false" v-if="showInterested">
			<!-- 歌手 -->
			<u-cell-item
				class="u-cell"
				:border-bottom="false"
				:arrow="false"
				v-for="(item, index) in singer"
				:key="item.id"
			>
				<view slot="icon" class="singer-image">
					<u-image
						shape="circle"
						width="100rpx"
						height="100rpx"
						:src="item.picUrl"
						mode="aspectFill"
					></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name">歌手：{{ item.name }}</view>
					<view class="singer-num">
						<text>粉丝：{{ utils.tranNumber(item.fansSize) }}</text>
						<text style="margin-left: 20rpx;">歌曲：{{ item.musicSize }}</text>
					</view>
				</view>
				<view slot="right-icon">
					<u-icon
						class="focus"
						name="plus"
						size="30"
						label="关注"
						label-size="26"
						color="#ff0000"
						label-color="#ff0000"
					></u-icon>
				</view>
			</u-cell-item>
			<!-- 专辑 -->
			<u-cell-item
				class="u-cell"
				:border-bottom="false"
				:arrow="false"
				v-for="(item, index) in album"
				:key="item.id"
			>
				<view slot="icon" class="singer-image">
					<u-image
						shape="circle"
						width="100rpx"
						height="100rpx"
						:src="item.picUrl"
						mode="aspectFill"
					></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name">专辑：{{ item.name }}</view>
					<view class="singer-num">{{ item.artist ? item.artist.name : '未知' }}</view>
				</view>
			</u-cell-item>
			<!-- mv -->
			<u-cell-item
				class="u-cell"
				:border-bottom="false"
				:arrow="false"
				v-for="(item, index) in mv"
				:key="item.id"
			>
				<view slot="icon" class="singer-image">
					<u-image width="160rpx" height="100rpx" :src="item.cover" mode="aspectFill"></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name">{{ item.artistName }} {{ item.name }}</view>
					<view class="singer-num">
						<text>时长：{{ utils.formatTime(item.duration) }}</text>
						<text style="margin-left: 20rpx;">播放：{{ utils.tranNumber(item.playCount) }}</text>
					</view>
				</view>
			</u-cell-item>
		</u-cell-group>
		<!-- 单曲 -->
		<u-cell-group
			class="search-cell-group"
			:border="false"
			v-if="searchMultiple.song && searchMultiple.song.songs && searchMultiple.song.songs.length > 0"
		>
			<view class="header-title">单曲</view>
			<u-cell-item
				class="u-cell"
				:arrow="false"
				v-for="(item, index) in searchMultiple.song.songs"
				:key="index"
				@click="playMusci(item, index)"
			>
				<view slot="icon" class="singer-image">
					<u-image
						border-radius="16rpx"
						width="100rpx"
						height="100rpx"
						:src="item.al.picUrl"
						mode="aspectFill"
					></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name">{{ item.name }}</view>
					<view class="singer-num">
						<text>{{ item.ar ? item.ar[0].name : '未知' }} - {{ item.al.name }}</text>
					</view>
				</view>
				<view slot="right-icon">
					<u-icon
						v-if="item.mv"
						class="video"
						custom-prefix="iconfont"
						name="iconfont icon-shipin"
						size="40"
					></u-icon>
					<u-icon class="tools" name="more-dot-fill" size="40"></u-icon>
				</view>
			</u-cell-item>
			<u-cell-item class="u-cell" :arrow="false" :border-bottom="false" v-if="searchMultiple.song.moreText">
				<view class="find-more">{{ searchMultiple.song.moreText }} ></view>
			</u-cell-item>
		</u-cell-group>
		<!-- 歌单 -->
		<u-cell-group
			class="search-cell-group"
			:border="false"
			v-if="
				searchMultiple.playList &&
					searchMultiple.playList.playLists &&
					searchMultiple.playList.playLists.length > 0
			"
		>
			<view class="header-title">歌单</view>
			<u-cell-item
				class="u-cell"
				:arrow="false"
				v-for="(item, index) in searchMultiple.playList.playLists"
				:key="index"
			>
				<view slot="icon" class="singer-image">
					<u-image width="100rpx" height="100rpx" :src="item.coverImgUrl" mode="aspectFill"></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name">{{ item.name }}</view>
					<view class="singer-num">
						<text>{{ item.trackCount }}首</text>
						<text>, by. {{ item.creator.nickname }}</text>
						<text>播放：{{ utils.tranNumber(item.playCount) }}次</text>
					</view>
				</view>
			</u-cell-item>
			<u-cell-item class="u-cell" :arrow="false" :border-bottom="false" v-if="searchMultiple.playList.more">
				<view class="find-more">{{ searchMultiple.playList.moreText }} ></view>
			</u-cell-item>
		</u-cell-group>
		<!-- 视频 -->
		<u-cell-group
			class="search-cell-group"
			:border="false"
			v-if="searchMultiple.video && searchMultiple.video.videos && searchMultiple.video.videos.length > 0"
		>
			<view class="header-title">视频</view>
			<u-cell-item
				class="u-cell"
				:arrow="false"
				v-for="(item, index) in searchMultiple.video.videos"
				:key="index"
			>
				<view slot="icon" class="singer-image">
					<u-image width="160rpx" height="100rpx" :src="item.coverUrl" mode="aspectFill"></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name">{{ item.title }}</view>
					<view class="singer-num">
						<text>时长：</text>
						<text>歌曲：</text>
						<text>播放次数：</text>
					</view>
				</view>
			</u-cell-item>
			<u-cell-item class="u-cell" :arrow="false" :border-bottom="false" v-if="searchMultiple.video.more">
				<view class="find-more">{{ searchMultiple.video.moreText }} ></view>
			</u-cell-item>
		</u-cell-group>
		<!-- 歌手 -->
		<u-cell-group
			class="search-cell-group"
			:border="false"
			v-if="searchMultiple.artist && searchMultiple.artist.artists && searchMultiple.artist.artists.length > 0"
		>
			<view class="header-title">歌手</view>
			<u-cell-item
				class="u-cell"
				:arrow="false"
				v-for="(item, index) in searchMultiple.artist.artists"
				:key="index"
			>
				<view slot="icon" class="singer-image">
					<u-image
						shape="circle"
						width="100rpx"
						height="100rpx"
						:src="item.img1v1Url"
						mode="aspectFill"
					></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name">{{ item.name }} {{ item.alias[0] }}</view>
					<view class="singer-num">
						<text>专辑：{{ item.albumSize }}首</text>
					</view>
				</view>
				<view slot="right-icon">
					<u-icon
						class="focus"
						name="plus"
						size="30"
						label="关注"
						label-size="26"
						color="#ff0000"
						label-color="#ff0000"
					></u-icon>
				</view>
			</u-cell-item>
			<u-cell-item class="u-cell" :arrow="false" :border-bottom="false" v-if="searchMultiple.artist.more">
				<view class="find-more">{{ searchMultiple.artist.moreText }} ></view>
			</u-cell-item>
		</u-cell-group>
		<!-- 专辑 -->
		<u-cell-group
			class="search-cell-group"
			:border="false"
			v-if="searchMultiple.album && searchMultiple.album.albums && searchMultiple.album.albums.length > 0"
		>
			<view class="header-title">专辑</view>
			<u-cell-item
				class="u-cell"
				:arrow="false"
				v-for="(item, index) in searchMultiple.album.albums"
				:key="index"
			>
				<view slot="icon" class="singer-image">
					<u-image width="100rpx" height="100rpx" :src="item.blurPicUrl" mode="aspectFill"></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name">{{ item.name }}</view>
					<view class="singer-num">
						<text>{{ item.artist.name }}</text>
						<text v-if="item.alias.length > 0">/{{ item.alias[0] }}</text>
						<text>{{ item.publishTime }}</text>
					</view>
				</view>
			</u-cell-item>
			<u-cell-item class="u-cell" :arrow="false" :border-bottom="false" v-if="searchMultiple.album.more">
				<view class="find-more">{{ searchMultiple.album.moreText }} ></view>
			</u-cell-item>
		</u-cell-group>
		<!-- 相关搜索 -->
		<view
			class="search-cell-group"
			v-if="
				searchMultiple.sim_query &&
					searchMultiple.sim_query.sim_querys &&
					searchMultiple.sim_query.sim_querys.length > 0
			"
		>
			<view class="header-title">相关搜索</view>
			<view class="singer-word">
				<view class="singer-name" v-for="(item, index) in searchMultiple.sim_query.sim_querys" :key="index">
					<text>{{ item.keyword }}</text>
				</view>
			</view>
		</view>
		<!-- 用户 -->
		<u-cell-group
			class="search-cell-group"
			:border="false"
			v-if="searchMultiple.user && searchMultiple.user.users && searchMultiple.user.users.length > 0"
		>
			<view class="header-title">用户</view>
			<u-cell-item class="u-cell" :arrow="false" v-for="(item, index) in searchMultiple.user.users" :key="index">
				<view slot="icon" class="singer-image">
					<u-image
						shape="circle"
						width="100rpx"
						height="100rpx"
						:src="item.avatarUrl"
						mode="aspectFill"
					></u-image>
				</view>
				<view slot="title" class="singer-title">
					<view class="singer-name">{{ item.nickname }}</view>
					<view class="singer-num">
						<text v-if="item.signature">{{ item.signature }}</text>
						<text v-else>网易云音乐人</text>
					</view>
				</view>
				<view slot="right-icon">
					<u-icon
						class="focus"
						name="plus"
						size="30"
						label="关注"
						label-size="26"
						color="#ff0000"
						label-color="#ff0000"
					></u-icon>
				</view>
			</u-cell-item>
			<u-cell-item class="u-cell" :arrow="false" :border-bottom="false" v-if="searchMultiple.user.more">
				<view class="find-more">{{ searchMultiple.user.moreText }} ></view>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-6 8:52:40 ?F10: PM?
 * description 综合搜索
 */
import { mapActions } from 'vuex';
import { createSong } from '@/utils/song.js';
export default {
	name: 'search-multiple',
	data() {
		return {
			// 歌手
			singer: [],
			// 专辑
			album: [],
			// mv
			mv: [],
			// 是否显示感兴趣的
			showInterested: false,
			// 搜索结果综合
			searchMultiple: {
				song: {
					songs: [],
					more: '',
					moreText: ''
				},
				playList: {
					playLists: [],
					more: '',
					moreText: ''
				},
				video: {
					videos: [],
					more: '',
					moreText: ''
				},
				artist: {
					artists: [],
					more: '',
					moreText: ''
				},
				album: {
					albums: [],
					more: '',
					moreText: ''
				},
				// 相关搜索
				sim_query: {
					sim_querys: [],
					more: ''
				},
				user: {
					users: [],
					more: '',
					moreText: ''
				}
			},
			// 搜索类型为 1018:综合
			searchType: 1018,
			// 播放的歌曲集合
			song: []
		};
	},
	component: {},
	mounted() {},
	methods: {
		// 播放音乐
		playMusci(item, index) {
			this.selectPlay({
				list: this.song,
				index
			});
		},

		// 多重结果匹配搜索
		getSearchMultimatch(keyword) {
			this.showInterested = false;
			this.$api.getSearchMultimatch(keyword).then(res => {
				if (res.code === this.$code.code_status) {
					const { result } = res;
					this.singer = result.artist;
					this.album = result.album;
					this.mv = result.mv;
					if (this.singer || this.album || this.mv) {
						this.showInterested = true;
					}
				}
			});

			// 调用搜索接口
			let params = {
				keywords: keyword,
				type: this.searchType
			};
			this.$api.getSearch(params).then(res => {
				if (res.code === this.$code.code_status) {
					this.searchMultiple = res.result;
					this.song = this._normaLizeSongs(res.result.song.songs);
				}
			});
		},

		...mapActions('player', ['selectPlay', 'pausePlay', 'playAll']),

		// 处理歌曲
		_normaLizeSongs(res) {
			let resArr = [];
			res.map(item => {
				resArr.push(createSong(item));
			});
			return resArr;
		}
	}
};
</script>

<style lang="scss" scoped>
.search-multiple {
	width: 100%;
	padding-bottom: 15%;
	.search-cell-group {
		margin: 0 20rpx;
		width: auto;
		border-radius: 16rpx;
		padding: 5rpx;
		margin-top: 16rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		.singer-image {
			margin-right: 20rpx;
		}
		.singer-title {
			.singer-name {
				-webkit-line-clamp: 1;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 28rpx;
			}
			.singer-num {
				font-size: 22rpx;
				color: #999;
				-webkit-line-clamp: 1;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		.focus {
			border: 1rpx solid #c7c7c7;
			padding: 6rpx 16rpx;
			border-radius: 16rpx;
			&:active {
				background-color: #e0dee1;
			}
		}
		.header-title {
			font-size: 36rpx;
			color: #000000;
			font-weight: 500;
			padding: 16rpx;
		}
		.tools {
			transform: rotate(90deg);
		}
		.video {
			margin-right: 30rpx;
		}
		.find-more {
			font-size: 24rpx;
			text-align: center;
		}
		.singer-word {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.singer-name {
				margin-left: 20rpx;
				margin-bottom: 16rpx;
				border-radius: 16rpx;
				padding: 5rpx 16rpx;
				display: flex;
				flex-direction: row;
				background-color: #f7f7f7;
			}
		}
		.u-cell {
			padding: 10rpx;
		}
	}
}
</style>
