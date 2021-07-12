import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import {
  headerLinks
} from '@/common/local-data'

import { 
  Dropdown, 
  Input, 
  Menu,
} from 'antd'
import { 
  DownOutlined,
  SearchOutlined, 
} from '@ant-design/icons'
import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight,
} from './style'

export default memo(function RMAppHeader() {

  const showSelectItem = (item, index) => {
    return item.link.includes('http') ? 
      (
        <a 
          key={ index } 
          href={ item.link } 
          className='header-item'
        >
          { item.title }
        </a>
      ) : (
        <NavLink
          key={ index }
          to={ item.link }
          className='header-item'
          activeClassName='link-active'
        >
          { item.title }
          <i className='icon'></i>
        </NavLink>
      )
  }

  return (
    <HeaderWrapper>
      <div className='content w1100'>
        <HeaderLeft>
          <h1>
            <a href='#/' className='logo sprite_01'>
              网易云音乐
            </a>
          </h1>
          <div className='header-group'>
            {
              headerLinks.map((item, index) => showSelectItem(item, index))
            }
          </div>
        </HeaderLeft>
        <HeaderRight>
          <div className='search-wrapper'>
            <Input
              // ref={inputRef}
              className='search'
              placeholder='音乐/歌手'
              size='large'
              prefix={ <SearchOutlined /> }
              // onChange={(e) => setIsRedirect(false) || setValue(e.target.value)}
              // onInput={({ target }) => changeInput(target)}
              // onFocus={handleFocus}
              // onPressEnter={(e) => handleEnter(e)}
              // value={value}
              // onKeyDown={watchKeyboard}
              // suffix={icons}
            />
            {/* {isRedirect && (
              <Redirect
                to={{
                  pathname: '/search/single',
                  search: `?song=${value}&type=1`,
                }}
              />
            )}
            <div
              className='down-slider'
              style={{ display: focusState ? 'block' : 'none' }}
            >
              <div className='search-header'>
                <span className='discover'>搜'歌曲'相关用户&gt;</span>
              </div>

              <div className='content'>
                <div className='zuo'>
                  <span className='song'>单曲</span>
                </div>

                <span className='main'>
                  {searchSongList &&
                    searchSongList.map((item, index) => {
                      return (
                        <div
                          className={
                            'item ' + (recordActive === index ? 'active' : '')
                          }
                          key={item.id}
                          onClick={() => changeCurrentSong(item.id, item)}
                        >
                          <span>{item.name}</span>-{item.artists[0].name}
                        </div>
                      );
                    })}
                </span>
              </div>
            </div> */}
          </div>
          <button className='center'>创作者中心</button>
          {/* <Dropdown overlay={profileDwonMenu}>
            <div
              className='login'
              onClick={() => !isLogin && dispatch(changeIsVisible(true))}
            >
              <a
                href='https://juejin.cn/user/606586151899166'
                className='ant-dropdown-link'
                onClick={(e) => e.preventDefault()}
              >
                {isLogin ? showProfileContent() : '登录'} <DownOutlined />
              </a>
            </div>
          </Dropdown> */}
        </HeaderRight>
      </div>
    </HeaderWrapper>
  )
})
