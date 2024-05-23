<template>
	<view>
		<canvas class="canvas" ref="canvasRef"  canvas-id="myCanvas"></canvas>
	</view>
</template>
<script setup>
	import { start } from "repl";
import {
		ref,
		onMounted
	} from "vue";

	const canvasRef =ref(null)
	
	onMounted(() => {
		draw()
	})

	/**
	 * 绘制的方法
	 */
	const draw = () => {
		let ctx = uni.createCanvasContext('myCanvas')
		// 获取canvas的尺寸
		let width = canvasRef.value.$el.offsetWidth;
		let height = canvasRef.value.$el.offsetHeight;
		// 计算中心点坐标
		let centerX = width / 2;
		let centerY = height / 2;
		// 移动画布的原点到中心点
		ctx.translate(centerX, centerY);
		
		ctx.setFillStyle('red')
		ctx.fillRect(0, 0, 10, 10)
		
		ctx.setFillStyle('red')
		ctx.fillRect(100, 80, 40, 50)
		
		ctx.beginPath();
		ctx.lineWidth="2";
		ctx.strokeStyle="blue"; // 红色路径
		ctx.moveTo(10,10);
		ctx.lineTo(100,80);
		ctx.stroke(); // 进行绘制
		
		ctx.beginPath();
		ctx.lineWidth="2";
		ctx.strokeStyle="blue"; // 红色路径
		ctx.moveTo(100,100);
		ctx.lineTo(10,8);
		ctx.stroke(); // 进行绘制
		
		
		ctx.draw()
		
	}
	
	/**
	 * 绘制线条
	 */
	// const drawLine
</script>
<style scoped>
	.canvas {
		width: 350px;
		height: 400px;
		border: 1px solid #000;
		margin: 0 auto;
	}
</style>