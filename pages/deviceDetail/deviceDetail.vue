<template>
	<wd-navbar :title="deviceInfo?.deviceName" left-text="返回" left-arrow @click-left="onBack"></wd-navbar>
	<view class="box">
		<NetworkGplot ref="networkGplotRef" style="height: 600px;" @handleClick="testfn"></NetworkGplot>
		<uni-icons class="icon" @click="onReset" type="refreshempty" size="28" color="#679ef0"></uni-icons>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import NetworkGplot from '../../components/NetworkGplot.vue'
	import { requireLogin } from '../../utils/auth.js'

	const networkGplotRef = ref(null)
	const deviceInfo = ref({})

	const testfn = (e) => {
		console.log("节点被点击：", e);
	}

	const onReset = () => {
		networkGplotRef.value?.resetDraw()
	}

	/**
	 * 点击导航返回
	 */
	const onBack = () => {
		uni.navigateBack({
			delta: 1
		})
	}

	onLoad((e) => {
		// 未登录时直接返回上一页，不渲染设备详情
		if (!requireLogin('/pages/deviceDetail/deviceDetail')) return;

		// onLoad 回调拿到的是页面参数，统一收敛为设备信息对象
		deviceInfo.value = {
			deviceId: e.deviceId,
			deviceName: decodeURIComponent(e.deviceName || '设备详情'),
			typeName: decodeURIComponent(e.typeName || '')
		}
	})
</script>

<style>
	.box {
		position: relative;
	}

	.icon {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
	}
</style>