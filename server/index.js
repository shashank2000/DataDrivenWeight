const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const ocrSpaceApi = require('ocr-space-api')
const app = express()

// use the parseImageFromUrl function 
const options = {
    apikey: 'fd5378d37488957'
}


app.use(bodyParser.json()) // remember use from nodeschool/fullstackopen?
// no classes here so I don't have to worry about const - but why
const Storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, './images')
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    },
})

const upload = multer({ storage: Storage })

// image URL is one of the query params 
app.get('/', (req, res) => {

    const config = {
        lang: 'eng',
        oem: 1,
        psm: 3
    }

    const imageUrl = 'https://miro.medium.com/max/746/1*J3-I2VR1F0UhLMaBNgy8qw.png'
    ocrSpaceApi.parseImageFromUrl(imageUrl, options)
    .then((result) => {
        console.log(result.parsedText)
        // res.send(result)
    }).catch((err) => {
        console.log('ERROR: ', err)
    })


    res.status(200).send('Post to /upload!')
})

app.post('/upload', upload.array(3), (req, res) => {
    console.log('file', req.files)
    console.log('body', req.body)
    res.status(200).json({
        message: 'success!'
    })

})

var port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('running')
})