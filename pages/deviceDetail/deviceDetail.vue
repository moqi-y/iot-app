<template>
	<view>
		<NetworkGplot @handleClick="testfn"></NetworkGplot>
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

	const testfn = (e) => {
		console.log("节点被点击：", e);
	}
</script>

<style>

</style>