//防抖函数
export function debounce(fn, delay){
  let timer = null;
  return function(...args) {
    console.log(122);
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
            fn.apply(this, args);
          }, delay);
  }
}

//日期格式化
export function dateFormat(fmt, date) {
	let ret;
	const opt = {
			"Y+": date.getFullYear().toString(),        // 年
			"m+": (date.getMonth() + 1).toString(),     // 月
			"d+": date.getDate().toString(),            // 日
			"H+": date.getHours().toString(),           // 时
			"M+": date.getMinutes().toString(),         // 分
			"S+": date.getSeconds().toString()          // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
					fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
				};
	};
	return fmt;
}

//深拷贝
export function deepClone(origin, target) {
	var target = target || {},
		toStr = Object.prototype.toString, //
		arrType = '[object Array]'; //缓存一个数组类型，用作判断类型
	for (var key in origin) {
		if (origin.hasOwnProperty(key)) { //去除自定义原型里面的属性		//null -> object	
			if (typeof(origin[key]) === 'object' && origin[key] !== null) { //判断属性类型是否为引用类型
				toStr.call(origin[key]) === arrType ? target[key] = [] :
					target[key] = {};
				deepClone(origin[key], target[key]); //递归 拷贝下一层
			} else {
				target[key] = origin[key]; //将原始值拷贝到新对象
			}
		}
	}
	return target;
}