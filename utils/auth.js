/**
 * 登录态管理
 *
 * 统一封装 token / 用户信息的读写与校验，避免各页面直接操作 storage。
 */

const TOKEN_KEY = 'token'
const USER_KEY = 'userInfo'

/** 读取 token */
export function getToken() {
	try {
		return uni.getStorageSync(TOKEN_KEY) || ''
	} catch (e) {
		return ''
	}
}

/** 读取用户信息 */
export function getUserInfo() {
	try {
		return uni.getStorageSync(USER_KEY) || null
	} catch (e) {
		return null
	}
}

/** 是否已登录 */
export function isLoggedIn() {
	return !!getToken()
}

/**
 * 保存登录态
 * @param {string} token
 * @param {object} userInfo
 */
export function setLogin(token, userInfo = {}) {
	try {
		uni.setStorageSync(TOKEN_KEY, token)
		uni.setStorageSync(USER_KEY, userInfo)
	} catch (e) {
		console.error('保存登录态失败', e)
	}
}

/** 清除登录态 */
export function clearLogin() {
	try {
		uni.removeStorageSync(TOKEN_KEY)
		uni.removeStorageSync(USER_KEY)
	} catch (e) {
		console.error('清除登录态失败', e)
	}
}

/**
 * 路由守卫：未登录时跳转登录页
 * @param {string} current 当前页面路径
 * @returns {boolean} 已放行返回 true
 */
export function requireLogin(current) {
	// 登录页与注册页放行，否则会形成重定向死循环
	const whiteList = ['/pages/login/login', '/pages/register/register']
	if (whiteList.includes(current)) return true

	if (isLoggedIn()) return true

	uni.reLaunch({
		url: '/pages/login/login'
	})
	return false
}

/** 退出登录并回到登录页 */
export function logout() {
	clearLogin()
	uni.reLaunch({
		url: '/pages/login/login'
	})
}