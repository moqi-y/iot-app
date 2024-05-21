// 基础网络请求路径
const BASE_URL = "https://mock.apifox.com/m1/4351750-0-default";

/**
 * 封装的网络请求方法
 */
export function request(obj) {
	// 配置请求的参数
	const options = {
		url: BASE_URL + obj.url,
		method: obj.method || "GET",
		data: obj.data || {},
		header: obj.header || {
			'content-type': 'application/json' // 默认发送JSON格式数据
		}
	};

	// 返回一个Promise
	return new Promise((resolve, reject) => {
		uni.request({
			...options,
			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}