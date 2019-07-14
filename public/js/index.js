const app = new Vue({
    el: '#container',
    data: {
        imgsources: null
    },
    created() {
        fetch('/api/').then(r => r.json()).then(data => {
            let result = []
            for (let sources in data) {
                data[sources].url.src = window.location.origin + data[sources].url.src
                data[sources].url.data = window.location.origin + data[sources].url.data
                result.push(data[sources])
            }
            this.imgsources = result
        })
    }
})