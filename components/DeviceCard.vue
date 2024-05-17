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
					设备在线
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.card {
	width: 92%;
	height: 100px;
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
	width: 60%;
	margin-left: 20px;
	margin-top: 10px;
}

.type-name {
	font-size: 16px;
	font-weight: 600;
	color: #333;
}

.device-name {
	font-size: 14px;
	color: #666;
	margin-top: 10px;
}

.tag{
	width: 60px;
	height: 20px;
	background-color: #F5F5F5;
	border-radius: 2px;
	font-size: 12px;
	color: #666;
	text-align: center;
}
</style>