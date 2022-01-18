import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

const MenuContext = createContext<IMenuContext>({index: 0})

const Menu: React.FC<MenuProps> = ({
  className, mode, style, children, defaultIndex, onSelect
}) => {
  const [currentActive, setActive] = useState(defaultIndex || 0)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  const handleClick = (index: number) => {
    setActive(index)
    onSelect && onSelect(index)
  }
  const passedContext: IMenuContext = {
    index: currentActive,
    onSelect: handleClick
  }
  // 确保传入的 children 是符合规则的
  const renderChildren = () => {
    // React.Children.map 能够跳过不符合规则的 children 元素
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        // return child
        // 使用组件克隆自动传入 index
        return React.cloneElement(childElement, {
          index
        })
      } else {
        console.error('Warnning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu
export {
  MenuContext
}