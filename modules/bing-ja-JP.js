const bing = require('./bing')
const schedule = require('node-schedule')
let fetchNewData = schedule.scheduleJob('* /12 * * *', () => fetchData());
let data = bing.defaultData
async function fetchData() {
    data = await bing.fetchData('ja-JP')
    return data
}
async function getImgSrc() {
    return data.src
}
async function getImgData() {
    return data
}
async function _init() {
    return (await fetchData())
}
module.exports = {
    name: "Bing 每日圖片 (日本)",
    description: "Bing Daily Images (ja-JP)",
    getImgSrc,
    getImgData,
    _init
}