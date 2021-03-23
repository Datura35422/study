function getComponent(){
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(() => {
    var element = document.createElementNS('div');
    element.innerHTML = _.join(['a', 'b'], '-')
    return element
  })
}

document.addEventListener('click', () => {
  getComponent().then(element => {
    document.body.appendChild(element)
  })
})