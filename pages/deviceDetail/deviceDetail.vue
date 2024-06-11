<template>
	<NavBar :left='{title:"返回",icon:"back"}' :right='{}' center='设备详情' @onBack="onBack"></NavBar>
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

	import NetworkGplot from '../../components/NetworkGplot.vue'
	import NavBar from '../../components/NavBar.vue'
	const root = ref()
	const edges = ref()
	const networkGplotRef = ref(null)
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