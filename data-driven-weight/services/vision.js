import axios from 'axios'

const OCR_key = 'fd5378d37488957'
const API_KEY = 'AIzaSyA6msAMADzxXZxANboADutjj6RkQSPAyuA'

// const baseURL = "https://vision.googleapis.com/v1/images:annotate?key=" + API_KEY
const baseURL = "https://api.ocr.space/parse/image"
// post request with appropriate body

const newWeight = (newImage) => {

    // using ocr.space for now to see if it's easier than Cloud Vision
    console.log("going to make ocr.space api call")
    console.log(newImage[10] + " 10th character of newImage")
    
    const ocrObject = {
      'apikey': OCR_key,
      'base64Image': newImage,
    }
    // const fullObject =  {
    //     requests: [
    //         {
    //           image: {
    //             content: newImage
    //           },
    //           features: [
    //             {
    //               type: "TEXT_DETECTION"
    //             }
    //           ]
    //         }
    //       ]
    // }

    // what is the exact problem I am dealing with?
    const request = axios.post(baseURL, ocrObject)
    console.log(request)
    return request.then(response => (response))
}

export default { newWeight }