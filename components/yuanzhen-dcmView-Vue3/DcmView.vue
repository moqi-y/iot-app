<template>
	<view>
		<view id="dicomImage" :style="{width:width,height:height}"></view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from "vue"

	const props = defineProps({
		imgurl: {
			type: String,
			default: ''
		},
		toolType: {
			type: String,
			default: 'Wwwc'
		},
		width: {
			type: String,
			default: '750rpx'
		},
		height: {
			type: String,
			default: '1000rpx'
		}
	})

	// //由于uniapp框架原因，故使用此方法加载第三方库文件
	function loadJs(url, callback) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.type = "text/javascript";
			if (script.readyState) {
				script.onreadystatechange = function() {
					if (script.readyState == "loaded" || script.readyState == "complete") {
						script.onreadystatechange = null;
						resolve();
					}
				}
			} else {
				script.onload = function() {
					resolve()
				}
			}
			script.src = url;
			document.body.appendChild(script);
		})
	}


	const viewDcm = () => {
		// 注册并挂载cornerstone及其cornerstoneTools，固定操作
		cornerstoneTools.external.cornerstone = cornerstone;
		cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
		cornerstoneTools.external.Hammer = Hammer;
		cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
		cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
		// imageId就是cornerstone要求的.dcm图片地址,例如：var imageId = "wadouri:http://127.0.0.1:6699/ctdcm1.dcm";
		//此处因作为组件使用，故为地址拼接。(imgurl通过在props中传值)
		var imageId = "wadouri:" + props.imgurl;
		// 初始化cornerstoneTools
		cornerstoneTools.init();
		// 获取要用于加载图片的div区域
		var element = document.getElementById('dicomImage');
		//激活获取到的用于图片加载的区域
		cornerstone.enable(element);

		switch (props.toolType) {
			case "Wwwc":
				// 从cornerstoneTools库中获取窗宽,窗高工具
				const WwwcTool = cornerstoneTools.WwwcTool;
				//添加WwwcTool窗宽,窗高工具
				cornerstoneTools.addTool(WwwcTool);
				// 绑定工具操作功能到鼠标左键
				cornerstoneTools.setToolActive('Wwwc', {
					mouseButtonMask: 1
				})
				break;
			case "Angle":
				// 角度工具
				const AngleTool = cornerstoneTools.AngleTool;
				cornerstoneTools.addTool(AngleTool)
				cornerstoneTools.setToolActive('Angle', {
					mouseButtonMask: 1
				})
				break;
			case "RectangleRoi":
				// 矩形Roi工具
				const RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
				cornerstoneTools.addTool(RectangleRoiTool)
				cornerstoneTools.setToolActive('RectangleRoi', {
					mouseButtonMask: 1
				})
				break;
			case "DragProbe":
				// 拖动探针工具
				const DragProbeTool = cornerstoneTools.DragProbeTool;
				cornerstoneTools.addTool(DragProbeTool)
				cornerstoneTools.setToolActive('DragProbe', {
					mouseButtonMask: 1
				})
				break;
			case "Length":
				// 长度工具
				const LengthTool = cornerstoneTools.LengthTool;
				cornerstoneTools.addTool(LengthTool)
				cornerstoneTools.setToolActive('Length', {
					mouseButtonMask: 1
				})
				break;
			default:
				throw new Error("工具参数错误")
				break;
		}
		//使用loadAndCacheImage()方法加载并缓存图片，然后使用displayImage()方法显示图片。
		cornerstone.loadAndCacheImage(imageId).then(function(image) {
			cornerstone.displayImage(element, image);
		})
	}

	onMounted(async () => {
		await loadJs("./components/yuanzhen-dcmView-Vue3/dist/cornerstone.js")
		await loadJs("./components/yuanzhen-dcmView-Vue3/dist/cornerstoneMath.min.js")
		await loadJs("./components/yuanzhen-dcmView-Vue3/dist/cornerstoneTools.js")
		await loadJs("./components/yuanzhen-dcmView-Vue3/dist/hammer.js")
		await loadJs("./components/yuanzhen-dcmView-Vue3/dist/dicomParser.min.js")
		await loadJs("./components/yuanzhen-dcmView-Vue3/dist/cornerstoneWADOImageLoader.bundle.min.js")
		await loadJs("./components/yuanzhen-dcmView-Vue3/dist/cornerstoneWebImageLoader.min.js")
		viewDcm()
	})
</script>

<style>
</style>