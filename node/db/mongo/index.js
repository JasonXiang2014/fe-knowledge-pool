const express = require("express")
const app = express()
const path = require("path")
const mongo = require("./models/db")

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./index.html"))
})

app.get("/api/list", async (req, res) => {
    const { page = 1, pageSize = 5, category, search: name } = req.query
    console.log(req.query)
    try {
        let col = mongo.col('fruits')
        let queryStr = category ? name ? { category, name } : { category } : name ? { name } : {}
        const total = await col.find(queryStr).count()
        const fruits = await col
            .find(queryStr)
            .skip((page - 1) * pageSize)
            .limit(parseInt(pageSize))
            .toArray()
        console.log(total, fruits)
        res.json({ ok: 1, data: { fruits, pagination: { total, page } } })
    } catch (error) {
        console.log(error)
    }
})

app.get("/api/category", async (req, res) => {
    const col = mongo.col("fruits")
    const data = await col.distinct('category')
    res.json({ ok: 1, data })
})
app.listen(3000)