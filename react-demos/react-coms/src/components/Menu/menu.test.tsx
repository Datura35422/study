import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'

import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  className: 'test',
  onSelect: jest.fn(),
}

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>
        active
      </MenuItem>
      <MenuItem disabled index={1}>
        disabled
      </MenuItem>
      <MenuItem index={2}>
        xyz
      </MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult, 
  menuElement: HTMLElement, 
  activeElement: HTMLElement, 
  disableElement: HTMLElement;

describe('test Menu and MenuItem component', () => {
  // 通用函数 在每个用例之前都会跑一遍 beforeEach
  beforeEach(() => {
    // 使用data-testid 模拟用户操作习惯
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disableElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disableElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disableElement)
    expect(disableElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it('should render vertical mode when mode is set to vertical', () => {
    // 避免多次渲染，找到多个 test dom 元素 每个case结束会自动调用 cleanup
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})