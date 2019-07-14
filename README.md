![](https://i.imgur.com/S0lgZ3S.png)
# Rndimg
給你滿滿美圖的好朋友
## 部署
```bash
cd /path/to/rndimg
npm i
npm start
```
## 如何使用
GET `/` - 可供預覽來源圖片的首頁

GET `/api` - 取得所有圖片來源的名稱、簡介及相關網址

GET `/api/<source>` - 取得圖片資料

GET `/api/<source>/src` - 轉址到圖片位置
## 撰寫 module
撰寫完成後丟到 `modules` 資料夾即可使用
### module.exports 必要欄位格式說明
```js
module.exports = {
    name: "模組名稱",
    description: "模組簡介",
    getImgSrc, //回傳圖片網址
    getImgData, //回傳圖片資料
    _init //檢查模組是否可用，回傳 true 來啟用該模組
}
```
### data 必要欄位格式說明
```js
data = {
    title: "圖片標題",
    description: "圖片簡介",
    copyright: "圖片版權資料",
    src: "圖片網址",
    updateTime: "圖片抓取時間"
}
```
