const { isEqual, isObject, isArray } = require('lodash');

function isDataEffectiveEqual(originData, newData) {
  return isEqual(originData, newData) || isInvalidOrEmpty(originData) === isInvalidOrEmpty(newData);
}

function isInvalidOrEmpty(data) {
  // 空数组、空对象 
  if ((isObject(data) || isArray(data)) && !Object.keys(data).length) {
    return true;
  }
  // null、''、0、undefined
  return !data;
}

module.exports = isDataEqual;
