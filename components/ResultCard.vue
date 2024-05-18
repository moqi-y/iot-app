<template>
	<view class="card" @tap="$emit('connect', device)">
		<view class="dievice-icon">
			<image class="device-icon-img" src="/static/icon/devices.svg" @error="imageError"></image>
		</view>
		<view class="device-info">
			<view class="type-name">{{ device.name || "未知设备" }}</view>
			<view class="device-name">{{ device.deviceId }}</view>
		</view>
		<view class="options">
			<view class="device-status">
				<view class="tag">
					点击连接
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	device: {
		type: Object,
		default: () => {}
	}
})

const imageError = () => {
	console.log('图片加载失败');
}
</script>

<style lang="scss" scoped>
.card {
	width: 92%;
	height: 60px;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.1);
	margin-bottom: 10px;
	padding: 4%;
	display: flex;
	justify-content: space-around;
}

.dievice-icon{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30%;
	height: 100%;
	border-radius: 10px;
}

.device-icon-img{
	width: 65px;
	height: 65px;
}

.device-info {
	width: 45%;
	margin-left: 20px;
}

.type-name {
	font-size: 19px;
	font-weight: 700;
	color: #333;
	display: flex;
	flex-wrap: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.device-name {
	font-size: 15px;
	color: #666;
	margin-top: 8px;
}

.device-status{
	font-weight: bold;
	margin-top: 5px;
}

.tag {
	padding: 2px 10px; /* 保持原有的内边距 */
	height: 20px; /* 保持原有的高度 */
	background-color: #F5F5F5; /* 保持原有的背景色 */
	border-radius: 2px; /* 保持原有的边框圆角 */
	font-size: 12px; /* 保持原有的字体大小 */
	color: #00000073; /* 保持原有的字体颜色 */
	text-align: center; /* 保持原有的文本居中 */
	display: inline-flex; 
	align-items: center;
	justify-content: center;
	white-space: nowrap; /* 添加属性，防止文本换行 */
}


.options{
	width: 15%;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	margin-top: -2px;
}
</style>