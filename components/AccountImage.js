import React, { useState, useEffect, useContext } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, Modal, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"
import { withConnect } from './Redux'
import { globalStyle } from './GlobalStyle'
import { GlobalContext } from './GlobalContext'
import * as imagePicker from 'expo-image-picker'

let AccountImage = ({ accountState, accountSetter }) => {

  let [showModal, setShowModal] = useState(false)



  const selectImage = async () => {

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await imagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          setShowModal(false)
          return;
        }

        let result = await imagePicker.launchImageLibraryAsync({
          mediaTypes: imagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.cancelled) {
          accountSetter.accountSet({ image: result.uri })
          setShowModal(false)
        }

      }
    })()

   

  }

  const camera = async () => {

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await imagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          setShowModal(false)
          return;
        }

        let result = await imagePicker.launchCameraAsync({
          mediaTypes: imagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        })
    
        if (!result.cancelled) {
          accountSetter.accountSet({ image: result.uri })
          setShowModal(false)
        }


      }
    })()

   
  }

  return (
    <View>
      <Image style={[style.image]} source={accountState.image == "" ? require('../assets/cat.jpg') : { uri: accountState.image }} />

      <View style={[style.button]}>
        <TouchableHighlight underlayColor={"white"} activeOpacity={0.6} onPress={() => setShowModal(true)}>
          <Text style={{ margin: 10, textAlign: "center" }}>Change</Text>
        </TouchableHighlight>
      </View>

      { showModal &&
        <View style={[style.modal]} onPress={() => Alert.alert("test")}>
          <View style={{ flexDirection: "column", }}>

            <View style={[style.button]}>
              <TouchableHighlight underlayColor={"white"} activeOpacity={0.6} onPress={() => selectImage()}>
                <Text style={{ margin: 10, textAlign: "center" }}>Gallery</Text>
              </TouchableHighlight>
            </View>

            <View style={[style.button]}>
              <TouchableHighlight underlayColor={"white"} activeOpacity={0.6} onPress={() => camera()}>
                <Text style={{ margin: 10, textAlign: "center" }}>Camera</Text>
              </TouchableHighlight>
            </View>

            <View style={[style.button]}>
              <TouchableHighlight underlayColor={"white"} activeOpacity={0.6} onPress={() => setShowModal(false)}>
                <Text style={{ margin: 10, textAlign: "center" }}>Cancel</Text>
              </TouchableHighlight>
            </View>


          </View>
        </View>
      }

    </View>

  )
}

const style = StyleSheet.create({
  image: {
    ...{

      width: 150,
      height: 150,
      borderColor: "gray",
      borderWidth: 1,
      alignSelf: "center",
      marginTop: 15
    }
  },
  button: {
    ...{
      borderWidth: 2,
      borderColor: "gray",
      backgroundColor: "lightgray",
      width: 150,
      marginVertical: 10,
      alignSelf: "center"
    }
  },
  modal: {
    ...{
      bottom: 10,
      position: "absolute",
      width: "90%",
      height: "auto",
      backgroundColor: "white",
      borderColor: "gray",
      borderWidth: 2,
      alignSelf: "center",
      padding: 5
    }
  }
})

export default withConnect(AccountImage)