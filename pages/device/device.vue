<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="top-nav">
			<view class="nav-items">
				<text class="nav-item" v-for="(item, index) in navItems" :key="index">{{ item }}</text>
			</view>
			<view class="scan-area">
				<uni-icons class="scan-icon" type="scan" size="32" color="#FFFFFF"></uni-icons>
				<view class="scan-text">扫一扫</view>
			</view>
		</view>

		<!-- 设备信息 -->
		<view class="device-info">
			<view class="device-details" v-for="(item, index) in deviceImages" :key="index">
				<image class="device-image" :mode="item.mode" :src="item.url" @error="imageError"></image>
				<view class="device-name">{{ item.name }}<view class="dot"></view>
				</view>
			</view>
		</view>

		<!-- 功能菜单 -->
		<view class="menu-list">
			<view class="menu-item" v-for="(item, index) in menuItems" :key="index">
				<text class="menu-title">{{ item }}</text>
			</view>
		</view>

		<!-- 底部信息 -->
		<view class="bottom-info">
			<text class="info-item" v-for="(item, index) in bottomInfo" :key="index">{{ item }}</text>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const navItems = ref(['设备中心']);
const deviceImages = ref([{
	name: "摄像头",
	content: "摄像头工作中",
	url: "/static/logo.png"
},
{
	name: "摄像头",
	content: "摄像头工作中",
	url: "/static/logo.png"
}])
const menuItems = ref(['快速添加', '新手指南', '发现', '产品', '项目', '工具', '我的']);
const bottomInfo = ref(['通用场景']);
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0 20px 20px 20px;
	background-color: #f5f5f5;
	height: 100vh;
}

.top-nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: linear-gradient(90deg, #1a9bf0, #1a5df0);
	height: 70px;
	width: 100%;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	width: 100%;
	position: fixed;
	top: 0px;
	z-index: 99999;
}


.nav-items {
	display: flex;
	margin: 0 10px;
}

.scan-area {
	width: 60px;
	height: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-right: 8px;
}

.scan-icon {
	margin-bottom: -5px;
}

.scan-text {
	font-size: 12px !important;
	color: #fff;
}

.nav-item {
	margin-right: 20px;
	font-size: 16px;
	color: #fff;
	font-weight: 600;
}

/* 元素最后一个 */


.device-info {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 20px;
}

.device-details {
	width: 80px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	color: #333;
	margin: 0 8px;
}

.device-image {
	width: 64px;
	height: 64px;
	border-radius: 50%;
}

.device-name {
	width: 100%;
	display: flex;
	align-items: center;
	margin-top: 2rpx;
	margin-left: 4px;
}

.dot {
	width: 12px;
	height: 12px;
	background-color: #1ec33ac1;
	border-color: #1ec33ac1;
	border-radius: 50%;
	margin-left: 4px;
}

.menu-list {
	display: grid;
  grid-template-columns: repeat(2, 1fr); /* 创建两列，每列等宽 */
  gap: 5px; /* 设置网格项目之间的竖向间距为20px */
  grid-auto-rows: minmax(0, auto); /* 设置网格行的最小高度和最大高度 */
  padding: 10px; /* 设置容器的内边距为10px */
  box-sizing: border-box; /* 确保内边距不会增加容器的总宽度 */
  justify-content: space-between; /* 网格行之间的间距自动平分 */
}

.menu-item {
	display: flex;
	/* 使用弹性盒子布局 */
	justify-content: center;
	/* 水平居中 */
	align-items: center;
	/* 垂直居中 */
	padding: 15px 0;
	background: linear-gradient(45deg, #45e0f0, #679ef0);
	color: #fff;
	border-radius: 15px;
	margin-bottom: 10px;
	box-shadow: 0 2px 10px rgba(101, 158, 240, 0.3);
	width: 170px;
	height: 50px;
	margin: 12px;
}

.menu-title {
	font-size: 20px;
	font-weight: 500;
}

.bottom-info {
	margin-top: 40px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.info-item {
	padding: 10px 20px;
	background-color: #e0e0e0;
	border-radius: 20px;
	font-size: 16px;
	color: #666;
	margin: 0 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>