import React, { useState, useEffect, useContext } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableHighlight, Alert, Touchable, TouchableOpacity } from 'react-native';
import { AndroidBackButton, BackButton, DeepLinking, Link, MemoryRouter, NativeRouter, Prompt, Redirect, Route, Router, StaticRouter, Switch, generatePath, matchPath, useHistory, useLocation, useParams, useRouteMatch, withRouter } from 'react-router-native'
import { GlobalContext } from "./GlobalContext"


let Navbar = (props) => {

  let context = useContext(GlobalContext)

  let [activeLink, setActiveLink] = useState([true, false, false])

  useEffect(() => {
    // Alert.alert(props.location.pathname)
    let path = props.location.pathname
    let links = ["/", "/list", "/account"]
    let x = [...activeLink]
    x.forEach((y, i) => x[i] = false)
    if (links.indexOf(path) != -1) x[links.indexOf(path)] = true
    setActiveLink(x)

  }, [props.location.pathname])
  return (
    <View>

      <View style={[style.navbar]} onPress={() => Alert.alert(Object.keys(props.location).join(", "))}>
        <Link to="/" style={[style.button]} underlayColor={context.randColor()}>
          <Text style={[style.text, { fontWeight: activeLink[0] ? "bold" : "" }]} >Home</Text>
        </Link>

        <Link to="/list" style={[style.button]} underlayColor={context.randColor()}>
          <Text style={[style.text, { fontWeight: activeLink[1] ? "bold" : "" }]} >List</Text>
        </Link>

        <Link to="/account" style={[style.button,]} underlayColor={context.randColor()}>
          <Text style={[style.text, { fontWeight: activeLink[2] ? "bold" : "" }]} >Account</Text>
        </Link>

      </View>

    </View>
  );
}


const style = StyleSheet.create({
  navbar: {

    flexDirection: "row",
    backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),

  },
  text: {
    margin: 15,
    textAlign: "center",
    fontSize: 16
  },
  button: {
    flex: 1,

  },

})

Navbar = withRouter(Navbar)
export default Navbar;