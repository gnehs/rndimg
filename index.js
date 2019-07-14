const app = new (require('koa'))();
const router = new (require('koa-router'))()
const fs = require("fs")
const path = require("path")
const json = require('koa-json')
app.use(json({ pretty: false, param: 'pretty' }))

let moduleList = {};
fs.readdir(__dirname + "/modules", (err, files) => {
    if (err) return console.error(err);
    files.forEach(async file => {
        if (path.extname(file) == ".js" && !file.match(/^._/)) {
            let uri = __dirname + "/modules/" + file
            let _module = require(uri);
            let shortURL = file.replace(/\.js$/, '')
            let moduleData = {
                name: _module.name,
                description: _module.description,
                url: { src: `/src/${shortURL}` }
            };
            let enabled = await _module._init()
            if ('getImgData' in _module)
                moduleData.url.data = `/data/${shortURL}`
            if (enabled) {
                moduleList[shortURL] = moduleData;
                // set router
                router.get(`/src/${shortURL}`, async ctx => ctx.redirect(await _module.getImgSrc()))
                router.get(`/data/${shortURL}`, async ctx => ctx.body = await _module.getImgData())
            }
        }
    });
});

router.get('/', async ctx => {
    ctx.body = moduleList
})

app.use(router.routes())
app.listen(3000, () => {
    console.log("http://localhost:3000");
})
