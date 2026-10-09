/**
 * 全局配置
 *
 * BASE_URL 通过环境变量注入，便于区分开发 / 测试 / 生产环境，
 * 避免把真实域名硬编码进业务代码。
 */

// HBuilderX / CLI 均会在构建时做条件编译，生产包走生产地址
const ENV = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

const BASE_URLS = {
	dev: 'https://mock.apifox.com/m1/4351750-0-default',
	prod: 'https://mock.apifox.com/m1/4351750-0-default'
}

export const BASE_URL = BASE_URLS[ENV] || BASE_URLS.dev

/** 请求超时时间（ms） */
export const REQUEST_TIMEOUT = 15000

export default {
	ENV,
	BASE_URL,
	REQUEST_TIMEOUT
}