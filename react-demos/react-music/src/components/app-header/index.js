import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

export default memo(function RMAppHeader() {
  return (
    <div>
      <NavLink exact to='/'>发现</NavLink>
      <NavLink to='/mine'>我的</NavLink>
      <NavLink to='/friends'>朋友</NavLink>
    </div>
  )
})
