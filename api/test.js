import {request} from '../utils/request.js'

export function getTest(data){
	return request({
		url:"/ping",
		method:"get",
		data:data
	})
}