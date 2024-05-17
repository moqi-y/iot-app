<template>
	<view class="card">
		<view class="dievice-icon">
			<image class="device-icon-img" src="/static/icon/摄像头_camera-five.svg" @error="imageError"></image>
		</view>
		<view class="device-info">
			<view class="type-name">默认设备</view>
			<view class="device-name">网络摄像头</view>
			<view class="device-status">
				<view class="tag">
					<view class="dot"></view>设备在线
				</view>
			</view>
		</view>
		<view class="options">
			<uni-icons type="tune" size="22" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.card {
	width: 92%;
	height: 75px;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
	margin-bottom: 20px;
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
	background-color: #F5F5F5;
}

.device-icon-img{
	width: 65px;
	height: 65px;
}

.device-info {
	width: 50%;
	margin-left: 20px;
}

.type-name {
	font-size: 16px;
	font-weight: 600;
	color: #333;
}

.device-name {
	font-size: 14px;
	color: #666;
	margin-top: 5px;
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

.dot {
	width: 8px; /* 保持原有的宽度 */
	height: 8px; /* 保持原有的高度 */
	background-color: #1ec33ac1; /* 保持原有的背景色 */
	border-radius: 50%; /* 保持原有的边框圆角 */
	margin-right: 2px; /* 保持原有的外边距 */
}

.options{
	width: 8%;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	margin-top: -2px;
}
</style>