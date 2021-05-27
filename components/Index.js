import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Dimensions, ScrollView, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AndroidBackButton, BackButton, DeepLinking, Link, MemoryRouter, NativeRouter, Prompt, Redirect, Route, Router, StaticRouter, Switch, generatePath, matchPath, useHistory, useLocation, useParams, useRouteMatch, withRouter } from 'react-router-native'
import Navbar from './Navbar';
import Home from './Home';
import List from './List';
import Account from './Account';
import { GlobalContext } from './GlobalContext'

let Index = () => {

  let context = useContext(GlobalContext)

  let [layout, setLayout] = useState(null)

  useEffect(() => {

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

          <View style={[{ height: "auto", marginTop: StatusBar.currentHeight }]}>
            <Navbar />
          </View>}
        <View style={[style.view1, { flexGrow: 1, paddingHorizontal: 10 }]} onLayout={e => setLayout(e.nativeEvent.layout.height)}>

          <Route exact path="/" component={Home} />
          <Route exact path="/list" render={() => <List />} />
          <Route exact path="/account" component={Account} />


        </View>
        {Platform.OS === "ios" &&
          <View style={[{ height: "auto" }]}>
            <Navbar />
          </View>}

      </SafeAreaView >
    </TouchableWithoutFeedback>
  );


}



export default withRouter(Index)
