# DataDrivenWeight
An Android/iOS app that will help make documenting daily weight as easy as taking a picture

Idea: instead of having to physically type in his weight every day on a spreadsheet (which he will definitely forget to do), Appa (or me or anyone else) can take a picture of the scale every morning. The app and backend will handle the rest.

Pipeline:
1. Take a picture of the scale on the phone
2. Deal with offset (stored locally in memory with a db.json write)
3. Upload the image to imgur, and get a URL for it. POST the URL to nodejs backend, along with offset. 
4. Find the number with ocrspace on the backend (the reason we need both is because ocrspace works much better with a url to image as opposed to base 64)
4. Send the number to nodeJS backend. Here it will be stored in another db.json, and we can play around with a google sheets thing. Will be hosted on madhu.herokuapp.com or on shashankr.me/weight.

Deal with the first 3 steps first, nodejs will be easy to figure out. 
