<template>
	<view class="zai-box">
		<image src="/static/zaizai-login/register.png" mode='aspectFit' class="zai-logo"></image>
		<view class="zai-title">LOGO区域</view>

		<view class="zai-form">
			<input class="zai-input" v-model="form.phone" type="number" placeholder-class="placeholder"
				placeholder="请输入手机号码" :maxlength="11" />

			<view class="zai-input-btn">
				<input class="zai-input" v-model="form.code" type="number" placeholder-class="placeholder"
					placeholder="验证码" :maxlength="6" />
				<view class="zai-checking" v-if="!counting" @click="onSendCode">获取验证码</view>
				<view class="zai-checking zai-time" v-else>倒计时{{ countdown }}s</view>
			</view>

			<input class="zai-input" v-model="form.password" placeholder-class="placeholder" password
				placeholder="请输入密码" :maxlength="32" />

			<button class="zai-btn" :loading="loading" :disabled="loading" @click="onRegister">
				{{ loading ? '注册中...' : '立即注册' }}
			</button>
			<navigator url="/pages/login/login" hover-class="none" class="zai-label">已有账号，点此去登录.</navigator>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue';
import { register, sendSmsCode } from '../../api/auth.js';

const form = reactive({
	phone: '',
	code: '',
	password: ''
});

const loading = ref(false);
const counting = ref(false);
const countdown = ref(60);

// 保存定时器句柄，用于离开页面时清理，避免内存泄漏与状态错乱
let timer = null;

/** 清除倒计时 */
const clearTimer = () => {
	if (timer) {
		clearInterval(timer);
		timer = null;
	}
	counting.value = false;
	countdown.value = 60;
};

/**
 * 发送验证码并启动倒计时
 * 原实现使用 setTimeout 递归 + 多个状态变量自增，逻辑分散且无法清理，
 * 这里改为单一定时器统一驱动。
 */
const onSendCode = async () => {
	if (counting.value) return;

	if (!/^1[3-9]\d{9}$/.test(form.phone)) {
		uni.showToast({ title: '请输入正确的手机号', icon: 'none' });
		return;
	}

	try {
		await sendSmsCode({ phone: form.phone });
	} catch (err) {
		console.error('发送验证码失败', err);
		return;
	}

	uni.showToast({ title: '验证码已发送', icon: 'none' });

	counting.value = true;
	countdown.value = 60;
	clearTimer();
	timer = setInterval(() => {
		countdown.value -= 1;
		if (countdown.value <= 0) {
			clearTimer();
		}
	}, 1000);
};

/** 表单校验 */
const validate = () => {
	if (!/^1[3-9]\d{9}$/.test(form.phone)) return '请输入正确的手机号';
	if (!/^\d{6}$/.test(form.code)) return '请输入 6 位验证码';
	if (!form.password) return '请输入密码';
	if (form.password.length < 6) return '密码至少 6 位';
	return '';
};

const onRegister = async () => {
	if (loading.value) return;

	const msg = validate();
	if (msg) {
		uni.showToast({ title: msg, icon: 'none' });
		return;
	}

	loading.value = true;
	try {
		await register({
			phone: form.phone,
			code: form.code,
			password: form.password
		});
		uni.showToast({ title: '注册成功', icon: 'success' });
		clearTimer();
		setTimeout(() => {
			uni.redirectTo({ url: '/pages/login/login' });
		}, 800);
	} catch (err) {
		console.error('注册失败', err);
	} finally {
		loading.value = false;
	}
};

onBeforeUnmount(() => {
	clearTimer();
});
</script>

<style>
	.zai-box {
		padding: 0 100rpx;
		position: relative;
	}

	.zai-logo {
		width: 100%;
		height: 310rpx;
	}

	.zai-title {
		position: absolute;
		top: 0;
		line-height: 360rpx;
		font-size: 68rpx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100rpx;
	}

	.zai-form {
		margin-top: 300rpx;
	}

	.zai-input {
		background: #e2f5fc;
		margin-top: 30rpx;
		border-radius: 100rpx;
		padding: 20rpx 40rpx;
		font-size: 36rpx;
	}

	.input-placeholder,
	.zai-input {
		color: #94afce;
	}

	.zai-label {
		padding: 60rpx 0;
		text-align: center;
		font-size: 30rpx;
		color: #a7b6d0;
	}

	.zai-btn {
		background: #ff65a3;
		color: #fff;
		border: 0;
		border-radius: 100rpx;
		font-size: 36rpx;
		margin-top: 60rpx;
	}

	.zai-btn:after {
		border: 0;
	}

	.zai-btn[disabled] {
		opacity: 0.7;
	}

	/*验证码输入框*/
	.zai-input-btn {
		position: relative;
	}

	.zai-input-btn .zai-input {
		padding-right: 260rpx;
	}

	.zai-checking {
		position: absolute;
		right: 0;
		top: 0;
		background: #ff65a3;
		color: #fff;
		border: 0;
		border-radius: 110rpx;
		font-size: 36rpx;
		margin-left: auto;
		margin-right: auto;
		padding-left: 28rpx;
		padding-right: 28rpx;
		box-sizing: border-box;
		text-align: center;
		text-decoration: none;
		line-height: 2.55555556;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		padding-top: 2rpx;
		padding-bottom: 2rpx;
	}

	.zai-checking.zai-time {
		background: #a7b6d0;
	}

	/*按钮点击效果*/
	.zai-btn.button-hover {
		transform: translate(1rpx, 1rpx);
	}
</style>