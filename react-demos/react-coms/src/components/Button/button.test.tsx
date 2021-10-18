import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button'

// 简单测试
// test('text test', () => {
//   const wrapper = render(<Button>nice</Button>)
//   const element = wrapper.queryByText('nice')
//   expect(element).toBeTruthy()
// })

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass'
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>nice</Button>)
    const element = wrapper.getByText('nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    // 测试点击事件
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>test</Button>)
    const element = wrapper.getByText('test')
    expect(element).toBeInTheDocument()
    // 测试是否有对应的className
    expect(element).toHaveClass('btn klass btn-primary btn-large')
  })
  it('should render a link when btnType equals link and hred is provided', () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href="https://www.baidu.com">Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
  })
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button disabled={true} onClick={ () => jest.fn() }>Disabled</Button>)
    const element = wrapper.getByText('Disabled') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    // 测试点击事件 无法触发
    fireEvent.click(element)
    expect(defaultProps.onClick).not.toHaveBeenCalled()

  })
})

