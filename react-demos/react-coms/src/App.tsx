import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

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
        <Menu onSelect={(index) => { alert(index) }}>
          <MenuItem index={1}>menu 1</MenuItem>
          <MenuItem index={2}>menu 2</MenuItem>
          <MenuItem index={3}>menu 3</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default App;
