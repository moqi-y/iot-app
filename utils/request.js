import { BASE_URL, REQUEST_TIMEOUT } from './config.js'

/** 从本地缓存读取登录凭证 */
function getToken() {
	try {
		return uni.getStorageSync('token') || ''
	} catch (e) {
		return ''
	}
}

/** 登录态失效：清理凭证并回到登录页 */
function handleUnauthorized() {
	try {
		uni.removeStorageSync('token')
		uni.removeStorageSync('userInfo')
	} catch (e) {
		// 忽略存储异常
	}
	uni.showToast({
		title: '登录已过期，请重新登录',
		icon: 'none'
	})
	setTimeout(() => {
		uni.reLaunch({ url: '/pages/login/login' })
	}, 800)
}

/**
 * 统一网络请求封装
 *
 * @param {object} obj
 * @param {string} obj.url     接口路径
 * @param {string} [obj.method] 请求方法，默认 GET
 * @param {object} [obj.data]  请求参数
 * @param {object} [obj.header] 额外请求头
 * @param {boolean} [obj.silent] 为 true 时不自动弹出错误提示
 * @returns {Promise<any>} 成功时 resolve 服务端 data，失败时 reject
 */
export function request(obj = {}) {
	const { url, method = 'GET', data = {}, header = {}, silent = false } = obj

	if (!url) {
		return Promise.reject(new Error('请求地址不能为空'))
	}

	const token = getToken()

	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method,
			data,
			timeout: REQUEST_TIMEOUT,
			header: {
				'content-type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
				...header
			},
			success: (res) => {
				const { statusCode, data: resData } = res

				if (statusCode === 401 || statusCode === 403) {
					handleUnauthorized()
					reject(new Error('登录状态失效'))
					return
				}

				if (statusCode < 200 || statusCode >= 300) {
					const msg = (resData && (resData.message || resData.msg)) || `请求失败（${statusCode}）`
					if (!silent) {
						uni.showToast({ title: msg, icon: 'none' })
					}
					reject(new Error(msg))
					return
				}

				resolve(resData)
			},
			fail: (err) => {
				// 超时与网络不可达分开提示，便于定位问题
				const msg = /timeout/i.test(err.errMsg || '')
					? '请求超时，请检查网络后重试'
					: '网络连接失败，请检查网络设置'
				if (!silent) {
					uni.showToast({ title: msg, icon: 'none' })
				}
				reject(new Error(msg))
			}
		})
	})
}

/** 简易 GET */
export const get = (url, data, options) => request({ url, method: 'GET', data, ...options })

/** 简易 POST */
export const post = (url, data, options) => request({ url, method: 'POST', data, ...options })

export default request