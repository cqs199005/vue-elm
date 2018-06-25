const express = require('express')
const app = express()

//注册中间件,设置cors
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
})

//导入假数据
const data = require('./data.json')
const { seller,goods,ratings } = data

const appRouter = express.Router()
appRouter.get('/seller',(req,res)=>{
    res.json({
        errno: 0,
        data: seller
    })
})
appRouter.get('/goods',(req,res)=>{
    res.json({
        errno: 0,
        data: goods
    })
})
appRouter.get('/ratings',(req,res)=>{
    res.json({
        errno: 0,
        data: ratings
    })
})

app.use('/api',appRouter)
app.listen(3000,function(){
    console.log('running...');
})