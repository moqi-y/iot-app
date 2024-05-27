<template>
	<view>
		<canvas class="canvas" ref="canvasRef" canvas-id="myCanvas" id="myCanvasId"></canvas>
	</view>
</template>
<script setup>
	import {
		ref,
		onMounted,
		defineProps
	} from "vue";

	// 画布信息
	const ctxInfo = ref({})

	let imageWidth = 50
	let imageHeight = imageWidth

	const props = defineProps({
		root: {
			type: Array,
			default: [{
				id: 101,
				typeId: 1,
				name: "以太网",
				image: "../../static/icon/Windows_Firewall_Icon.png"
			}]
		},
		gateway: {
			type: Array,
			default: [{
				id: 201,
				typeId: 2,
				name: "网关-Gate-1",
				image: "../../static/icon/router.svg"
			}]
		},
		switch: {
			type: Array,
			default: [{
				id: 301,
				typeId: 3,
				name: "网络交换机",
				image: "../../static/icon/switch-device.webp"
			}]
		},
		devices: {
			type: Array,
			default: [{
					id: 401,
					typeId: 4,
					name: "移动设备",
					image: "../../static/icon/devices.svg"
				},
				{
					id: 402,
					typeId: 4,
					name: "监控设备",
					image: "../../static/icon/camera-five.svg"
				},
				{
					id: 403,
					typeId: 4,
					name: "终端设备",
					image: "../../static/icon/earth.svg"
				},
				{
					id: 404,
					typeId: 4,
					name: "无线设备",
					image: "../../static/icon/wifi.svg"
				}
			]
		},
		bridges: []
	})

	const canvasElement = ref({})

	onMounted(() => {
		init()
	})

	const init = () => {
		const query = uni.createSelectorQuery().in(this);
		query
			.select("#myCanvasId")
			.boundingClientRect((data) => {
				canvasElement.value = data
				console.log("得到布局位置信息" + JSON.stringify(data));
				initDraw()
			})
			.exec();
	}
	/**
	 * 绘制的方法
	 */
	const initDraw = () => {
		let ctx = uni.createCanvasContext('myCanvas')
		// 获取canvas的尺寸
		let width = canvasElement.value.width;
		let height = canvasElement.value.height
		let centerX = width / 2;
		let centerY = height / 2;
		ctxInfo.value = {
			centerX: centerX,
			centerY: centerY
		}
		// 移动画布的原点到中心点
		ctx.translate(centerX, centerY);

		drawNetwork(ctx)
		drawGateway(ctx)
		drawSwitch(ctx)
		drawDevice(ctx)
		// drawRect(ctx, 0, 0, 10, 10)
		// drawRect(ctx, 40, 50, 100, 80)
		// // 绘制线条
		// drawLine(ctx, 10, 10, 40, 50)
		// // 绘制文字
		// drawText(ctx, "文字内容", 70, 144)
		// // 绘制（网络）图片
		// drawImage(ctx, 'https://img0.baidu.com/it/u=4084417384,1180584271&fm=253&fmt=auto&app=138&f=JPEG?w=794&h=496',
		// 	30, 10)
		// drawImage(ctx, '../../static/logo.png', -120, -10, 60, 60); //绘制图

		// 绘制到画布
		ctx.draw()
	}

	/**
	 * 绘制线条
	 * (画布,起点x轴位置 , 起点y轴位置 , 终点x轴位置 , 终点y轴位置 )
	 * 注意： 画布坐标系是以左上角为原点，x轴向右，y轴向下
	 */
	const drawLine = (ctx, startX, startY, endX, endY) => {
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "#00aaff"; // 红色路径
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.stroke(); // 进行绘制
	}


	/**
	 * 绘制长方形
	 * (画布,x轴位置 , y轴位置 , 宽度 , 高度)
	 * 注意： 画布坐标系是以左上角为原点，x轴向右，y轴向下
	 */
	const drawRect = (ctx, x, y, width, height) => {
		ctx.setFillStyle('red')
		ctx.fillRect(x, y, width, height)
	}


	/**
	 * 绘制图片
	 * （画布,图片路径 , x轴位置 , y轴位置 , 宽度 , 高度）
	 */
	const drawImage = (ctx, imgPath, x, y, width = 50, height = 50) => {
		ctx.drawImage(imgPath, x, y, width, height)
	}


	/**
	 * 绘制文字
	 * (画布,文字内容 , x轴位置 , y轴位置 )
	 * 注意： 画布坐标系是以左上角为原点，x轴向右，y轴向下
	 */
	const drawText = (ctx, text, x, y, color = 'black', fontSize = 14) => {
		ctx.setFontSize(fontSize)
		ctx.setFillStyle(color)
		ctx.fillText(text, x, y)
	}


	/**
	 * 绘制入网网络的方法
	 */
	const drawNetwork = (ctx) => {
		drawImage(ctx, props.root[0].image, 0 - imageWidth / 2, -ctxInfo.value.centerY + imageHeight / 2, imageWidth,
			imageHeight);
	}

	/**
	 * 绘制网关
	 */
	const drawGateway = (ctx) => {
		drawImage(ctx, props.gateway[0].image, 0 - imageWidth / 2, -(ctxInfo.value.centerY / 2) + imageHeight / 2,
			imageWidth,
			imageHeight);
	}

	/**
	 * 绘制交换机
	 */
	const drawSwitch = (ctx) => {
		drawImage(ctx, props.switch[0].image, 0 - imageWidth / 2, 0 + imageHeight / 2, imageWidth,
			imageHeight);
	}

	/**
	 * 绘制设备
	 */

	const drawDevice = (ctx) => {
		// let total = props.devices.length
		let total = 1
		for (let i = 0; i < total; i++) {
			drawImage(ctx, props.devices[i].image, 0 - imageWidth / 2, ctxInfo.value.centerY - imageHeight * 2,
				imageWidth,
				imageHeight);
		}
	}
</script>
<style scoped>
	.canvas {
		width: 375px;
		height: 600px;
		border: 1px solid #000;
		margin: 0 auto;
	}
</style>