//mongo api简单使用
(async () => {
    const { MongoClient: MongoDB } = require('mongodb')
    const client = new MongoDB(
        'mongodb://localhost:27017',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    let ret
    // 创建连接
    ret = await client.connect()
    const db = client.db('test')

    const fruits = db.collection('fruits')
    // ret = await fruits.insertOne({
    //     name: '芒果',
    //     price: 20.1
    // })
    // log('插入成功',ret)

    // 查询文档
    ret = await fruits.findOne()
    console.log('find:',ret)

    // 更新文档
    ret = await fruits.updateOne({name:'芒果'},{
        $set:{name: '苹果'}
    })
    console.log('update',ret.result)

    ret = await fruits.deleteOne({name:'苹果'})

    await fruits.deleteMany()
})()

const log = (text, json) => {
    console.log(text, JSON.stringify(json, '', '\t'))
}
