<template>
	<view class="content">
		<!-- 距离顶部的距离 刚好留出状态栏即可 即statusBarHeight -->
		<view class="topNav" :style="{height:navHeight+'px',paddingTop:statusBarHeight+'px'}">
			<view class="nav-left" @tap="$emit('onBack')">
				<uni-icons v-show="left.icon" class="icon" :type="left.icon" size="24"></uni-icons>
				<view v-show="left.title" class="left-title">
					{{left.title}}
				</view>
			</view>

			<view class="nav-center">{{center}}</view>
			<view class="nav-right">
				<view class="right-title" v-show="right.title">
					{{right.title}}
				</view>
				<uni-icons v-show="right.icon" class="icon" :type="right.icon" size="24"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';

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
			default: "标题"

		},
		right: {
			type: Object,
			default: {
				icon: 'bars',
				title: '更多'
			}
		}
	})

	const navHeight = ref(""); //导航栏高度
	const statusBarHeight = ref(""); //状态栏高度

	const getSystemHeight = async () => {
		let {
			statusBarHeight,
			system
		} = uni.getSystemInfoSync()
		statusBarHeight.value = statusBarHeight;
		navHeight.value = statusBarHeight + (system.indexOf('iOS') > -1 ? 40 : 44)
	}

	onMounted(() => {
		getSystemHeight()
	})
</script>

<style scoped>
	.topNav {
		height: 100rpx;
		background-color: transparent;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.nav-left {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-top: calc(10px + var(--status-bar-height));
		color: #000;
		font-size: 36rpx;
		margin-left: -20px;
	}


	.nav-center {
		width: 100%;
		display: flex;
		justify-content: center;
		padding-top: calc(10px + var(--status-bar-height));
		color: #FFFFFF;
		font-weight: 600;
		font-size: 36rpx;
	}

	.nav-right {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-top: calc(10px + var(--status-bar-height));
		color: #000;
		font-size: 36rpx;
		margin-right: -10px;
	}

	.nav-left input {
		width: 60%;
		height: 62rpx;
		border-radius: 30rpx;
		padding-left: 25rpx;
		background-color: #f0f8ffa6;
		box-sizing: border-box;
	}

	.placClass {
		font-size: 24rpx;
		color: #fff;
	}
</style>