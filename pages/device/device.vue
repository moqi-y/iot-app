<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="top-nav">
			<view class="nav-items">
				<text class="nav-item" v-for="(item, index) in navItems" :key="index">{{ item }}</text>
			</view>
			<view class="scan-area" @tap=onScan>
				<uni-icons class="scan-icon" type="scan" size="32" color="#FFFFFF"></uni-icons>
				<view class="scan-text">扫一扫</view>
			</view>
		</view>

		<!-- 设备信息 -->
		<view class="device-info">
			<view class="device-details" v-for="(item, index) in deviceImages" :key="index">
				<image class="device-image" :mode="item.mode" :src="item.url" @error="imageError"></image>
				<view class="device-name">{{ item.name }}
					<view class="dot"></view>
				</view>
			</view>
		</view>

		<!-- 功能菜单 -->
		<view class="menu-list">
			<view class="menu-item" v-for="(item, index) in menuItems" :key="index" @tap="onMenuItem(item)">
				<uni-icons :type="item.icon" size="36" color="#fff" style="margin-right: 6px;"></uni-icons>
				<text class="menu-title">{{ item.title }}</text>
			</view>
		</view>
		<!-- 切换区域 -->
		<view class="switch-area">
			<uni-segmented-control class="switch-control" :current="current" :values="items" @clickItem="onClickItem"
				styleType="text" activeColor="#1a9bf0"></uni-segmented-control>
			<view class="switch-content" :style="{ height: app_height * 0.5 + 'rpx' }">
				<view class="content-list" v-show="current === 0">
					<DeviceCard v-for="(item, index) in 4" :key="index" :device="item"></DeviceCard>
				</view>
				<view class="content-list" v-show="current === 1">
					<TerminalCard v-for="(item, index) in 3" :key="index" :device="item"></TerminalCard>
				</view>
				<view class="content-list" v-show="current === 2">
					<NetCard v-for="(item, index) in 2" :key="index" :device="item"></NetCard>
				</view>
				<view v-show="current === 3">
					<!-- 底部信息 -->
					<view class="bottom-info">
						<text class="info-item" v-for="(item, index) in bottomInfo" :key="index">{{ item }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	<uni-popup ref="popup" type="bottom" background-color="#fff" borderRadius="10px">
		<view class="popup-content">
			<view class="popup-title">
				快速添加设备
			</view>
			<view class="popup-area">
				<PopupCard v-for="(item, index) in popupMenuList" :key="index" :menuItem="item" @tapCard="onTapCard">
				</PopupCard>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
import {
	onMounted,
	ref
} from 'vue';
import DeviceCard from '../../components/DeviceCard.vue';
import TerminalCard from '../../components/TerminalCard.vue';
import NetCard from '../../components/NetCard.vue';
import PopupCard from '../../components/PopupCard.vue';


const popup = ref(null)

const navItems = ref(['设备中心']);
const deviceImages = ref([{
	name: "摄像头",
	content: "摄像头工作中",
	url: "/static/icon/camera-five.svg"
},
{
	name: "路由器",
	content: "路由器工作中",
	url: "/static/icon/router.svg"
}
])
// const menuItems = ref(['快速添加', '新手指南', '发现',]);
const menuItems = ref([{
	id: 1,
	icon: "plusempty",
	title: "快速添加"
},
{
	id: 2,
	icon: 'videocam',
	title: '产品'
}
]);

const popupMenuList = ref([
	{ id: 1, name: "连接蓝牙添加设备", icon: "/static/icon/bluetooth.svg" },
	{ id: 2, name: "扫码快速添加设备", icon: "/static/icon/scanning-two.svg" },
])

const items = ref(['设备', '终端', '网络', '更多']);
const current = ref(0);

const onClickItem = (e) => {
	current.value = e.currentIndex;
};

const imageError = (e) => {
	console.log('图片加载失败', e);
};
const bottomInfo = ref(['通用场景']);

/**
 * 点击扫一扫
 */
const onScan = () => {
	// 只允许通过相机扫码
	uni.scanCode({
		onlyFromCamera: true,
		success: function (res) {
			console.log('条码类型：' + res.scanType);
			console.log('条码内容：' + res.result);
			uni.showModal({
				title: '扫码成功',
				content: `结果：${res.result},条码类型：${res.scanType}`,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}
	});
}

/**
 * 点击快速添加按钮
 */
const onMenuItem = (item) => {
	console.log("item", item);
	if (item.id === 1) {
		// console.log("popup",popup.value.open());
		popup.value.open()
	}
}

/**
 * 点击卡片
 */
const onTapCard = (item) => {
	console.log("item", item);
	if (item.id === 1) {
		// 连接蓝牙
		onDeviceDetail('bluetoothLink')
	} else if (item.id === 2) {
		// 扫码
		onScan()
	}
}

/**
 * 跳转到设备详情页
 */
const onDeviceDetail = (pathName) => {
	uni.navigateTo({
		url: `/pages/${pathName}/${pathName}`
	});
}


// 获取手机可用高度
let app_height = ref(0);
onMounted(() => {
	uni.getSystemInfo({
		success: res => {
			app_height.value = res.windowHeight * 2;
		}
	});
})
</script>

<style scoped>
page {
	background-color: #f5f5f5;
}

/* .status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: linear-gradient(90deg, #1a9bf0, #1a5df0);
	} */

.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 20px;
	height: 100%;
	overflow: hidden;
}

.top-nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: linear-gradient(90deg, #1a9bf0, #1a5df0);
	height: cale(70px + var(--status-bar-height));
	width: 100%;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	width: 100%;
	position: fixed;
	top: 0px;
	z-index: 99999;
	padding-top: var(--status-bar-height);
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
	margin-top: 2px;
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
	justify-content: flex-start;
	margin-top: 90px;
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
}

.device-name {
	width: 100%;
	display: flex;
	align-items: center;
	font-size: 16px;
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
	grid-template-columns: repeat(2, 1fr);
	/* 创建两列，每列等宽 */
	gap: 5px;
	/* 设置网格项目之间的竖向间距为20px */
	grid-auto-rows: minmax(0, auto);
	/* 设置网格行的最小高度和最大高度 */
	padding: 10px;
	/* 设置容器的内边距为10px */
	box-sizing: border-box;
	/* 确保内边距不会增加容器的总宽度 */
	justify-content: space-between;
	/* 网格行之间的间距自动平分 */
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
	box-shadow: 2px 6px 10px rgba(97, 161, 249, 0.3);
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

.switch-area {
	width: 95%;
}

.switch-control ::v-deep .segmented-control__text {
	font-size: 18px;
}

.switch-content {
	margin-top: 20px;
	width: 100%;
	overflow-y: auto;
}

.content-list {
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 10px;
	margin-bottom: 20px;
	overflow-y: auto;
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

.popup-content {
	width: 100%;
	height: 370px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}

.popup-title {
	font-size: 18px;
	font-weight: 600;
	margin: 20px 0 20px 0;
	color: #333;
}

.popup-area {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.title-text {
	font-size: 20px;
	font-weight: 500;
}
</style>