import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import TransPorterItem from './TransporterItem';
import DriverItem from './DriverItem';

const DrawerContent = ({ progress, ...props }) => {
  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    getUserName();
  }, []);

  const getUserName = async () => {
    let name = await AsyncStorage.getItem('name') || "N/A";
    let number = await AsyncStorage.getItem('number') || "N/A";
    setName(name);
    setNumber(number);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <View style={styles.drawerContent}>
          <Animated.View style={{ transform: [{ translateX }] }}>
            <Drawer.Section>
              <View style={{ paddingLeft: 10 }}>
                <View style={styles.profileLayout}>
                  <Avatar.Image
                    source={{
                      uri:
                        'https://sm.ign.com/t/ign_pk/screenshot/default/o-fawad-khan-facebook_bcf6.1920.jpg',
                    }}
                    style={{ backgroundColor: 'grey' }}
                    size={80}
                  />
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                  <Title style={styles.profileName}>{name}</Title>
                  <Caption style={styles.profilePhoneNumber}>
                    {number}
                  </Caption>
                </View>
              </View>
            </Drawer.Section>
            <Drawer.Section>
              {/* Driver Drawer */}
              {/* <DriverItem {...props} /> */}

              {/* Transport Drawer */}
              <TransPorterItem {...props} />  
            </Drawer.Section>
          </Animated.View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  profileLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileName: {
    fontFamily: 'Montserrat-SemiBold',
  },
  profilePhoneNumber: {
    fontFamily: 'Roboto-Medium',
  },
});
