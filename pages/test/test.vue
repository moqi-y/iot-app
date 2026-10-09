<template>
	<view>
		<view class="charts-box">
			<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
		</view>
	</view>

	<view class="mqtt-result">
		<text>mqtt 状态：{{ mqttStatus }}</text>
		<text v-if="mqttMessage">，最新消息：{{ mqttMessage }}</text>
	</view>

	<button @tap="toggleMqtt()">{{ mqttConnected ? '断开连接' : '连接 MQTT' }}</button>

	<!-- 网络拓扑图仅 H5 端可用，依赖 document 节点 -->
	<!-- #ifdef H5 -->
	<view class="net-pic">
		<view>网络拓扑图</view>
		<view id="mynetwork"></view>
	</view>
	<!-- #endif -->

	<button @tap="testGetFun()">测试按钮</button>
</template>

<script setup>
import {
	ref,
	onMounted,
	onBeforeUnmount
} from "vue";
import {
	getTest
} from '../../api/test.js';

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

/* ---------------- MQTT ---------------- */

const mqttStatus = ref('未连接')
const mqttMessage = ref('')
const mqttConnected = ref(false)
let client = null

const connectMqtt = async () => {
	if (client) return

	// mqtt 依赖较大，按平台条件引入，避免非 App/H5 端打进主包
	const { default: mqtt } = await import('mqtt/dist/mqtt.js')

	const host = 'broker.emqx.io'
	const port = 8083

	// H5 只能走 WebSocket，App 端可走原生 TCP。
	// 用 if/else 而非条件编译，避免同一作用域内重复声明变量。
	// #ifdef H5
	const protocol = 'ws'
	// #endif
	// #ifndef H5
	const protocol = 'tcp'
	// #endif

	client = mqtt.connect(`${protocol}://${host}:${port}`, {
		clean: true,
		connectTimeout: 4000,
		reconnectPeriod: 1000,
		clientId: `mqtt_${Math.random().toString(16).slice(2, 10)}`
	})

	client.on('connect', () => {
		mqttStatus.value = '已连接'
		mqttConnected.value = true
		client.subscribe('test', (err) => {
			if (err) {
				mqttStatus.value = '订阅失败'
				console.error('订阅主题失败', err)
			}
		})
	})

	client.on('message', (topic, message) => {
		const raw = message.toString()
		try {
			// 消息不一定是合法 JSON，解析失败时退回原始文本
			const parsed = JSON.parse(raw)
			mqttMessage.value = typeof parsed === 'object' ? JSON.stringify(parsed) : String(parsed)
		} catch (e) {
			mqttMessage.value = raw
		}
	})

	client.on('error', (err) => {
		mqttStatus.value = '连接异常'
		console.error('MQTT 错误', err)
	})

	client.on('close', () => {
		mqttStatus.value = '已断开'
		mqttConnected.value = false
	})
}

const endMqtt = () => {
	if (!client) return
	client.end(true)
	client = null
	mqttConnected.value = false
	mqttStatus.value = '已断开'
}

const toggleMqtt = () => {
	if (mqttConnected.value) {
		endMqtt()
	} else {
		connectMqtt().catch((err) => {
			mqttStatus.value = '连接失败'
			console.error('建立 MQTT 连接失败', err)
		})
	}
}

/* ---------------- 图表模拟数据 ---------------- */

const getServerData = () => {
	setTimeout(() => {
		chartData.value = {
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
	}, 500);
}

/* ---------------- 网络拓扑（H5 only） ---------------- */

// #ifdef H5
import { DataSet, Network } from 'vis-network/standalone'

let network = null

const drowNetWorkPic = () => {
	const container = document.getElementById("mynetwork");
	if (!container) return;

	// 组件可能被卸载后再次进入，先销毁旧实例
	if (network) {
		network.destroy();
		network = null;
	}

	const nodes = new DataSet([{
			id: 1,
			label: "防火墙",
			shape: "dot",
			fixed: true
		},
		{
			id: 2,
			label: "网络交换机",
			shape: "dot",
			fixed: true
		},
		{
			id: 103,
			label: "智能摄像头",
			shape: "dot",
			fixed: true
		},
		{
			id: 104,
			label: "智能终端",
			shape: "dot",
			fixed: true
		},
		{
			id: 105,
			label: "智能路由器",
			shape: "dot",
			fixed: true
		},
	]);

	const edges = new DataSet([{
			from: 1,
			to: 2,
			length: 20
		},
		{
			from: 2,
			to: 103,
			length: 150
		},
		{
			from: 2,
			to: 104,
			length: 150
		},
		{
			from: 2,
			to: 105,
			length: 150
		},
	]);

	network = new Network(container, {
		nodes,
		edges,
	}, {
		layout: {
			hierarchical: true
		}
	});

	network.on('click', function(properties) {
		console.log("properties:", properties);
	})
}
// #endif

/* ---------------- 接口测试 ---------------- */

const testGetFun = async () => {
	try {
		const res = await getTest({
			"username": "admin",
			"password": "admin123",
			"code": "1",
			"uuid": "1"
		})
		console.log("res", res);
	} catch (err) {
		// request 层已统一提示，这里只保留日志
		console.error("请求失败", err);
	}
}

onMounted(() => {
	getServerData()
	// #ifdef H5
	drowNetWorkPic()
	// #endif
})

onBeforeUnmount(() => {
	endMqtt()
	// #ifdef H5
	if (network) {
		network.destroy()
		network = null
	}
	// #endif
})
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