import { post } from '../utils/request.js'

/**
 * 账号相关接口
 *
 * 说明：当前后端为 Apifox Mock（仅提供 /ping），真实登录接口尚未就绪。
 * 这里按标准 REST 约定定义好调用签名，后端就绪后去掉 USE_MOCK 即可，
 * 页面层无需改动。
 */

// 联调开关：Mock 未提供账号接口时置为 true，走本地模拟
const USE_MOCK = true

/** 模拟登录延迟，让按钮的 loading 态可见 */
const delay = (ms) => new Promise((r) => setTimeout(r, ms))

/**
 * 账号登录
 * @param {{username: string, password: string}} params
 * @returns {Promise<{token: string, userInfo: object}>}
 */
export async function login(params) {
	if (USE_MOCK) {
		await delay(600)
		const { username } = params
		return {
			token: `mock_token_${Date.now()}`,
			userInfo: {
				nickName: username,
				userId: '9527',
				avatar: '/static/images/user.jpg'
			}
		}
	}

	// 标准登录：POST /auth/login { username, password } -> { token, userInfo }
	const res = await post('/auth/login', params, { silent: true })
	return {
		token: res.token || res.data?.token,
		userInfo: res.userInfo || res.data?.userInfo || {}
	}
}

/**
 * 账号注册
 * @param {{phone: string, code: string, password: string}} params
 */
export async function register(params) {
	if (USE_MOCK) {
		await delay(600)
		return { ok: true }
	}

	return post('/auth/register', params, { silent: true })
}

/**
 * 发送短信验证码
 * @param {{phone: string}} params
 */
export async function sendSmsCode(params) {
	if (USE_MOCK) {
		await delay(400)
		return { ok: true }
	}

	return post('/auth/sms-code', params, { silent: true })
}