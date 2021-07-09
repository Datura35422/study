import React, { memo } from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import routes  from '@/router'

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
