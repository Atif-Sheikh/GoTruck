import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'native-base'
import { Camera } from 'expo-camera';

export default function CustomCamera({open, setImage, setOpen, setFileName, setFileType}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null || !open) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera ref={ref => {
            cameraRef = ref;
        }} style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={async () => {
                if (cameraRef) {
                    let result = await cameraRef.takePictureAsync();
                    let name = result.uri.split('/').pop();

                    let match = /\.(\w+)$/.exec(name);
                    let type = match ? `image/${match[1]}` : `image`;
                    setImage(result.uri);
                    setFileType(type);
                    setFileName(name);
                    setOpen(false);
                }
                
            //   setType(
            //     type === Camera.Constants.Type.back
            //       ? Camera.Constants.Type.front
            //       : Camera.Constants.Type.back
            //   );


            }}>
                
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white'}}>
            <Icon
                    name='camera'
                    type='FontAwesome'
                    style={Styles.UploadIcon}
                    style={{color: '#fff'}}
                  />
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const Styles = StyleSheet.create({
    picker: {
        height: 100,
        width: '100%',
        marginBottom: -10,
        color: '#fff',
        fontFamily: 'Montserrat-Regular'
    },
});
