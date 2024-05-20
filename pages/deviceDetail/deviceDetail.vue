<template>
	<view>
		<NetworkGplot :nodeList="nodes" :edgeList="edges" height="400px" @onTap="testfn"></NetworkGplot>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue";

	import NetworkGplot from '../../components/NetworkGplot.vue'

	const nodes = ref()
	const edges = ref()

	const testfn = (e) => {
		console.log("节点被点击：", e);
	}
</script>

<style>

</style>