<template>
	<view class="page">
		<view class="search-header">
			<view class="search-header-back" @click="goBack">
				<uni-icons type="back" size="30" color="#679ef0"></uni-icons>
			</view>
			<view class="search-header-title">蓝牙连接</view>
		</view>

		<view class="search-container" v-if="isSearching">
			<view class="search-spinner">
				<view class="search-spinner-theme2">
					<view class="search-spinner-theme3">
						<view class="search-spinner-theme4"></view>
					</view>
				</view>
			</view>
		</view>

		<view class="search-text">{{ searchTip }}</view>

		<view class="search-results">
			<view class="no-result" v-if="!isSearching && devicesList.length === 0">未搜索到蓝牙设备</view>
			<!-- 搜索结果列表 -->
			<ResultCard v-for="item in devicesList" :key="item.deviceId" :device="item" @connect="connectDevice" />
		</view>
	</view>
</template>

<script setup>
import ResultCard from '@/components/ResultCard.vue';
import {
	ref,
	onMounted,
	onBeforeUnmount
} from 'vue';
import {
	requireLogin
} from '@/utils/auth.js';

const devicesList = ref([])
const isSearching = ref(true)
const searchTip = ref('蓝牙搜索中...')

/** 已添加过的设备，避免 onBluetoothDeviceFound 高频回调重复插入 */
const knownDeviceIds = new Set()

const goBack = () => {
	uni.navigateBack();
};

/**
 * 获取蓝牙设备列表
 * 注意：res.devices 是数组，需要展开合并而不是 push 整个数组，
 * 否则会出现嵌套数组导致列表渲染异常。
 */
const getBluetoothList = () => {
	uni.getBluetoothDevices({
		success(res) {
			const devices = res.devices || []
			let changed = false

			devices.forEach((item) => {
				if (!item.deviceId || knownDeviceIds.has(item.deviceId)) return
				knownDeviceIds.add(item.deviceId)
				devicesList.value.push(item)
				changed = true
			})

			if (devices.length > 0 && isSearching.value) {
				isSearching.value = false
			}
			if (changed) {
				// 触发响应式更新（push 已具备，此处仅作语义化标注）
				searchTip.value = `搜索到 ${devicesList.value.length} 个设备`
			}
		},
		fail(err) {
			console.error('获取蓝牙设备列表失败', err)
		}
	})
}

/** 监听新发现的设备 */
const onDeviceFound = () => {
	getBluetoothList()
}

const discovery = () => {
	uni.startBluetoothDevicesDiscovery({
		success(res) {
			// 移除上一次的监听，避免重复注册
			uni.offBluetoothDeviceFound(onDeviceFound)
			uni.onBluetoothDeviceFound(onDeviceFound)
			getBluetoothList()
		},
		fail(err) {
			isSearching.value = false
			searchTip.value = '蓝牙搜索失败'
			console.error('搜索失败', err)
		}
	})
}

const initBlue = () => {
	uni.openBluetoothAdapter({
		success() {
			discovery()
		},
		fail(err) {
			isSearching.value = false
			searchTip.value = '蓝牙初始化失败，请检查蓝牙是否开启'
			console.error('初始化蓝牙失败', err)
		}
	})
}

/**
 * 连接指定蓝牙设备
 * @param {object} device ResultCard 回传的设备对象
 */
const connectDevice = (device) => {
	if (!device || !device.deviceId) {
		uni.showToast({ title: '设备信息不完整', icon: 'none' })
		return
	}

	uni.createBluetoothConnection({
		deviceId: device.deviceId,
		success() {
			uni.showToast({ title: '连接成功', icon: 'success' })
			// 连接成功后可在此处跳转配网/详情页
		},
		fail(err) {
			uni.showToast({ title: '连接失败，请重试', icon: 'none' })
			console.error('连接蓝牙设备失败', err)
		}
	})
}

/** 离开页面时释放蓝牙资源，避免持续扫描耗电 */
const cleanup = () => {
	uni.offBluetoothDeviceFound(onDeviceFound)
	uni.stopBluetoothDevicesDiscovery()
	uni.closeBluetoothAdapter()
}

onMounted(() => {
	// 未登录时不启动蓝牙扫描，避免未授权页面进行敏感操作
	if (!requireLogin('/pages/bluetoothLink/bluetoothLink')) return;
	initBlue()
})

onBeforeUnmount(() => {
	cleanup()
})
</script>

<style scoped>
/* 页面和组件的基础样式 */
.page {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	height: 100vh;
	overflow: hidden;
}

.search-container {
	margin-top: 100px;
	width: 300px;
	height: 300px;
	background-color: #fff;
	display: flex;
	justify-content: center;
	/* 水平居中 */
	align-items: center;
	/* 垂直居中 */
}

.search-spinner {
	width: 280px;
	height: 280px;
	border: 25px solid;
	border-color: #679ef0 transparent #679ef0 transparent;
	border-radius: 50%;
	animation: spin 2s ease-in-out infinite;
	display: flex;
	justify-content: center;
	align-items: center;
}

.search-spinner-theme2 {
	width: 160px;
	height: 160px;
	border: 8px solid;
	border-color: #679ef0 transparent #679ef0 transparent;
	border-radius: 50%;
	animation: spin 1.2s cubic-bezier(0.84, -0.02, 0.05, 1) infinite;
	display: flex;
	justify-content: center;
	align-items: center;
}

.search-spinner-theme3 {
	width: 52px;
	height: 52px;
	border: 8px solid;
	border-color: #679ef0 transparent #679ef0 transparent;
	border-radius: 50%;
	animation: spin 0.5s cubic-bezier(0.84, -0.02, 1.4, 1) infinite;
	display: flex;
	justify-content: center;
	align-items: center;
}

.search-spinner-theme4 {
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
	border-bottom: 1px solid #cccccc54;
}

.no-result {
	width: 100%;
	text-align: center;
	margin-top: 30px;
	font-size: 18px;
	color: #666;
	opacity: 0.6;
}

/* 搜索结果列表的样式 */
.search-results {
	width: 96%;
	max-height: 500px;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 10px;
	padding: 2%;
	overflow: auto;
}

/* 搜索结果项的样式 */
.search-header {
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