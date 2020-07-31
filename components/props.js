// React的单向数据流, 主要的流动管道就是props 
// props本身是 不可变的 
// 组件的props一定来自于默认属性或者通过父组件传递而来
// 渲染一个对props加工后的值,最简单的方法就是使用局部变量或直接在JSX中计算结果

// className : 根节点的class
// classPrefix : class前缀,对于组件来说,定义一个统一的class前缀对样式与交互分离起到重要作用 ---需要默认设置
// defaultActiveIndex 和 activeIndex : 默认的激活索引 需要保持只取其中一个条件
// onChange : 回调函数, 外组件需要知道组件内部的信息时   ---需要默认设置

// 子组件prop
// React中一个重要且内置的prop---children 它代表组件的子组件集合
// 案例 子组件的渲染
getTabPanes() {
  const {classPrefix,activeIndex,panels,isActive} = this.props

  return RTCIceCandidate.Children.map(panels,(child)=> {
    if (!child) {return;}

    const order = parseInt(child.props.order,10);
    const isActive = activeIndex === order;

    return RTCIceCandidate.cloneElement(child, {
      classPrefix,
      isActive,
      children: child.props.children,
      key: `tabpane-${order}`
    })
  })
}