<template>
	<view id="mynetwork" :style="{height:`${height}`}"></view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue";
	import { onShow , onLoad } from "@dcloudio/uni-app"
	    
	const props = defineProps({
		// 自定义模块高度
		height: {
			type: String,
			default: "300px"
		},
		// 节点数组
		nodeList: {
			type: Array,
			default: [{
					id: 101,
					label: "防火墙",
					image: "https://upload.wikimedia.org/wikipedia/zh/d/d8/Windows_Firewall_Icon.png",
					shape: "image",
					fixed: true
				},
				{
					id: 201,
					label: "网络交换机",
					image: "https://pic.pngsucai.com/00/13/36/172dade1a31a5005.webp",
					shape: "image",
					fixed: true
				},
				{
					id: 303,
					label: "智能摄像头",
					image: "./static/icon/camera-five.svg",
					shape: "image",
					fixed: true
				},
				{
					id: 304,
					label: "智能终端",
					image: "./static/icon/devices.svg",
					shape: "image",
					fixed: true
				},
				{
					id: 305,
					label: "智能路由器",
					image: "./static/icon/router.svg",
					shape: "image",
					fixed: true
				}
			]
		},
		// 网络连线数组
		edgeList: {
			type: Array,
			default: [{
					from: 101,
					to: 201,
				},
				{
					from: 201,
					to: 303,
				},
				{
					from: 201,
					to: 304,
				},
				{
					from: 201,
					to: 305,
				}
			]
		}
	})

	const emits = defineEmits(["onTap"])
	// 绘制网络拓扑
	const drowNetWorkPic = () => {
		const nodes = new vis.DataSet(props.nodeList);
		// 创建一个有边的数组
		var edges = new vis.DataSet(props.edgeList);
		// 创建网络
		const container = document.getElementById("mynetwork");
		const data = {
			nodes: nodes,
			edges: edges,
		};
		const options = {
			layout: {
				hierarchical: true //开启分层
			}
		};
		const network = new vis.Network(container, data, options);

		// 点击事件
		network.on('click', function(properties) {
			emits("onTap", properties)
		})
	}

	onMounted(() => {
		drowNetWorkPic()
	})
	
	onLoad((e) => {
	    console.log(e)
	})
	
</script>

<style scoped>
	/* 网络拓扑图 */
	#mynetwork {
		margin: 0 auto;
		width: 100%;
	}
</style>