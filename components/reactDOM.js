// findDOMNode  返回该React组件实例相应的DOM节点, 它可以用于获取表单的value以及用于DOM的测量 
//              可以在当前组件加载完时获取当前的DOM 只对已经挂载的组件有效
// unmountComponentAtNode 卸载
// render  该方法把元素挂载到container中 并且返回element的实例(即refs引用) 无状态组件返回null

// refs
// 可以附加到任何一个组件上
// 组件被调用时会新建一个该组件的实例 而refs就会指向这个实例
// 可以是一个回调函数 该函数会在组件被挂载后立即执行
// 同样支持字符串
// 无法用于无状态组件中


// 要调用H5 Audio /Video 的play方法和input的focus方法 只能用DOM方法实现
// 当点击组件其他区域时可以收缩此类组件时 需要 自行绑定事件