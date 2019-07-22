import React, { useState } from 'react';
import { ScrollView, StyleSheet, Image, Button } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
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
  imgurUpload = (photo) => {
      // we need to do a post request here
      var bodyFormData = new FormData()
      bodyFormData.append('image', photo)
      console.log(photo)
      console.log("starting axios post now")
      const config = {  
          Accept: 'application/json',
          Authorization: 'Client-ID ab294af0c3a968f',  
      }
      axios.post('https://api.imgur.com/3/upload', bodyFormData, config).then((response) => {
          console.log("never getting here")
          console.log(response)
          return response
        })
      .catch((response) => {
        console.log("here")
        console.log("current request is ", bodyFormData, config)
        console.log(response)
      })
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

        <Button title="Upload to server" onPress={dance}></Button>
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
