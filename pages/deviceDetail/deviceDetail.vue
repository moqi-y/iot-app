<template>
	<view class="box">
		<NetworkGplot ref="networkGplotRef" style="height: 600px;" @handleClick="testfn"></NetworkGplot>
		<uni-icons class="icon" @tap="onreset" type="refreshempty" size="28" color="#679ef0"></uni-icons>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue";

	import NetworkGplot from '../../components/NetworkGplot.vue'

	const root = ref()
	const edges = ref()
	const networkGplotRef = ref(null)
	const testfn = (e) => {
		console.log("节点被点击：", e);
	}
	
	const onreset = ()=>{
		networkGplotRef.value.resetDraw()
	}
	
</script>

<style>
.box{
	position: relative;
}
.icon{
	position: absolute;
	top: 20rpx;
	right: 20rpx;
}
</style>