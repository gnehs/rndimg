const bing = require('./bing-lib')
const schedule = require('node-schedule')
schedule.scheduleJob('* /12 * * *', () => fetchData());
let data = bing.defaultData
async function fetchData() {
    data = await bing.fetchData('fr-FR')
    return data
}
const getImgSrc = () => data.src
const getImgData = () => data
const _init = async () => await fetchData()
module.exports = {
    name: "Bing 每日圖片 (法國)",
    description: "Bing Daily Images (fr-FR)",
    getImgSrc,
    getImgData,
    _init
}