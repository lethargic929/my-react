// 生命周期
// 组件的挂载
// componentWillMount 一定会在render前先执行,但不一定先执行完,比如里面有定时器就结果不一样了
// render
// componentDidMount 这里可以获取真正的DOM元素

// 组件的卸载
// componentWillUnmount 通常是清除定时器 事件回收等

// 数据更新过程
// shouldComponentUpdate 若返回false时, 组件不再向下执行生命周期方法
// componentWillUpdate  注意点 不能在这里执行setState
// render
// componentDidUpdate 这里可以获取真正的DOM元素


// 无状态组件是没有生命周期方法的, 意味着没有shouldComponentUpdate
// 无状态组件挂载时只是方法调用 没有新建实例