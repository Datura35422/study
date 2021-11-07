import React, { useState, createContext } from 'react'
import classNames from 'classnames'

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
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {children}
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