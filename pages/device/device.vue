<template>
	<view class="container">
	  <!-- 顶部导航栏 -->
	  <view class="top-nav">
		<text class="time">18:10</text>
		<view class="nav-items">
		  <text class="nav-item" v-for="(item, index) in navItems" :key="index">{{ item }}</text>
		</view>
		<uni-icons type="scan" size="28" color="#FFFFFF"></uni-icons>
	  </view>
  
	  <!-- 用户信息 -->
	  <view class="user-info">
		<image class="avatar" src="/static/avatar.png" mode="aspectFill"></image>
		<view class="user-details">
		  <text class="username">ReyCE</text>
		  <text class="user-id">ID: 9527</text>
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
  
  const navItems = ref(['5G', '扫一扫', '虚拟体验', '有问必答']);
  const menuItems = ref(['快速添加', '新手指南', '发现', '产品', '项目', '工具', '我的']);
  const bottomInfo = ref(['通用场景', '2024.05.12', '1/1', '3/3']);
  </script>
  
  <style scoped>
  .container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
	background-color: #f5f5f5;
  }
  
  .top-nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: linear-gradient(90deg, #1a9bf0, #1a5df0);
	padding: 10px 20px;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	width: 100%;
  }
  
  .time {
	font-size: 18px;
	font-weight: bold;
	color: #fff;
  }
  
  .nav-items {
	display: flex;
  }
  
  .nav-item {
	margin-right: 20px;
	font-size: 16px;
	color: #fff;
  }
  
  .user-info {
	display: flex;
	align-items: center;
	margin-top: 40px;
	margin-bottom: 20px;
  }
  
  .avatar {
	width: 120px;
	height: 120px;
	border: 4px solid #fff;
	border-radius: 50%;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	margin-right: 20px;
  }
  
  .user-details {
	display: flex;
	flex-direction: column;
	justify-content: center;
	color: #333;
  }
  
  .username {
	font-size: 24px;
	font-weight: bold;
  }
  
  .user-id {
	font-size: 18px;
  }
  
  .menu-list {
	width: 100%;
	margin-top: 20px;
  }
  
  .menu-item {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px 0;
	background: linear-gradient(45deg, #45e0f0, #679ef0);
	color: #fff;
	border-radius: 5px;
	margin-bottom: 10px;
	box-shadow: 0 2px 10px rgba(101, 158, 240, 0.3);
	width: 80%;
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