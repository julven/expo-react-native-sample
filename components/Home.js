import React, { useState, useEffect, useContext } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { withConnect } from './Redux'
import { globalStyle } from './GlobalStyle'
import { GlobalContext } from './GlobalContext'

let Home = ({ listState, accountState }) => {

  let context = useContext(GlobalContext)

  let [test, setTest] = useState("")

  let [list, setList] = useState({
    total: 0,
    female: 0,
    male: 0
  })

  useEffect(() => {
    let total = 0;
    let male = 0;
    let female = 0;

    listState.list.forEach(x => {
      x.gender === "male" && male++;
      x.gender === "female" && female++;
      total++;
    })

    setList({
      total,
      female,
      male
    })

    fetch("https://julven.000webhostapp.com/vuesample/backend/server.php?route=person_summary").then(resp => resp.text()).then(resp => {
      setTest(resp)
    })

  }, [])
  return (
    <View style={{ minWidth: 335, maxWidth: 340, alignSelf: "center" }}>
      <Text style={[globalStyle.title,]}>Home</Text>
      <View style={[{ backgroundColor: "lightgray", marginTop: 5 }, globalStyle.bordered]}>
        <View style={{ margin: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>List Summary</Text>
          <View style={{ flexDirection: "row", maxWidth: 100, justifyContent: "space-between" }}>
            <Text> Total</Text>
            <Text style={{ fontWeight: "bold" }}> {list.total}</Text>
          </View>

          <View style={{ flexDirection: "row", maxWidth: 100, justifyContent: "space-between" }}>
            <Text> Females</Text>
            <Text style={{ fontWeight: "bold" }}> {list.female}</Text>
          </View>

          <View style={{ flexDirection: "row", maxWidth: 100, justifyContent: "space-between" }}>
            <Text> Males</Text>
            <Text style={{ fontWeight: "bold" }} > {list.male}</Text>
          </View>
        </View>
      </View>

      <View style={[{ backgroundColor: "lightgray", marginTop: 5 }, globalStyle.bordered]}>
        <View style={{ margin: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>Account Information</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ minWidth: 100, }}> First Name</Text>
            <Text style={{ fontWeight: "bold" }}> {context.capitalize(accountState.fname)}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ minWidth: 100, }}> Last Name</Text>
            <Text style={{ fontWeight: "bold" }}> {context.capitalize(accountState.lname)}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ minWidth: 100, }}> Birthday</Text>
            <Text style={{ fontWeight: "bold" }}> {context.date(accountState.bday)}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ minWidth: 100, }}> Gender</Text>
            <Text style={{ fontWeight: "bold" }}> {context.capitalize(accountState.gender)}</Text>
          </View>
        </View>
      </View>

      <Text>{ }</Text>
    </View>
  );
}

Home = withConnect(Home)

export default Home