<template>
	<view class="play-list-box">
		<play-list-navbar></play-list-navbar>
		<view class="wrap" v-for="item of categorieList" :key="item.key">
			<view class="header">{{ item.type }}</view>
			<view class="list">
				<view
					class="list-box"
					v-for="item1 of item.list"
					:key="item1.name"
					@click="toPlayListDetail(item1.name)"
				>
					{{ item1.name }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-23 9:47:57 ?F10: PM?
 * description 所有分类歌单
 */

export default {
	name: 'play-list-box',
	data() {
		return {
			// 全部歌单
			categorieList: [],
			// 分类列表
			typeList: [
				{
					key: 0,
					value: '语种'
				},
				{
					key: 1,
					value: '风格'
				},
				{
					key: 2,
					value: '场景'
				},
				{
					key: 3,
					value: '情感'
				},
				{
					key: 4,
					value: '主题'
				}
			]
		};
	},
	component: {},
	mounted() {
		this.getplayListCatlist();
	},
	methods: {
		// 去具体列表
		toPlayListDetail(name) {
			this.$Router.push({
				name: 'PlayListDetail',
				params: {
					name
				}
			});
		},

		// 获取全部歌单
		getplayListCatlist() {
			this.$api.getplayListCatlist().then(res => {
				if (res.code === this.$code.code_status) {
					this.categorieList = this.categoryGroup(res.sub, 'category');
				}
			});
		},

		// 歌单排序
		categoryGroup(list, filed) {
			// 储存初始数据
			let obj = {};
			for (let i = 0; i < list.length; i++) {
				for (let item in list[i]) {
					if (item === filed) {
						obj[list[i][item]] = {
							list: obj[list[i][filed]] ? obj[list[i][filed]].list : []
						};
					}
				}
				obj[list[i][filed]].list.push(list[i]);
			}
			// 存储过滤的数据
			let arr = [];
			for (let item in obj) {
				let type = '';
				let category = '';
				let icon = '';
				this.typeList.map(items => {
					if (items.key === obj[item].list[0].category) {
						type = items.value;
						category = items.key;
						icon = items.icon;
					}
				});
				arr.push({
					type,
					category,
					icon,
					list: obj[item].list
				});
			}
			console.log('arr', arr);
			return arr;
		}
	}
};
</script>

<style lang="scss" scoped>
.play-list-box {
	.wrap {
		padding: 20rpx 30rpx;
		.header {
			font-size: 32rpx;
			margin-bottom: 30rpx;
		}
		.list {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			.list-box {
				width: 22%;
				font-size: 22rpx;
				margin-left: 18rpx;
				background-color: #e2e2e2;
				padding: 16rpx;
				margin-bottom: 30rpx;
				border-radius: 26rpx;
				text-align: center;
				&:active {
					background-color: #cecece;
				}
			}
		}
	}
}
</style>
