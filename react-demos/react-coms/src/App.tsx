import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

function App() {
  return (
    <div className="App">
      <div>
        <h2> BUTTON </h2>
        <Button>Default</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>Dangerous</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>Primary</Button>
        <Button btnType={ButtonType.Link} href="www.baidu.com">Link</Button>
      </div>
      <hr />
      <div>
        <Menu defaultIndex='0' onSelect={(index) => { alert(index) }} mode="vertical" defaultOpenMenus={['3']}>
          <MenuItem>menu 1</MenuItem>
          <MenuItem>menu 2</MenuItem>
          <MenuItem>menu 3</MenuItem>
          <SubMenu title="SubMenu">
            <MenuItem>dropdown 1</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
}

export default App;
