/*
	
	适配器模式

	该模式主要用来解决两个已有接口之间不匹配的问题
	装饰者模式和代理模式也不会改变原有对象接口, 但装饰者模式作用是为了给对象新增功能(AOP形成装饰链), 代理模式为了控制对象的访问同该模式一样通常只包装一次
	
*/

// 假设地图类都以实现show方法来渲染, 第三方为dispaly方法来渲染
// 通常情况都不应该去修改本身对象方法,通过增加baiduMapAdapter来解决问题

var googleMap = {
	show() {
		console.log('渲染谷歌地图')
	}
}

var baiduMapAdapter = {
	show() {
		return baiduMap.dispaly()
	}
}

