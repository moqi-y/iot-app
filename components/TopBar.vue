<template>
	<view class="content">
		<!-- 距离顶部的距离 刚好留出状态栏即可 即statusBarHeight -->
		<view class="topNav" :style="{ height: navHeight + 'px', paddingTop: myStatusBarHeight + 'px' }">
			<view class="nav-left" @tap="$emit('onBack')">
				<uni-icons v-show="left.icon" class="icon" :type="left.icon" size="24"></uni-icons>
				<view v-show="left.title" class="left-title">
					{{ left.title }}
				</view>
			</view>

			<view class="nav-center">{{ center }}</view>
			<view class="nav-right">
				<view class="right-title" v-show="right.title">
					{{ right.title }}
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

	const navHeight = ref(44); // 导航栏高度（状态栏 + 标题栏）
	const myStatusBarHeight = ref(0); // 状态栏高度

	const props = defineProps({
		left: {
			type: Object,
			default: () => ({
				icon: 'back',
				title: '返回'
			})
		},
		center: {
			type: String,
			default: "标题"
		},
		right: {
			type: Object,
			default: () => ({
				icon: 'bars',
				title: '更多'
			})
		}
	})

	/**
	 * 计算状态栏与导航栏高度
	 * 注意：onLoad 只在页面组件中触发，组件内必须使用 onMounted，
	 * 否则 navHeight 会一直是初始值。
	 */
	const getSystemHeight = () => {
		// getWindowInfo 为新 API，getSystemInfoSync 在新版本已废弃，此处做兼容
		const info = typeof uni.getWindowInfo === 'function'
			? uni.getWindowInfo()
			: uni.getSystemInfoSync()

		const statusBarHeight = info.statusBarHeight || 0
		// iOS 标题栏 40px，其他平台 44px
		const system = info.system || ''
		const titleBarHeight = system.indexOf('iOS') > -1 ? 40 : 44

		myStatusBarHeight.value = statusBarHeight
		navHeight.value = statusBarHeight + titleBarHeight
	}

	onMounted(() => {
		getSystemHeight()
	})
</script>

<style scoped>
	.topNav {
		background-color: transparent;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.nav-left {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		color: #000;
		font-size: 36rpx;
		margin-left: -20px;
	}

	.nav-center {
		width: 100%;
		display: flex;
		justify-content: center;
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
		color: #000;
		font-size: 36rpx;
		margin-right: -10px;
	}
</style>