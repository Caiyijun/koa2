const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        //显示表单页面
        let html = `
            <h1>Koa2 Post请求</h1>
            <form method="POST" action='/'>
                <p>姓名</p>
                <input name = 'userName'>
                <p>年龄</p>
                <input name = 'age'>
                <p>phone</p>
                <input name = 'phone'>
                <button type='submit'>提交</button>
            </form>
        `;
        ctx.body = html;
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        let postData = await parsePostData(ctx);
        ctx.body = postData;
    } else {
        ctx.body = '<h1>404!</h1>'
    }
});

function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data;
            })
            ctx.req.on('end', function () {
                let parseData = parseQueryStr(postdata);
                resolve(parseData);
            })
        } catch (error) {
            reject(error);
        }
    })
}

function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);
    console.log(queryStrList.entries());
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=');
        console.log(itemList);
        queryData[itemList[0]] =decodeURIComponent(itemList[1]);
    }
    return queryData;
}
app.listen(3000, () => {
    console.log('运行了');
})