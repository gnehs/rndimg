const cheerio = require('cheerio')
    , rp = require('request-promise')
    , schedule = require('node-schedule')
let defaultData = {
    title: "Leatherback sea turtles in Trinidad and Tobago",
    description: "",
    copyright: "Leatherback sea turtles in Trinidad and Tobago (© Shane P. White/Minden Pictures)",
    src: "https://bing.com/th?id=OHR.LeatherbackTT_ROW0614606094_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
    updateTime: new Date()
}
let data = defaultData
let fetchNewData = schedule.scheduleJob('* /12 * * *', async () => {
    data = await fetchData()
});
async function fetchData(lang = 'en-US') {
    try {
        let d = {}
        let result = await rp(`https://bing.com/HPImageArchive.aspx?format=js&n=1&mkt=${lang}`)
        result = JSON.parse(result).images[0]
        d.src = `https://bing.com` + result.url
        d.copyright = result.copyright.match(/ \((.+)\)$/)[1]
        d.title = result.copyright.replace(/ \((.+)/, '')
        d.description = ""
        d.updateTime = new Date()
        return d
    } catch (e) {
        console.error(e); return false
    }
}
async function getImgSrc() {
    return data.src
}
async function getImgData() {
    return data
}
async function _init() {
    data = await fetchData()
    return data
}
module.exports = {
    name: "Bing 每日圖片",
    description: "Bing Daily Images",
    getImgSrc,
    getImgData,
    _init,
    defaultData,
    fetchData
}