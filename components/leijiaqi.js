import React, {Component} from 'react';

class Counter extends Component{
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      count: 0
    };
  }

  handleClick (e) {
    e.preventDefault();
    
    this.setState({
      count: this.state.count+1
    });
  }

  render () {
    return (
      <div>
        <p>{this.state.count}</p>
        <a href='#' onClick={this.handleClick}>更新</a>
      </div>
    );
  }
}

// 注意setState是一个异步方法,一个生命周期内所有的setState方法会合并操作
// 当组件内部使用库内置的setState方法时,最大的表现行为就是该组件会尝试重新渲染
// 如果顶层组件初始化props,那么React会向下遍历整颗组件树,重新尝试渲染所有相关的子组件,而state只关心每个组件内改变.把组件看成一个函数,那么它接受了props作为参数,内部由state作为函数的内部参数,返回一个Virtual DOM的实现