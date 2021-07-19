import React from 'react'
import { Redirect } from 'react-router-dom'

import RMRecommend from '@/pages/discover/children/recommend'
import RMRanking from '@/pages/discover/children/ranking'
import RMSongs from '@/pages/discover/children/songs'
import RMDjradio from '@/pages/discover/children/djradio'
import RMArtist from '@/pages/discover/children/artist'
import RMPlayer from '@/pages/player'

const base = '/discover'

const routes = [
  {
    path: `${base}`,
    exact: true,
    render: () => (
        <Redirect to={`${base}/recommend`} />
    ),
  },
  {
    path: `${base}/recommend`,
    component: RMRecommend,
  },
  {
    path: `${base}/ranking`,
    component: RMRanking,
  },
  {
    path: `${base}/songs`,
    component: RMSongs,
  },
  {
    path: `${base}/djradio`,
    component: RMDjradio,
  },
  {
    path: `${base}/artist`,
    component: RMArtist,
  },
  {
    path: `${base}/song`,
    component: RMPlayer,
  },
]

export default routes
