const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const ALL_MOKA_FE_FILE = './data/MOKAFE.txt';
const NOVEMBER = './data/November.txt';
const OCTOBER = './data/October.txt';

async function handleReadFile(filePath) {
  let filehandle = null;
  try {
    // 需要使用绝对路径
    filehandle = await fsPromises.open(filePath);
    const data = await filehandle.readFile('utf8');
    return data;
  } catch (e) {
    console.log('readFile Error: ', e);
  } finally {
    await filehandle?.close();
  }
}

function getFilePath(filePath) {
  return path.resolve(__dirname, filePath);
}

function formatPeopleFullName(peopleList, allPeopleList) {
  const newPeopleList = [];
  allPeopleList.forEach((fullName) => {
    const filterResult = peopleList.find((peopleName) =>
      fullName.includes(peopleName)
    );
    if (filterResult) {
      newPeopleList.push(fullName);
    }
  });
  return newPeopleList;
}

function convertPeopleList(allPeople, monthPeople) {
  const allPeopleList = (allPeople || '').split(';');
  const monthPeopleList = (monthPeople || '').split(/\s/);
  return formatPeopleFullName(
    monthPeopleList.filter(
      (peopleName) => peopleName && allPeople.includes(peopleName)
    ),
    allPeopleList
  );
}

Promise.all([
  handleReadFile(getFilePath(ALL_MOKA_FE_FILE)),
  handleReadFile(getFilePath(OCTOBER)),
  handleReadFile(getFilePath(NOVEMBER)),
]).then((res) => {
  const [allPeople, octoberPeople, novemberPeople] = res;
  if (allPeople) {
    const octoberPeopleList = convertPeopleList(allPeople, octoberPeople);
    console.log('十月未写博客名单：', octoberPeopleList);
    console.log('十月未写博客总人数：', octoberPeopleList.length);
    const novemberPeopleList = convertPeopleList(allPeople, novemberPeople);
    console.log('十一月未写博客名单：', novemberPeopleList);
    console.log('十一月未写博客总人数：', novemberPeopleList.length);
  }
});
