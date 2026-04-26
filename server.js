import express from 'express'

const app = express()
// const path = require('path')
const PORT = 2026


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static('./public'))


app.get('/', (req, res) =>{
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    console.log('Press Ctrl + C to end this process')
})
