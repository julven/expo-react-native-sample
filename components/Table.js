import React, { useState, useEffect, useContext } from 'react';
import ReactNative, { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
import { globalStyle } from './GlobalStyle'
import { withConnect } from './Redux'
import { GlobalContext } from './GlobalContext'


let Table = ({ listSetter, listState, x }) => {

  let context = useContext(GlobalContext)

  let randColor = () => "hsl(" + Math.random() * 360 + ", 100%, 75%)";

  let deletes = id => {
    listSetter.listDelete({ id })
  }

  return (
    <TouchableWithoutFeedback onPress={() => { }}>
      <View style={{ backgroundColor: randColor(), marginTop: 5, marginLeft: 5, marginRight: 10, padding: 5, flex: 1, flexDirection: "row" }}>
        <View style={{ flexGrow: 1 }}>
          <View style={{ flexDirection: "row", }}>
            <View style={{ justifyContent: "flex-end" }}>
              <Text > Name :</Text>
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}> {context.capitalize(`${x.fname} ${x.lname}`)}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "flex-end" }}>
              <Text > Brithday :</Text>
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}> {context.date(x.bday)}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "flex-end" }}>
              <Text > Gender :</Text>
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}> {context.capitalize(x.gender)}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "flex-end" }}>
              <Text > ID :</Text>
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}> {x.id}</Text>
          </View>
        </View>

        <View style={{ flexShrink: 1 }}>
          <TouchableHighlight
            underlayColor={randColor()}
            onPress={() => deletes(x.id)}
            style={{ backgroundColor: "white", borderColor: "lightgray", borderWidth: 2 }}>
            <Text style={{ marginHorizontal: 5 }}>delete</Text>
          </TouchableHighlight>
        </View>

      </View>
    </TouchableWithoutFeedback>
  )
}

export default withConnect(Table)