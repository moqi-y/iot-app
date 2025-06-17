<template>
	<wd-navbar :title="deviceInfo?.deviceName" left-text="返回" left-arrow @click-left="onBack"></wd-navbar>
	<view class="box">
		<NetworkGplot ref="networkGplotRef" style="height: 600px;" @handleClick="testfn"></NetworkGplot>
		<uni-icons class="icon" @click="onReset" type="refreshempty" size="28" color="#679ef0"></uni-icons>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import NetworkGplot from '../../components/NetworkGplot.vue'
	import TopBar from '../../components/TopBar.vue'
	const root = ref()
	const edges = ref()
	const networkGplotRef = ref(null)
	const deviceInfo =ref({})
	
	const testfn = (e) => {
		console.log("节点被点击：", e);
	}

	const onReset = () => {
		networkGplotRef.value.resetDraw()
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
		deviceInfo.value = e
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