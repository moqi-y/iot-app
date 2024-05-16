<template>
	<view>
		  <!-- 顶部导航栏 -->
	  <!-- <view class="top-nav">
		<text class="time">18:10</text>
		<view class="nav-items">
		  <text class="nav-item" v-for="(item, index) in navItems" :key="index">{{ item }}</text>
		</view>
		<uni-icons type="scan" size="28" color="#1296db"></uni-icons>
	  </view> -->
		<view class="charts-box">
			<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue";
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
</script>

<style scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>