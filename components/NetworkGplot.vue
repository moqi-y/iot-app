<template>
	<view>
		<canvas class="canvas" ref="canvasRef" canvas-id="myCanvas" id="myCanvasId" @tap="onTap"></canvas>
	</view>
</template>
<script setup>
	import {
		ref,
		onMounted,
		defineProps
	} from "vue";

	let imageWidth = 50
	let imageHeight = imageWidth
	let lineHeight = 40

	// 画布信息
	const ctxInfo = ref({})

	//设备位置信息
	const devicePositions = ref({})

	const emits = defineEmits(['handleClick'])

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
				image: "../../static/icon/wangluojiaohuanji.svg"
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
		drawBridges(ctx)
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
		ctx.lineWidth = "3";
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
		drawText(ctx, props.root[0].name, 0 - imageWidth / 2, -ctxInfo.value.centerY + imageHeight + lineHeight)
		let total = props.root.length
		for (let i = 0; i < total; i++) {
			// 保存设备的位置信息
			devicePositions.value[props.root[i].id] = {
				x: 0 - imageWidth / 2,
				y: -ctxInfo.value.centerY + imageHeight / 2,
				width: imageWidth,
				height: imageHeight
			};
		}
	}

	/**
	 * 绘制网关
	 */
	const drawGateway = (ctx) => {
		drawImage(ctx, props.gateway[0].image, 0 - imageWidth / 2, -(ctxInfo.value.centerY / 2) + imageHeight / 2,
			imageWidth,
			imageHeight);
		drawText(ctx, props.gateway[0].name, 0 - imageWidth / 2, -(ctxInfo.value.centerY / 2) + imageHeight +
			lineHeight)
		let total = props.gateway.length
		for (let i = 0; i < total; i++) {
			// 保存设备的位置信息
			devicePositions.value[props.gateway[i].id] = {
				x: 0 - imageWidth / 2,
				y: -(ctxInfo.value.centerY / 2) + imageHeight / 2,
				width: imageWidth,
				height: imageHeight
			};
		}
	}

	/**
	 * 绘制交换机
	 */
	const drawSwitch = (ctx) => {
		drawImage(ctx, props.switch[0].image, 0 - imageWidth / 2, 0 + imageHeight / 2, imageWidth,
			imageHeight);
		drawText(ctx, props.switch[0].name, 0 - imageWidth / 2, imageHeight + lineHeight)
		let total = props.switch.length
		for (let i = 0; i < total; i++) {
			// 保存设备的位置信息
			devicePositions.value[props.switch[i].id] = {
				x: 0 - imageWidth / 2,
				y: 0 + imageHeight / 2,
				width: imageWidth,
				height: imageHeight
			};
		}
	}


	/**
	 * 绘制设备
	 */
	const drawDevice = (ctx) => {
		let total = props.devices.length
		for (let i = 0; i < total; i++) {
			// 计算设备的位置
			let deviceX = computeOffsets(total)[i] - imageWidth / 2;
			let deviceY = ctxInfo.value.centerY - imageHeight * 2;

			// 保存设备的位置信息
			devicePositions.value[props.devices[i].id] = {
				x: deviceX,
				y: deviceY,
				width: imageWidth,
				height: imageHeight
			};
			drawImage(ctx, props.devices[i].image, computeOffsets(total)[i] - imageWidth / 2, ctxInfo.value.centerY -
				imageHeight * 2,
				imageWidth,
				imageHeight);
			drawText(ctx, props.devices[i].name, computeOffsets(total)[i] - imageWidth / 2, ctxInfo.value.centerY -
				lineHeight + 5)
		}
	}

	/**
	 * 计算设备绘制偏移量
	 * num {number} 设备数量 
	 */
	const computeOffsets = (num) => {
		// 假设每个设备之间的间隔是60个单位
		const distanceBetweenPoints = 60;
		// 创建一个空数组来存储偏移量
		let offsets = [];
		// 计算每个设备的偏移量并添加到数组中
		for (let i = 0; i < num; i++) {
			// 计算偏移量
			let offset = -((num - 1) / 2) * distanceBetweenPoints + i * distanceBetweenPoints;
			// 将偏移量添加到数组中
			offsets.push(offset);
		}
		// 数组从小到大排列输出
		return offsets;
	};


	/**
	 * 绘制连线
	 */
	const drawBridges = (ctx) => {
		let startX = 0
		drawLine(ctx, startX, -ctxInfo.value.centerY + imageHeight + lineHeight,
			startX, -(ctxInfo.value.centerY / 2) + imageHeight)
		drawLine(ctx, startX, -(ctxInfo.value.centerY / 2) + imageHeight + lineHeight,
			startX, imageHeight)
		for (var i = 0; i < props.devices.length; i++) {
			drawLine(ctx, startX, imageHeight + lineHeight,
				computeOffsets(props.devices.length)[i], ctxInfo.value.centerY - imageHeight * 2)
		}
	}

	/**
	 * 点击事件
	 */
	const onTap = (e) => {
		// 获取点击事件的坐标
		const touchX = e.detail.x - ctxInfo.value.centerX;
		const touchY = e.detail.y - ctxInfo.value.centerY;
		// 遍历设备位置信息，检查点击坐标是否在某个设备的边界内
		for (const id in devicePositions.value) {
			const position = devicePositions.value[id];
			if (touchX >= position.x && touchX <= position.x + position.width &&
				touchY >= position.y && touchY <= position.y + position.height) {
				// 如果点击在设备的边界内，返回对应的id和typeId
				// const typeId = props.devices.find(device => device.id === parseInt(id)).typeId;
				const typeId = switchType(id).typeId;
				console.log(`点击的设备信息：id: ${id}, typeId: ${typeId}`);
				// 这里可以添加其他逻辑，比如调用一个方法来处理点击事件
				handleDeviceClick(switchType(id));
				break; // 点击到一个设备后退出循环
			}
		}
	};

	// 处理点击事件的函数
	const handleDeviceClick = (obj) => {
		emits('handleClick', obj);
	};

	// 通用查找函数
	const findItemById = (array, id) => {
		return array.find(item => item.id == id) || {};
	};

	// 包含所有需要搜索的属性的数组
	const searchProps = [props.root, props.gateway, props.switch, props.devices];

	// 优化后的 switchType 函数
	const switchType = (id) => {
		// 遍历 searchProps 数组，使用 findItemById 函数查找 id
		for (const prop of searchProps) {
			const item = findItemById(prop, id);
			if (Object.keys(item).length > 0) { // 如果找到非空对象，则返回
				return item;
			}
		}
		// 如果所有数组中都没有找到，则返回空对象
		return {};
	};
</script>
<style scoped>
	.canvas {
		width: 100%;
		height: 100%;
		border: 1px solid #000;
		margin: 0 auto;
	}
</style>