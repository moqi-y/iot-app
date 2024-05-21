<template>
	<view>
		<view class="charts-box">
			<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
		</view>
	</view>
	<button @tap="endMqtt()">断开连接</button>

	<view class="net-pic">
		<view>
			网络拓扑图
		</view>
		<view id="mynetwork"></view>
	</view>

	<button @tap="testGetFun()">测试按钮</button>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue";
	import {
		getTest
	} from '../../api/test.js';

	const data = ref("测试")

	const chartData = ref({})
	const opts = ref({
		xAxis: {
			disableGrid: true
		},
		yAxis: {
			data: [{
				min: 0
			}]
		}
	})
	onMounted(() => {
		getServerData()
		mqttfun()
		drowNetWorkPic()
	})
	const getServerData = () => {
		setTimeout(() => {
			//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
			let res = {
				categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
				series: [{
						name: "目标值",
						data: [35, 36, 31, 33, 13, 34]
					},
					{
						name: "完成量",
						data: [18, 27, 21, 24, 6, 28]
					}
				]
			};
			chartData.value = JSON.parse(JSON.stringify(res));
		}, 500);
	}




	const mqttfun = () => {
		console.log("mqtt:", mqtt)
	}

	/**
	 * 断开连接
	 */
	const endMqtt = () => {
		client.end()
	}

	const connectUrl = `ws://broker.emqx.io:8083/mqtt`;
	const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
	const client = mqtt.connect(connectUrl, {
		clean: true,
		connectTimeout: 4000,
		reconnectPeriod: 1000,
		clientId: clientId,
		username: 'emqx_test',
		password: 'emqx_test'
	})

	// 需要订阅的主题
	const topic = 'test';

	//成功连接后触发的回调
	client.on('connect', () => {
		console.log('已经连接成功');
		// 这里可以订阅多个主题
		client.subscribe([topic], () => {
			console.log(`订阅了主题 ${topic}`)
		})
	});

	// 当客户端收到一个发布过来的消息时触发回调
	client.on('message', function(topic, message, packet) {
		// 这里有可能拿到的数据格式是Uint8Array格式，所以可以直接用toString转成字符串
		// let data = JSON.parse(message.toString());
		console.log("返回的数据：", message)
	});

	// 连接断开后触发的回调
	client.on("close", function() {
		console.log("已断开连接")
	});




	// 绘制网络拓扑
	const drowNetWorkPic = () => {
		console.log("绘制网络拓扑图");
		var EDGE_LENGTH_MAIN = 150;
		var EDGE_LENGTH_SUB = 50;
		// create an array with nodes
		var nodes = new vis.DataSet([{
				id: 1,
				label: "防火墙",
				image: "https://upload.wikimedia.org/wikipedia/zh/d/d8/Windows_Firewall_Icon.png",
				shape: "image",
				fixed: true
			},
			{
				id: 2,
				label: "网络交换机",
				image: "https://pic.pngsucai.com/00/13/36/172dade1a31a5005.webp",
				shape: "image",
				fixed: true
			},
			{
				id: 103,
				label: "智能摄像头",
				image: "./static/icon/camera-five.svg",
				shape: "image",
				fixed: true
			},
			{
				id: 104,
				label: "智能终端",
				image: "./static/icon/devices.svg",
				shape: "image",
				fixed: true
			},
			{
				id: 105,
				label: "智能路由器",
				image: "./static/icon/router.svg",
				shape: "image",
				fixed: true
			},
		]);

		// 创建一个有边的数组
		var edges = new vis.DataSet([{
				from: 1,
				to: 2,
				length: 20
			},
			{
				from: 2,
				to: 103,
				length: EDGE_LENGTH_MAIN
			},
			{
				from: 2,
				to: 104,
				length: EDGE_LENGTH_MAIN
			},
			{
				from: 2,
				to: 105,
				length: EDGE_LENGTH_MAIN
			},
		]);

		// 创建网络
		var container = document.getElementById("mynetwork");
		var data = {
			nodes: nodes,
			edges: edges,
		};
		var options = {
			layout: {
				hierarchical: true
			}
		};
		var network = new vis.Network(container, data, options);

		// 点击事件
		network.on('click', function(properties) {
			console.log("properties:", properties);
		})
	}


	// 测试请求
	const testGetFun = async () => {
		let res = await getTest({
			"username": "admin",
			"password": "admin123",
			"code": "1",
			"uuid": "1"
		})
		console.log("res", res);
	}
</script>

<style scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 300px;
	}

	/* 网络拓扑图 */
	#mynetwork {
		margin: 0 auto;
		width: 90%;
		height: 400px;
		border: 1px solid lightgray;
	}

	p {
		max-width: 600px;
	}
</style>