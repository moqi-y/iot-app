<template>
	<view class="bar">
		<view class="left" @tap="$emit('onBack')">
			<uni-icons v-show="left.icon" class="icon" @tap="onreset" :type="left.icon" size="28"
				color="#fff"></uni-icons>
			<view v-show="left.title" class="left-title">
				{{left.title}}
			</view>
		</view>
		<view class="center">
			<view class="center-title">
				{{center}}
			</view>
		</view>
		<view class="right">
			<view class="right-title" v-show="right.title">
				{{right.title}}
			</view>
			<uni-icons v-show="right.icon" class="icon" @tap="onreset" :type="right.icon" size="28"
				color="#fff"></uni-icons>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		left: {
			type: Object,
			default: {
				icon: 'back',
				title: '返回'
			}
		},
		center: {
			type: String,
			default:"标题"
		
		},
		right: {
			type: Object,
			default: {
				icon: 'bars',
				title: '更多'
			}
		}
	})
</script>

<style>
	.bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background: linear-gradient(90deg, #1a9bf0, #1a5df0);
		height: 80rpx;
		margin-top: var(--status-bar-height);
		font-size: 16px;
		font-family: 'pingfang';
		color: #fff;
	}

	.left{
		width: 30%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-left;
	}
	.right {
		width: 30%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}
	.center{
		width: 40%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.right-title {
		margin-right: 4rpx;
	}

	.center-title {
		align-self: center;
		justify-self: center;
	}
</style>