const bing = require('./bing-lib')
const schedule = require('node-schedule')
schedule.scheduleJob('* /12 * * *', () => fetchData());
let data = bing.defaultData
async function fetchData() {
    data = await bing.fetchData('de-DE')
    return data
}
const getImgSrc = () => data.src
const getImgData = () => data
const _init = async () => await fetchData()
module.exports = {
    name: "Bing 每日圖片 (德國)",
    description: "Bing Daily Images (de-DE)",
    getImgSrc,
    getImgData,
    _init
}