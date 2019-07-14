const bing = require('./bing')
const schedule = require('node-schedule')
schedule.scheduleJob('* /12 * * *', () => fetchData());
let data = bing.defaultData
async function fetchData() {
    data = await bing.fetchData('ja-JP')
    return data
}
const getImgSrc = () => data.src
const getImgData = () => data
const _init = async () => await fetchData()
module.exports = {
    name: "Bing 每日圖片 (日本)",
    description: "Bing Daily Images (ja-JP)",
    getImgSrc,
    getImgData,
    _init
}