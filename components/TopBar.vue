<template>
	<view class="content">
		<!-- 距离顶部的距离 刚好留出状态栏即可 即statusBarHeight -->
		<view class="topNav" :style="{height:navHeight+'px',paddingTop:statusBarHeight+'px'}">
			<view class="nav-left">
				<!-- 雪天前端 -->
			</view>
			<view class="nav-center">个人中心</view>
			<view class="nav-left">
				<!-- <input type="text" placeholder="请搜索" placeholder-class="placClass" /> -->
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,onMounted
	} from 'vue';

	const navHeight = ref("");  	//导航栏高度
	const statusBarHeight =ref("");  //状态栏高度
	
	onMounted(()=>{
		let { statusBarHeight,system } = uni.getSystemInfoSync()
		statusBarHeight.value = statusBarHeight;
		navHeight.value = statusBarHeight + (system.indexOf('iOS') > -1 ? 40 : 44)	  
	})
	
	
</script>

<style scoped>
	.topNav {
		height: 100rpx;
		/* background-color: #00aa7f; */
		background-color: transparent;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.nav-left {
		font-size: 36rpx;
		font-weight: 600;
		color: #ffeb3b;
		margin-right: 30rpx;
		font-style: italic;
	}
	
	.nav-left{
		width: 100%;
		display: flex;
		justify-content: center;
		font-weight: 600;
		padding-top: calc(10px + var(--status-bar-height));
		color: #FFFFFF;
	}
	
	.nav-center{
		width: 100%;
		display: flex;
		justify-content: center;
		padding-top: calc(10px + var(--status-bar-height));
		color: #FFFFFF;
		font-weight: 600;
	}
		
	.nav-left input {
		width: 60%;
		height: 62rpx;
		border-radius: 30rpx;
		padding-left: 25rpx;
		background-color: #f0f8ffa6;
		box-sizing: border-box;
	}

	.placClass {
		font-size: 24rpx;
		color: #fff;
	}
</style>