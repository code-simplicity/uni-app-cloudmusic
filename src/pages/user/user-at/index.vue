<template>
	<view class="user-at">
		<u-navbar back-text="@我" title=""></u-navbar>
		<view class="wrap">
			<view class="at-list" v-if="atInfo && atInfo.length > 0">
				<u-cell-group :border="false">
					<u-cell-item class="u-cell" :arrow="false" v-for="(item, index) in atInfo" :key="index">
						<view slot="icon" class="icon"><u-avatar :src="item.fromUser.avatarUrl"></u-avatar></view>
						<view slot="title" class="title">
							<view class="nickname">{{ item.fromUser.nickname }}</view>
							<view class="last-msg">{{ item.lastMsg.msg }}</view>
						</view>
						<view slot="right-icon" class="right-icon">
							{{ utils.dateFormat(item.lastMsgTime, 'MM/DD') }}
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
			<view class="at-text" v-else>暂时没有收到@</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-10-24 8:26:33 ?F10: PM?
 * description   艾特
 */

export default {
	name: 'user-at',
	data() {
		return {
			atInfo: [],
			// 返回的数量
			limit: 30
		};
	},
	component: {},
	mounted() {
		this.getMsgForwards();
	},
	methods: {
		// at我的信息
		getMsgForwards() {
			this.$api.getMsgForwards(this.limit).then(res => {
				if (res.code === this.$code.code_status) {
					this.atInfo = res.forwards;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.user-at {
	width: 100%;
	.wrap {
		.at-text {
			margin-top: 40rpx;
			text-align: center;
		}
	}
}
</style>
