import { get } from '../utils/request.js'

/** 健康检查接口 */
export function getTest(data) {
	return get("/ping", data, { silent: true })
}