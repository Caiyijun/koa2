const Koa = require('koa');
const app = new Koa();
app.use(async(ctx)=>{
    ctx.body='hello Caiyijun'
})
app.listen(3000);
console.log('app is start at port 3000');