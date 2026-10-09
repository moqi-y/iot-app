<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*
	 * 字体策略：使用系统字体栈，不再内置 PingFang SC 字体文件。
	 *
	 * 原因：
	 * 1. 原 PingFang SC Thin.otf 约 10.9MB，会显著增大安装包与首屏加载体积；
	 * 2. PingFang SC 属于 Apple 商用字体，随应用分发存在授权风险；
	 * 3. 系统中文字体栈已能覆盖主流平台，无需重复下载。
	 *
	 * 如需统一字形，建议后续改用开源字体（如思源黑体 / HarmonyOS Sans）并做按需子集化。
	 */
	page,
	view,
	text,
	input,
	button,
	textarea,
	scroll-view {
		font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC',
			'Hiragino Sans GB', 'Microsoft YaHei', 'Source Han Sans CN', 'Noto Sans CJK SC',
			'Helvetica Neue', Helvetica, Arial, sans-serif;
	}
</style>