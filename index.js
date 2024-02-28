const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')    
const multer = require('multer')
const fs = require('fs')
const upload = multer({ dest: 'public/'})
const cors = require('cors')

const hostname = '127.0.0.1'
const port = 3000

app.use(morgan('combined'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.post('/login', (req, res) => {
    const {username, password} = req.body
    res.send(`You Are Login at ${username} with the password ${password}`)
})

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file
    if(file){
        const target = path.join(__dirname, 'public', file.originalname)
        fs.renameSync(file.path, target)
        res.send("file are uploaded")
    }else{
        res.send("file aren't uplouded")
    }
})

app.use(cors())

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})