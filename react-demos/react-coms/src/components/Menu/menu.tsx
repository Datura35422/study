import React, { useState, createContext } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenMenus?: string[];
}

const MenuContext = createContext<IMenuContext>({ index: '0' });

const Menu: React.FC<MenuProps> = ({
  className,
  mode,
  style,
  children,
  defaultIndex,
  onSelect,
  defaultOpenMenus,
}) => {
  const [currentActive, setActive] = useState(defaultIndex || '0');
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });
  const handleClick = (index: string) => {
    setActive(index);
    onSelect?.(index);
  };
  const passedContext: IMenuContext = {
    index: currentActive,
    onSelect: handleClick,
    mode,
    defaultOpenMenus,
  };
  // 确保传入的 children 是符合规则的
  const renderChildren = () => {
    // React.Children.map 能够跳过不符合规则的 children 元素
    return React.Children.map(children, (child, index) => {
      // ts 有的时候推断不出来，需要手动进行类型断言
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // return child
        // 使用组件克隆自动传入 index
        return React.cloneElement(childElement, {
          index: String(index),
        });
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component'
        );
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenMenus: [],
};

export default Menu;
export { MenuContext };
