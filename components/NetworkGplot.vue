<template>
	<view>
		<canvas class="canvas" ref="canvasRef" canvas-id="myCanvas" id="myCanvasId"></canvas>
	</view>
</template>
<script setup>
import {
	ref,
	onMounted
} from "vue";

// const canvasRef = ref(null)
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
	// 移动画布的原点到中心点
	ctx.translate(centerX, centerY);

	drawRect(ctx, 0, 0, 10, 10)
	drawRect(ctx, 40, 50, 100, 80)



	// 绘制线条
	drawLine(ctx, 10, 10, 40, 50)




	// 绘制到画布
	ctx.draw()
}

/**
 * 绘制线条
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
 */
const drawRect = (ctx, x, y, width, height) => {
	ctx.setFillStyle('red')
	ctx.fillRect(x, y, width, height)
}


/**
 * 绘制图片到画布
 */
const drawImage = (ctx, imgPath) => {
	uni.getImageInfo({
		src: imgPath,
		success: function(res) {
			console.log(res.path)
			ctx.drawImage(res.path, 0, 0, 100, 100)
			ctx.draw()
		}
	})
}

/**
 * 绘制文字
 */
const drawText = (ctx, text, x, y) => {
	ctx.setFontSize(16)
	ctx.setFillStyle('#000000')
	ctx.fillText(text, x, y)
	ctx.draw()
}



</script>
<style scoped>
.canvas {
	width: 350px;
	height: 400px;
	border: 1px solid #000;
	margin: 0 auto;
}
</style>