// Tabs 两个可能的内部状态 activeIndex和 prevIndex分别表示当前选中tab的索引和前一次选中的索引
// activeIndex 在内部更新 当我们切换tab标签时, 组件内部的交互行为,被选择后通过回调函数返回具体选择的索引
// activeIndex 在外部更新 当我们切换tab标签时, 组件外部在传入具体的索引

// constructor(props) {
//   super(props);

//   const currProps = this.props;
//   let activeIndex = 0

//   if ('activeIndex' in currProps) {
//     activeIndex = currProps.astiveIndex
//   }else if ('defauleActiveIndex' in currProps) {
//     activeIndex = currProps.defaultActiveIndex
//   }

//   this.state = {
//     activeIndex,
//     prevIndex: activeIndex
//   }
// }
import React,{Component,PropTypes,cloneElement} from 'react'
import classnmes from 'classnames'
import style from './tabs.scss'

class Tabs extends Component{
  static PropTypes = {
    // 在主节点上增加可选class
    classNames: PropTypes.string,
    // class 前缀
    classPrefix: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node),PropTypes.node]),
    // 默认激活索引, 组件内更新
    defaultActiveIndex: PropTypes.number,
    // 默认激活索引, 组件外更新
    activeIndex: PropTypes.number,
    // 切换时回调函数
    onChange: PropTypes.func

  };
  static defaultProps = {
    classPrefix: 'tabs',
    onChange: () => {}
  };
  constructor(props) {
    super(props);

    // 对事件方法的绑定
    this.handleTabClick = this.handleTabClick.bind(this);
    
    const currProps = this.props;
    let activeIndex;
    // 初始化 activeIndex state
    if('activeIndex' in currProps) {
      activeIndex = currProps.activeIndex;
    }else if ('defaultActiveIndex' in currProps) {
      activeIndex = currProps.defaultActiveIndex;
    }
    this.state = {
      activeIndex,
      prevIndex: activeIndex
    };
  }
  componentWillReceiveProps(nextProps) {
    // 如果props传入activeIndex,则直接更新
    if('activeIndex' in nextProps) {
      this.setState({activeIndex: nextProps.activeIndex});
    }
  }
  handleTabClick(activeIndex) {
    const prevIndex = this.state.activeIndex;
    // 如果当前activeIndex与传入的activeIndex不一致,并且props中存在defaultActiveIndex 时, 则更新
    if(this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props) {
      this.setState({
        activeIndex,
        prevIndex
      });
      // 更新后执行回调函数, 抛出当前索引和上一次索引
      this.props.onChange({activeIndex,prevIndex});
    }
  }
  renderTabNav() {
    const {classPrefix, children} = this.props;
    return(<TabNav key='tabBar' classPrefix={classPrefix} onTabClick={this.handleTabClick} pnels={children} activeIndex={this.state.activeIndex} />);
  }
  renderTabContent() {
    const {classPrefix,children} = this.props;

    return(<TabContent key='tabcontent' classPrefix={classPrefix} panels={children} activeIndex={this.state.activeIndex} />);
  }
  render() {
    const {className} = this.props;
    // classnames 用于合并class
    const classes =classnames(className,'ui-tabs');

    return(<div className={classes}>{this.renderTabNav()}{this.renderTabContent()}</div>);
  }
}

class TabNav extends Component {
  static PropTypes= {
    classPrefix: React.PropTypes.string,
    panels: PropTypes.node,
    activeIndex:PropTypes.number
  };

  getTabs() {
    const {panels, classPrefix,activeIndex}= this.props;

    return React.Children.map(panels,(child)=> {
      if(!child) {
        return;
      }
      const order = parseInt(child.props.order, 10);
      // 利用class控制显示和隐藏
      let classes = classnames({
        [`${classPrefix}-tab`]: true,
        [`${classPrefix}-active`]: activeIndex===order,
        [`${classPrefix}-disabled`]:child.props.disabled
      });
      let events = {};
      if (!child.props.disabled) {
        events = {
          onClick:this.props.onTabClick.bind(this,order),
        };
      }
      const ref = {};
      if (activeIndex === order) {
        ref.ref= 'activeTab';
      }
      return (<li role='tab' aria-disabled={child.props.disabled?'true':'false'} aria-selected={activeIndex=== order?'true':'false'} {...events} className={classes} key={order} {...ref}>{child.props.tab}</li>);
    });
  }
  render() {
    const {classPrefix} = this.props;

    const rootClasses= classnames({[`${classPrefix}-bar`]:true});

    const classes = classnames({[`${classPrefix}-nav`]:true});

    return(<div className={rootClasses} role='tablist'>
    <ul className={classes}>{this.getTabs()}</ul>
    </div>);
  }
}

class TabContent extends Component {
  static PropTypes={
    classPrefix:React.PropTypes.string,
    panels:PropTypes.node,
    activeIndex:PropTypes.number
  };
  getTabPanes() {
    const {classPrefix, activeIndex, panels}= this.props;
    return React.Children.map(panels,(child)=> {
      if(!child) {return;}
      const order = parseInt(child.props.order,10);
      const isActive = activeIndex === order;
      return React.cloneElement(child,{
        classPrefix,
        isActive,
        children:child.props.children,
        key:`tabpane-${order}`
      })
    })
  }
  render() {
    const {classPrefix} = this.props;
    const classes = classnames({[`${classPrefix}-content`]:true});

    return(
      <div className={classes}>
      {this.getTabPanes()}</div>
    )
  }
}

class TabPane extends Component {
  static PropTypes= {
    tab:PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    order:PropTypes.string.isRequired,
    disabled:PropTypes.bool,
    isActive:PropTypes.bool
  };
  render() {
    const {classPrefix, className,isActive,children} = this.props;

    const classes = classnames({
      [className]:className,
      [`${classPrefix}-panel`]: true,
      [`${classPrefix}-active`]: isActive
    });
    return(
      <div role='tabpanel' className= {classes} aria-hidden={!isActive}>{children}</div>
    );
  }
}
