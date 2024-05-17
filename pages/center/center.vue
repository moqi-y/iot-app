<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="nav-bar">个人中心</view>
		<view class="head">
			<view class="info">
				<view class="user">
					<image src="/static/images/user.jpg" mode="aspectFill"></image>
					<view class="name"><text>niew</text><text>ID: 9527</text></view>
				</view>
				<view class="btn">
					<uni-icons type="notification" size="28" color="#1296db"></uni-icons>
					消息中心
				</view>
			</view>
		</view>
		<view class="menu-box">
			<view class="region">
				<view class="title">我的设备</view>
				<view class="menu-row">
					<view class="cell">
						<view class="count online">33</view>
						<view class="name">在线设备</view>
					</view>
					<view class="cell">
						<view class="count offline">12</view>
						<view class="name">离线设备</view>
					</view>
					<view class="cell">
						<view class="count warning">53</view>
						<view class="name">异常设备</view>
					</view>
				</view>
			</view>
			<view class="region">
				<view class="title">我的终端</view>
				<view class="menu-row">
					<view class="cell">
						<view class="count online">122</view>
						<view class="name">在线终端</view>
					</view>
					<view class="cell">
						<view class="count offline">2</view>
						<view class="name">离线终端</view>
					</view>
					<view class="cell">
						<view class="count warning">5</view>
						<view class="name">异常终端</view>
					</view>
				</view>
			</view>
			<view class="region" style="margin-bottom: 120rpx;">
				<view class="title">我的网络</view>
				<view class="menu-row">
					<view class="cell">
						<view class="count">54</view>
						<view class="name">广域网</view>
					</view>
					<view class="cell">
						<view class="count">2</view>
						<view class="name">局域网</view>
					</view>
					<view class="cell">
						<view class="count" style="color:#ff7962;font-weight:1000;">＋</view>
						<view class="name">新增网络</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {

		}
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
page {
	background-color: #f8f8f8;
}

.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		opacity: 100%;
	}
.nav-bar {
	width: 70px;
	text-align: center;
	position: absolute;
	z-index: 9999;
	font-size: 16px;
	color: #fff;
	left: 152.5px;
	top: 20px;
	font-weight: 600;
}

.head {
	position: relative;
	width: 100%;
	height: 400rpx;
	background-color: #ff7962;
	background-image: url("/static/images/bird.jpg");
	background-size: cover;
}

.head .info {
	padding-top: 150rpx;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.head .info .user {
	padding-left: 50rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.head .info .user image {
	width: 120rpx;
	height: 120rpx;
}

.head .info .user .name {
	padding-left: 20rpx;
	font-size: 28rpx;
	font-weight: 600;
	color: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
}

.head .info .user .name text {
	line-height: 40rpx;
}

.head .info .btn {
	text-align: center;
	background-color: #ff907c;
	color: #FFFFFF;
	font-size: 30rpx;
	width: 200rpx;
	height: 80rpx;
	line-height: 80rpx;
	border-top-left-radius: 10rpx;
	border-bottom-left-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.menu-box {
	position: absolute;
	top: 300rpx;
	width: 100%;
	margin-bottom: 120rpx;
}

.region {
	background-color: #FFFFFF;
	margin: 30rpx;
	border-radius: 10rpx;
}

.region .title {
	font-size: 32rpx;
	font-weight: bold;
	padding: 30rpx;
}

.region .menu-row {
	display: flex;
	justify-content: center;
	align-items: center;
}

.region .menu-row .cell {
	width: 30%;
	height: 200rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.region .menu-row .cell .count {
	font-size: 40rpx;
}

.region .menu-row .cell .name {
	font-size: 30rpx;
	line-height: 100rpx;
	color: #8a8a8a;
}

.online {
	color: #1ec33ac1;
	font-weight: bold;
}

.offline {
	color: red;
	font-weight: bold;
}

.warning {
	color: #f08008;
	font-weight: bold;
}
</style>