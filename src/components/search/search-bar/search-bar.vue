<template>
	<view class="search-bar">
		<u-search
			:placeholder="searchDefault"
			v-model="searchKeyword"
			:show-action="true"
			action-text="搜索"
			:focus="false"
			:clearabled="true"
			:animation="true"
			margin="0 20rpx 0 0"
			@search="onSearch"
			@custom="onSearch"
			@change="onChange"
			@focus="onFocus"
			@blur="onBlur"
			@click="onClick"
		></u-search>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-7 12:48:07 ?F10: PM?
 * description
 */

export default {
	name: 'search-bar',
	data() {
		return {
			// 搜索关键字
			searchKeyword: '',
			// 输入框默认搜索
			searchDefault: ''
		};
	},
	created() {
		//获取默认搜索关键词
		this.$api.getSearchDefault().then(res => {
			if (res.code === this.$code.code_status) {
				this.searchDefault = res.data.showKeyword;
			}
		});
	},
	component: {},
	mounted() {},
	methods: {
		// 编写搜索框组件，完成子组件传递数据给父组件
		onChange(value) {
			// 定时触发，防抖动
			this.$u.debounce(() => {
				this.$emit('change', value);
			}, 500);
		},
		onFocus(value) {
			this.$emit('focus', value);
		},
		onBlur(value) {
			this.$emit('blur', value);
		},
		onSearch(value) {
			this.$emit('search', value);
		},
		onClick(value) {
			this.$emit('click', value);
		},
		setKeyword(value) {
			this.searchKeyword = value;
		}
	}
};
</script>

<style lang="scss" scoped>
	.search-bar {
		width: 100%;
	}
</style>
