import React from 'react'
import { Redirect } from 'react-router-dom'

import RMDiscover from '@/pages/discover'
import RMMine from '@/pages/mine'
import RMFriends from '@/pages/friends'

import discoverChildren from './children/discover'

const routes = [
  {
    path: '/',
    exact: true,
    render: () => (
      <Redirect to='/discover' />
    )
  },
  {
    path: '/discover',
    component: RMDiscover,
    routes: discoverChildren,
  },
  {
    path: '/mine',
    component: RMMine,
  },
  {
    path: '/friends',
    component: RMFriends,
  },
]


export default routes