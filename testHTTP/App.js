import * as React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Platform } from '@unimodules/core';

const imgur = require('imgur')

export default class ImagePickerExample extends React.Component {
  // global variable within the function
  state = {
    image: null,
  };

  render() {
    let {image} = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Button title="Upload to server" onPress={this.handleUpload}></Button>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS == "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      console.log("image will be uploaded now!")
      imgurUpload(this.state.image)
    }
  }

  imgurUpload = (url) => {
    imgur.setClientId('ab294af0c3a968f')
    imgur.uploadFile(url)
    .then((response) => console.log(response))
    .catch((err) => console.error(err.message))
  }


}

const createFormData = (photo, body) => {
  const data = new FormData()

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri: 
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  })

  Object.keys(body).forEach(key => {
    data.append(key, body[key])
  })

  return data

}


// imgurUpload = (url) => {
//   console.log(`this.state.photo is ${this.state.image}`)
//   fetch("http://171.64.70.176:3000/upload", {
//   method: "POST",
//   body: createFormData(this.state.image, { userId: "123" })
// })
//   .then(response => response.json())
//   .then(response => {
//     console.log("upload succes", response);
//     alert("Upload success!");
//     this.setState({ image: null });
//   })
//   .catch(error => {
//     console.log("upload error", error);
//     alert("Upload failed!");
//   });
// }

// import React from 'react';
// import { Button, StyleSheet, Text, View, Image } from 'react-native';
// import ImagePicker from 'expo-image-picker';
// import axios from 'axios';

// export default function App() {

//   // essentially a global variable
//   state = { photo: null}


//   _pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       this.setState({ image: result.uri });
//     }
//   }


//   let { photo } = this.state
//   // make a post request, and log the results.
//   console.log("page loaded!")
//   const data = {"url": 'http://dl.a9t9.com/ocrbenchmark/eng.png'}
//   const apikey = "fd5378d37488957"


  
//   // const changes = () => axios.get(`https://api.ocr.space/parse/imageurl?apikey=${apikey}&url=${data.url}`).then(response => console.log(response))
//   // changes()
//   console.log("changes logged")
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         {photo && (
//           <Image
//             source={{ uri: photo.uri }}
//             style={{ width: 300, height: 300 }}
//           />
//         )}
//         <Button title="Choose Photo" onPress={this._pickImage} />
//       </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
