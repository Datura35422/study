import React from 'react'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'

import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  className: 'test',
  onSelect: jest.fn(),
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult, 
  menuElement: HTMLElement, 
  activeElement: HTMLElement, 
  disableElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
  // 通用函数 在每个用例之前都会跑一遍 beforeEach
  beforeEach(() => {
    // 使用 data-testid 模拟用户操作习惯
    wrapper = render(generateMenu(testProps))
    // 加载特殊的 css 样式
    wrapper.container.append(createStyleFile())

    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disableElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    // getElementsByTagName 不分层次 会把子元素也会一起抓取
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    // 使用 :scope 伪类进行限制
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disableElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disableElement)
    expect(disableElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should render vertical mode when mode is set to vertical', () => {
    // 避免多次渲染，找到多个 test dom 元素 每个 case 结束会自动调用 cleanup
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when hover on subMenu', async () => {
    // queryByText 可以返回 null
    // 在 水平模式下，没有进行 hover 操作的时候，subMenu 是没有进行展开的
    // 在没有设置 css 样式的时候测试用例不通过，原因是 代码中使用的 css display 进行控制的显隐，所以要在测试用例中设置 css
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    // 有异步操作 需要等待异步结束后检查效果
    await waitFor(() => expect(wrapper.queryByText('drop1')).toBeVisible(), { timeout: 300})
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => expect(wrapper.queryByText('drop1')).not.toBeVisible(), { timeout: 300})
  })
})

// subMenu 缺少 vertical 测试用例，horizontal 和 vertical 的模式下不同，vertical 模式下需要点击才显示子菜单
