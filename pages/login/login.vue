<template>
	<view class="zai-box">
		<image src="/static/zaizai-login/login.png" mode='aspectFit' class="zai-logo"></image>
		<view class="zai-title">
			<image class="logo" src="/static/logo.png"></image>
			<text class="logo-title">
				IotApp
			</text>
		</view>

		<view class="zai-form">
			<input class="zai-input" v-model="form.username" placeholder-class="placeholder"
				placeholder="请输入用户名" :maxlength="20" />
			<input class="zai-input" v-model="form.password" placeholder-class="placeholder" password
				placeholder="请输入密码" :maxlength="32" @confirm="onLogin" />

			<view class="zai-label">忘记密码？</view>

			<button class="zai-btn" :loading="loading" :disabled="loading" @click="onLogin">
				{{ loading ? '登录中...' : '立即登录' }}
			</button>
			<navigator url="/pages/register/register" hover-class="none" class="zai-label">还没有账号？点此注册.</navigator>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { login } from '../../api/auth.js';
import { setLogin } from '../../utils/auth.js';

const form = reactive({
	username: '',
	password: ''
});

const loading = ref(false);

/**
 * 表单校验
 * @returns {string} 错误提示，空字符串代表校验通过
 */
const validate = () => {
	if (!form.username.trim()) return '请输入用户名';
	if (!form.password) return '请输入密码';
	if (form.password.length < 6) return '密码至少 6 位';
	return '';
};

/**
 * 登录
 * 注意：原实现无论输入什么都直接跳转到设备页，属于假登录。
 */
const onLogin = async () => {
	if (loading.value) return;

	const msg = validate();
	if (msg) {
		uni.showToast({ title: msg, icon: 'none' });
		return;
	}

	loading.value = true;
	try {
		const res = await login({
			username: form.username.trim(),
			password: form.password
		});

		if (!res || !res.token) {
			uni.showToast({ title: '登录失败，请重试', icon: 'none' });
			return;
		}

		setLogin(res.token, res.userInfo);
		uni.showToast({ title: '登录成功', icon: 'success' });
		setTimeout(() => {
			uni.switchTab({ url: '/pages/device/device' });
		}, 500);
	} catch (err) {
		// 错误提示由 request 层统一处理，这里不重复弹窗
		console.error('登录失败', err);
	} finally {
		loading.value = false;
	}
};
</script>

<style scoped>
	.zai-box {
		padding: 0 100rpx;
		padding-top: 45px;
		overflow: hidden;
		position: relative;
	}

	.zai-logo {
		width: 100%;
		height: 310rpx;
	}

	.logo {
		width: 70px;
		height: 70px;
	}

	.logo-title {
		font-size: 32px;
		color: #fff;
		font-weight: 600;
		margin-left: 10px;
	}

	.zai-title {
		position: absolute;
		top: 40px;
		line-height: 360rpx;
		font-size: 68rpx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
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
		background: #679ef0;
		color: #fff;
		border: 0;
		border-radius: 100rpx;
		font-size: 36rpx;
	}

	.zai-btn:after {
		border: 0;
	}

	.zai-btn[disabled] {
		opacity: 0.7;
	}

	/*按钮点击效果*/
	.zai-btn.button-hover {
		transform: translate(1rpx, 1rpx);
	}
</style>