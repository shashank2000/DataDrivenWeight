import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import visionService from '../services/vision'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    zoom: 1,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera boiiiii</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera ref={ref => this.camera=ref} style={{ flex: 1 }} type={this.state.type}>
            
            <View style={{ flex: 0.4 }}>
              <TouchableOpacity
                onPress={this.takePicture}
                style={{ alignSelf: 'center' }}
              >
                <Ionicons name="ios-radio-button-on" size={70} color="white" />
              </TouchableOpacity>
            </View> 
          </Camera>
        </View>
      );
    }
  }

  
  takePicture = () => {
    
    if (this.camera) {
      this.camera.takePictureAsync({ base64: true })
      .then(response => {
        if(response){
          visionService.newWeight(response.base64).then(res => console.log(res))
        }
      })
      
    } else {
      console.log('no camera found')
    }
  }

}


/*
export default function LinksScreen() {
  return (
    
<ScrollView style={styles.container}>
      {
       <ExpoLinksView />
       </ScrollView>
    
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

*/
