import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

// 简单测试
// test('text test', () => {
//   const wrapper = render(<Button>nice</Button>)
//   const element = wrapper.queryByText('nice')
//   expect(element).toBeTruthy()
// })

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button>nice</Button>)
    const element = wrapper.getByText('nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
  })
  it('should render the correct component based on different props', () => {

  })
  it('should render a link when btnType equals link and hred is provided', () => {

  })
  it('should render disabled button when disabled set to true', () => {

  })
})

