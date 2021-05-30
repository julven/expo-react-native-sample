import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Dimensions, ScrollView, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AndroidBackButton, BackButton, DeepLinking, Link, MemoryRouter, NativeRouter, Prompt, Redirect, Route, Router, StaticRouter, Switch, generatePath, matchPath, useHistory, useLocation, useParams, useRouteMatch, withRouter } from 'react-router-native'
// import Orientation, { OrientationLocker, PORTRAIT } from 'react-native-orientation-locker'
import { OrientationLock, lockAsync } from 'expo-screen-orientation'
import Navbar from './Navbar';
import Home from './Home';
import List from './List';
import Account from './Account';
import Login from './Login';
import { GlobalContext } from './GlobalContext'
import { withConnect } from './Redux'

let Index = ({ accountState }) => {

  let context = useContext(GlobalContext)
  let [test, setTest] = useState("");
  let [layout, setLayout] = useState(null)

  useEffect(() => {
    setTest(JSON.stringify())
    lockAsync(OrientationLock.PORTRAIT)
  }, [])

  const style = StyleSheet.create({
    app: {
      flex: 1,
      backgroundColor: context.randColor(),
    },
    view1: {
      backgroundColor: context.randColor(),
    }
  })

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={[style.app]}>

        {Platform.OS === "android" &&

          <View style={[{ height: "auto", borderBottomColor: "gray", borderBottomWidth: 2 }]}>
            <StatusBar backgroundColor={"lightgray"} />
            <Navbar />
          </View>}
        {accountState.logged ?
          <View style={[style.view1, { flexGrow: 1 }]} onLayout={e => setLayout(e.nativeEvent.layout.height)}>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/list" render={() => <List />} />
            <Route exact path="/account" component={Account} />
            <Text>{test}</Text>
          </View>
          :
          <Login />
        }

        {Platform.OS === "ios" &&
          <View style={[{ height: "auto", borderTopColor: "gray", borderTopWidth: 2 }]}>
            <Navbar />
          </View>
        }

      </SafeAreaView >
    </TouchableWithoutFeedback>
  );


}



export default withConnect(withRouter(Index))
