import React from 'react'
import ClassComponent from './components/ClassComponent'
import FunctionalComponent from './components/FunctionalComponent'
import ComponentLifecycle from './components/ComponentLifecycle'
import ParentCommunication from './components/ParentCommunication'
import EventCommunication from './components/EventCommunication'
import SlotComponent from './components/SlotComponent'
import {
  BrotherCommunication,
  BrotherCommunication2,
 } from './components/BrotherCommunication'
import State from './components/State'
import OperateDOM from './components/OperateDOM'
import Form from './components/Form'
import UseHOC from './components/UseHOC'
import UsePortals from './components/UsePortals'
import UseStyle from './components/useStyle'
import UseStyled from './components/useStyled'
import UseClassname from './components/UseClassname'
import UseTransition from './components/transition/UseTransition'
// import Home from './components/useRedux/Home'
// import About from './components/useRedux/About'
import UseConnect from './components/useConnect'
import UseRouter from './components/useRouter'
import UseHook from './components/useHook'

function App() {
  return (
    <div className="App">
      <ClassComponent></ClassComponent>
      <FunctionalComponent></FunctionalComponent>
      <hr />
      <h2>生命周期</h2>
      <ComponentLifecycle></ComponentLifecycle>
      <hr />
      <h2>组件间的传值</h2>
      <ParentCommunication></ParentCommunication>
      <hr />
      <h2>组件间的事件调用</h2>
      <EventCommunication></EventCommunication>
      <hr />
      <h2>类slot组件实现</h2>
      <SlotComponent></SlotComponent>
      <hr />
      <h2>兄弟组件、祖孙组件通讯</h2>
      <BrotherCommunication></BrotherCommunication>
      <BrotherCommunication2></BrotherCommunication2>
      <hr />
      <h2> setState相关操作 </h2>
      <State></State>
      <hr />
      <h2>ref dom</h2>
      <OperateDOM></OperateDOM>
      <hr />
      <h2>表单可控组件</h2>
      <Form></Form>
      <hr />
      <h2>高阶组件</h2>
      <UseHOC name="app"></UseHOC>
      <hr />
      <h2>portals</h2>
      <UsePortals></UsePortals>
      <hr />
      <h2>样式</h2>
      <UseStyle></UseStyle>
      <hr />
      <h2>样式style in js</h2>
      <UseStyled></UseStyled>
      <hr />
      <h2>使用第三方库 classnames</h2>
      <UseClassname></UseClassname>
      <hr />
      <h2>使用第三方库 react-transition-group</h2>
      <UseTransition></UseTransition>
      <hr />
      {/* <h2>使用 redux</h2>
      <Home></Home>
      <About></About> */}
      <h2>使用 redux 优化</h2>
      <UseConnect></UseConnect>
      <hr />
      <h2>使用 router</h2>
      <UseRouter></UseRouter>
      <hr />
      <h2>使用 Hook</h2>
      <UseHook></UseHook>
    </div>
  );
}

export default App;
