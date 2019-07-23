import React, { useState } from 'react';
import { ImageStore, ScrollView, StyleSheet, Image, Button } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';
import axios from 'axios'
import { Platform } from '@unimodules/core';


// we want this screen to be just a camera
export default function CameraScreen() {
  // immediately when the dom element loads
  

  getPermissionAsync = async () => {
    if (Platform.OS == "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  getPermissionAsync()

  const [newImage, setNewImage] = useState()
  
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
    })

    console.log(result)
    console.log("result.uri is ", result.uri)
    setNewImage(result)

    if (!result.cancelled) {
      console.log("image will be uploaded now!")
      imgurUpload(newImage)
    }
  }
  imgurUpload = () => {
      // we need to do a post request here
      console.log('Entering foo');
  
      let clientId = "5afd6b67306a4cb";
      // let clientSecret = "04608dcd172ef4ac90272149c4ed50f9f9f45f2f";
      let token = false;
      let auth;
      if (token) {
        auth = 'Bearer ' + token;
      } else {
        auth = 'Client-ID ' + clientId;
      }
      
      console.log(2);
      
      let base64data = await new Promise((resolve, reject) => {
        ImageStore.getBase64ForTag("http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-21.jpg", (data) => {
          resolve(data);
        });
      })
      
      const formData = new FormData();
      formData.append('upload', {
                image: base64data,
          type: 'base64'
      });
  
      const result = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: auth,
          Accept: 'application/json',
        },
      });
      
      console.log(3);
      
      
      console.log("result=", result);
      
      let iid = result.data.id;
      let imgUrl = "https://imgur.com/gallery/" + iid;
      console.log(imgUrl);
      return imgUrl;
  
  
      

      // var bodyFormData = new FormData()
      // bodyFormData.append('image', photo)
      // console.log(photo)
      // console.log("starting axios post now")
      // const config = {  
      //     Accept: 'application/json',
      //     Authorization: 'Client-ID ab294af0c3a968f',  
      // }
      // let base64data = await new Promise((resolve, reject) => {
      //   ImageStore.getBase64ForTag("http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-21.jpg", (data) => {
      //     resolve(data);
      //   });
      // })

      // axios.post('https://api.imgur.com/3/upload', bodyFormData, config).then((response) => {
      //     console.log("never getting here")
      //     console.log(response)
      //     return response
      //   })
      // .catch((response) => {
      //   console.log("here")
      //   console.log("current request is ", bodyFormData, config)
      //   console.log(response)
      // })
  }

  // imgurUpload = (photo) => {
  //   // we need to do a post request here
  //   var bodyFormData = new FormData()
  //   bodyFormData.append('image', photo)
  //   console.log(photo)
  //   console.log("starting axios post now")
  //   const config = {  
  //       'Content-Type': 'multipart/form-data',
  //       'authorization': 'Client-ID ab294af0c3a968f',  
  //   }
  //   axios.post('https://api.imgur.com/3/upload', bodyFormData, config).then((response) => {
  //       console.log("never getting here")
  //       console.log(response)
  //       return response
  //     })
  //   .catch((response) => {
  //     console.log("here")
  //     console.log("current request is ", bodyFormData, config)
  //     console.log(response)
  //   })
  // }

  const dance = () => {
    alert("everybody dance now")
  }

  return (
    // pick picture from gallery, or alternatively take a picture - for now it'll be only pick from gallery, or open Camera app and then pick from gallery
    <ScrollView style={styles.container}>
      <Button
          title="Pick an image from camera roll"
          onPress={_pickImage}
        />
        {newImage &&
          <Image source={{ uri: newImage }} style={{ width: 200, height: 200 }} />}

        <Button title="Upload to server" onPress={imgurUpload}></Button>
    </ScrollView>
  );



}

CameraScreen.navigationOptions = {
  title: 'Camera',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
