import _ from 'lodash';
import { join as _join } from 'lodash'
import printMe from './print.js';

  function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    // lodash 是由当前 script 脚本 import 导入进来的
    element.innerHTML = _join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updates printMe module!');
      printMe()
    })
  }