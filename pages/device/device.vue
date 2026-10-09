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
			<view class="switch-content" :style="{ height: switchAreaHeight + 'px' }">
				<view class="content-list" v-show="current === 0">
					<view class="empty-tip" v-if="deviceList.length === 0">暂无设备，点击上方「快速添加」</view>
					<DeviceCard v-for="item in deviceList" :key="item.id" :device="item" @onTap="onTapDeviceCard"
						@onMenu="onDeviceMenu"></DeviceCard>
				</view>
				<view class="content-list" v-show="current === 1">
					<TerminalCard v-for="(item, index) in 3" :key="index" :device="item"></TerminalCard>
				</view>
				<view class="content-list" v-show="current === 2">
					<NetCard v-for="(item, index) in 2" :key="index" :device="item"></NetCard>
				</view>
				<view v-show="current === 3">
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
import {
	onShow
} from '@dcloudio/uni-app';
import {
	requireLogin
} from '../../utils/auth.js';

const DEVICE_KEY = 'deviceList'

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

/**
 * 设备列表
 * 使用本地缓存持久化，新增 / 删除后重新进入页面数据仍在。
 */
const deviceList = ref([])

/** 读取本地设备列表 */
const loadDevices = () => {
	try {
		const cached = uni.getStorageSync(DEVICE_KEY)
		deviceList.value = Array.isArray(cached) ? cached : []
	} catch (e) {
		deviceList.value = []
	}
}

/** 写入本地设备列表 */
const saveDevices = () => {
	try {
		uni.setStorageSync(DEVICE_KEY, deviceList.value)
	} catch (e) {
		console.error('保存设备列表失败', e)
	}
}

/** 生成不重复的设备 id */
let idSeed = Date.now()
const genId = () => ++idSeed
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
		success: (res) => {
			// 兼容二维码内容为纯文本或 JSON 两种形态
			const parsed = parseScanResult(res.result);
			if (!parsed) {
				uni.showModal({
					title: '无法识别',
					content: `该二维码不是有效的设备码：${res.result}`,
					showCancel: false
				});
				return;
			}

			// 已存在则提示，避免重复添加
			if (deviceList.value.some((d) => d.sn === parsed.sn)) {
				uni.showToast({ title: '该设备已添加', icon: 'none' });
				return;
			}

			uni.showModal({
				title: '扫码成功',
				content: `设备名称：${parsed.name}\n设备编号：${parsed.sn}`,
				confirmText: '添加',
				success: (modalRes) => {
					if (modalRes.confirm) {
						addDevice(parsed);
					}
				}
			});
		},
		fail: (err) => {
			// 用户主动取消扫码不提示错误
			if (/cancel/i.test(err.errMsg || '')) return;
			uni.showToast({ title: '扫码失败，请重试', icon: 'none' });
		}
	});
}

/**
 * 解析扫码结果
 * 支持纯文本（sn 或 sn,name）与 JSON 两种格式，解析失败返回 null。
 */
const parseScanResult = (raw) => {
	if (!raw) return null;
	const text = String(raw).trim();

	if (text.startsWith('{')) {
		try {
			const obj = JSON.parse(text);
			if (obj && obj.sn) {
				return {
					sn: String(obj.sn),
					name: obj.name || obj.deviceName || '未知设备',
					typeName: obj.typeName || '监控设备'
				};
			}
		} catch (e) {
			return null;
		}
		return null;
	}

	// 纯文本：支持 "sn" 或 "sn,name"
	const [sn, name] = text.split(',');
	if (!sn) return null;
	return {
		sn: sn.trim(),
		name: (name || '扫码设备').trim(),
		typeName: '监控设备'
	};
}

/** 添加设备到列表 */
const addDevice = (parsed) => {
	deviceList.value.unshift({
		id: genId(),
		sn: parsed.sn,
		typeName: parsed.typeName || '监控设备',
		deviceName: parsed.name || '未知设备',
		deviceStatus: '设备在线',
		icon: '/static/icon/camera-five.svg'
	});
	saveDevices();
	uni.showToast({ title: '添加成功', icon: 'success' });
};

/**
 * 点击快速添加按钮
 */
const onMenuItem = (item) => {
	if (item.id === 1) {
		popup.value?.open()
	}
}

/**
 * 设备卡片菜单：删除 / 编辑
 * @param {{action: string, device: object}} payload
 */
const onDeviceMenu = ({ action, device }) => {
	if (!device) return;

	if (action === '删除') {
		uni.showModal({
			title: '删除设备',
			content: `确定要删除「${device.deviceName}」吗？`,
			confirmColor: '#e64340',
			success: (res) => {
				if (res.confirm) {
					deviceList.value = deviceList.value.filter((d) => d.id !== device.id);
					saveDevices();
					uni.showToast({ title: '已删除', icon: 'none' });
				}
			}
		});
		return;
	}

	if (action === '编辑') {
		uni.showModal({
			title: '重命名设备',
			editable: true,
			placeholderText: '请输入新的设备名称',
			content: device.deviceName,
			success: (res) => {
				if (!res.confirm) return;
				const name = (res.content || '').trim();
				if (!name) {
					uni.showToast({ title: '名称不能为空', icon: 'none' });
					return;
				}
				const target = deviceList.value.find((d) => d.id === device.id);
				if (target) {
					target.deviceName = name;
					saveDevices();
					uni.showToast({ title: '修改成功', icon: 'success' });
				}
			}
		});
	}
};

/**
 * 点击列表中的设备项
 */
const onTapDeviceCard = (e) => {
	uni.navigateTo({
		url: `/pages/deviceDetail/deviceDetail?deviceId=${encodeURIComponent(e.id)}` +
			`&typeName=${encodeURIComponent(e.typeName || '')}` +
			`&deviceName=${encodeURIComponent(e.deviceName || '')}`
	})
}


/**
 * 点击卡片
 */
const onTapCard = (item) => {
	if (item.id === 1) {
		// 连接蓝牙
		popup.value?.close()
		onDeviceDetail('bluetoothLink')
	} else if (item.id === 2) {
		// 扫码
		popup.value?.close()
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


// 切换区可用高度（px）
// 注意：windowHeight 返回的是 px，此处不再做 rpx 换算，
// 避免 px / rpx 单位混用导致高度计算错误。
const switchAreaHeight = ref(0);

// 页面每次显示都做登录校验，并加载本地设备数据
// （tabBar 页面通过 switchTab 跳转不会重新触发 onLoad）
onShow(() => {
	if (requireLogin('/pages/device/device')) {
		loadDevices();
	}
});

onMounted(() => {
	// getWindowInfo 为新 API，getSystemInfo 在新版本已废弃
	const info = typeof uni.getWindowInfo === 'function'
		? uni.getWindowInfo()
		: uni.getSystemInfoSync();
	// 预留顶部导航、菜单区与 tabBar 的空间
	switchAreaHeight.value = Math.max((info.windowHeight || 0) * 0.5, 0);
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
	height: calc(70px + var(--status-bar-height));
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	width: 100%;
	position: fixed;
	top: 0px;
	z-index: 99999;
	box-sizing: border-box;
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

.empty-tip {
	padding: 60rpx 0;
	text-align: center;
	font-size: 28rpx;
	color: #999;
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