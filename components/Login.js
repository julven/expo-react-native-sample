import React, { useState, useEffect, useContext } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import { GlobalContext } from './GlobalContext'
import { globalStyle } from './GlobalStyle'
import { withConnect } from './Redux'

let Login = ({ accountState, accountSetter }) => {

  let context = useContext(GlobalContext)

  let [ fields, setField ] = useState({
    email: "",
    pass: ""
  })

  let fieldChange = (field, value) => {
    setField({
      ...fields,
      [ field ] : value 
    })
  }

  let login = () => {
    accountSetter.accountSet({logged: true})
  }

  useEffect(() => {

  }, [])

  return (
   <View style={{flex: 1}}>
      
      <View style={{flexGrow: 1, flexDirection:"column", justifyContent:"center", marginBottom: 100}}>
        <Text style={[globalStyle.title, {flexShrink: 1, textAlign: "center"}]}>Login</Text>
        <View style={{minWidth: 290, maxWidth: 300, alignSelf: "center"}}>
          
          <Text style={{marginTop: 5}}>Email</Text>
          <TextInput style={[globalStyle.input]} value={fields.email} onChange={ e => fieldChange('email', e.nativeEvent.text) }/>

          <Text style={{marginTop: 5}}>Password </Text>
          <TextInput secureTextEntry={true} style={[globalStyle.input]} value={fields.pass} onChange={ e => fieldChange('pass', e.nativeEvent.text) }/>


          <View style={{ borderWidth: 2, borderColor: "gray", backgroundColor: "lightgray", width: 100, marginVertical: 15}}>
            <TouchableHighlight underlayColor={"white"} activeOpacity={0.6} onPress={() => login()}> 
              <Text style={{margin: 10,textAlign: "center"}}>Login</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
      
  </View>
  );
}

export default withConnect(Login)