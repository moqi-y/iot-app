<template>
	<view class="page">
		<view class="search-header">
			<view class="search-header-back" @click="goBack">
				<uni-icons type="back" size="30" color="#679ef0"></uni-icons>
			</view>
			<view class="search-header-title">蓝牙连接</view>
		</view>
		<view class="search-container">
			<view class="search-spinner">
				<view class="search-spinner-theme2">
					<view class="search-spinner-theme3">
						<view class="search-spinner-theme4"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="search-text">蓝牙搜索中...</view>

		<view class="search-results">
			<!-- 搜索结果列表 -->
			<ResultCard v-for="(result, index) in 5" :key="index" :result="result" />
		</view>
	</view>
</template>

<script setup>

import ResultCard from '@/components/ResultCard.vue';

const goBack = () => {
	uni.navigateBack();
};
</script>
<style scoped>
/* 页面和组件的基础样式 */
/* 页面和组件的基础样式 */
.page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	height: 100vh;
}

.search-container {
	/* margin-top: cale(100px + var(--status-bar-height)); */
	margin-top: 100px;
	width: 300px;
	height: 300px;
	background-color: #fff;
	display: flex;
	justify-content: center; /* 水平居中 */
	align-items: center; /* 垂直居中 */
	/* 移除绝对定位 */
}

.search-spinner {
	width: 280px;
	height: 280px;
	border: 25px solid;
	border-color: #679ef0 transparent #679ef0 transparent;
	border-radius: 50%;
	animation: spin 2s ease-in-out infinite;
	display: flex;
	justify-content: center; /* 水平居中 */
	align-items: center; /* 垂直居中 */
}

.search-spinner-theme2 {
	width: 160px;
	height: 160px;
	border: 8px solid;
	border-color: #679ef0 transparent #679ef0 transparent;
	border-radius: 50%;
	animation: spin 1.2s cubic-bezier(0.84, -0.02, 0.05, 1) infinite;
	display: flex;
	justify-content: center; /* 水平居中 */
	align-items: center; /* 垂直居中 */
}

.search-spinner-theme3{
	width: 52px;
	height: 52px;
	border: 8px solid;
	border-color: #679ef0 transparent #679ef0 transparent;
	border-radius: 50%;
	animation: spin 0.5s cubic-bezier(0.84, -0.02, 1.4, 1) infinite;
	display: flex;
	justify-content: center; /* 水平居中 */
	align-items: center; /* 垂直居中 */
}

.search-spinner-theme4{
	width: 5px;
	height: 5px;
	background: #679ef0;
	border: 10px solid #679ef0;
	border-radius: 50%;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

.search-text {
	width: 100%;
	text-align: center;
	margin-top: 30px;
	padding-bottom: 20px;
	font-size: 18px;
	color: #666;
	border-bottom:1px solid #cccccc54;
}

/* 搜索结果列表的样式 */
.search-results {
	width: 100%;
	max-height: 500px;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 10px;
	padding: 20px;
	overflow: auto;
}

/* 搜索结果项的样式 */
.result-item {
	padding: 10px;
	border-bottom: 1px solid #679ef0;
	/* 主题色2 */
	color: #333;
	cursor: pointer;
}

.result-item:last-child {
	border-bottom: none;
}

.search-header{
	display: flex;
	align-items: center;
	width: 100%;
	height: 50px;
	background-color: #fff;
	padding: 0 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	margin-top: var(--status-bar-height);
}
</style>