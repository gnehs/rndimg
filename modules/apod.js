const cheerio = require('cheerio')
    , rp = require('request-promise')
    , schedule = require('node-schedule')
let fetchNewData = schedule.scheduleJob('* /12 * * *', () => fetchData());
let data = {
    title: "不規則星系NGC 55",
    description: "不規則星系NGC 55的外觀酷似大麥哲倫星系。 不過，大麥哲倫星系是我們銀河系的伴星系，離我們約180,000光年遠，而NGC 55則是玉夫座星群的成員，距離遠在6百萬光年之外。 分類為不規則星系的大麥哲倫星系，在深空影像裡形似棒盤星系。 跨幅約50,000光年的NGC 55幾乎側向，它扁窄的外觀和正向的大麥哲倫星系形成鮮明的對比。 大麥哲倫星系有由大型恆星形成區所聚成的發射星雲，而NGC 55也正在形成新恆星。 這張極細緻的星系影像，突顯了NGC 55之內，受到塵埃雲切割的明亮星系核、散發特徵粉紅輝光的恆星形成區、以及泛藍的年輕星團。 ",
    copyright: "影像提供與版權: Acquisition - Eric Benson, Processing - Dietmar Hager",
    src: 'http://sprite.phys.ncku.edu.tw/astrolab/mirrors/apod/image/1907/NGC55-LRGB_hager1024.jpg',
    updateTime: new Date()
}
async function fetchData() {
    try {
        let result = await rp('http://sprite.phys.ncku.edu.tw/astrolab/mirrors/apod/apod.html')
        let $ = cheerio.load(result)
        let src = $($('img')[0]).attr('src')
        if (src) {
            data.src = `http://sprite.phys.ncku.edu.tw/astrolab/mirrors/apod/` + src
            data.title = $('center:nth-child(2) b:nth-child(1)').text().trim()
            data.description = $('body > p:nth-child(3)').text().replace(/說明: /, '').replace(/\n/g, '').trim()
            $('center:nth-child(2) b:nth-child(1)').remove()
            data.copyright = $('body > center:nth-child(2)').text().replace(/\n/g, '').trim()
            data.updateTime = new Date()
        }
    } catch (e) {
        console.error(e);
    }
}
async function getImgSrc() {
    return data.src
}
async function getImgData() {
    return data
}
async function _init() {
    await fetchData()
    try {
        let result = await rp('http://sprite.phys.ncku.edu.tw/astrolab/mirrors/apod/apod.html')
        return !!result
    } catch (e) {
        return false
    }
}
module.exports = {
    name: "每日一天文圖 (成大物理分站) ",
    description: "探索宇宙！每天一幅不同的影像或照片，並由專業天文學家簡明的解說，帶你遨遊迷人的宇宙。",
    getImgSrc,
    getImgData,
    _init
}