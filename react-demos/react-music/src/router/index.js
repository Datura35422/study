import RMDiscover from '@/pages/discover'
import RMMine from '@/pages/mine'
import RMFriends from '@/pages/friends'

const routes = [
  {
    path: '/',
    exact: true,
    component: RMDiscover,
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