import React, { memo } from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
// import 'antd/dist/antd.css' // 在此处导入容易覆盖掉原来的reset css设置 所以在css中进行导入

import routes from '@/router'

import RMAppHeader from '@/components/app-header'
import RMAppFooter from '@/components/app-footer'

export default memo(function App() {
  return (
    <HashRouter>
      <RMAppHeader />
      { renderRoutes(routes) }
      <RMAppFooter />
    </HashRouter>
  )
})
