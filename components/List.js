import React, { useState, useEffect, useContext } from 'react';
import ReactNative, { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView, Alert } from 'react-native';
import { globalStyle } from './GlobalStyle'
import ListTable from './ListTable'
import ListForm from './ListForm'
import { GlobalContext } from './GlobalContext'


export default function List(props) {

  let context = useContext(GlobalContext)

  let [tab] = useState([
    context.randColor(),
    context.randColor()
  ])
  let [activeTab, setActiveTab] = useState(1)


  return (
    <View style={{ flex: 1 }}>
      <Text style={[globalStyle.title]}>List</Text>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>


          <TouchableHighlight onPress={() => setActiveTab(1)} style={[style.tab, { backgroundColor: tab[0] }]} underlayColor={context.randColor()}>
            <Text style={[{ fontSize: 20, textAlign: "center" }, activeTab == 1 && { fontWeight: "bold" }]}>Table</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => setActiveTab(2)} style={[style.tab, { backgroundColor: tab[1] }]} underlayColor={context.randColor()}>
            <Text style={[{ fontSize: 20, textAlign: "center" }, activeTab == 2 && { fontWeight: "bold" }]}>Form</Text>
          </TouchableHighlight>


        </View>
        {activeTab === 1 &&
          <View style={{ flexGrow: 1, backgroundColor: tab[0] }}>
            <ListTable />
          </View>
        }
        {
          activeTab === 2 &&
          <View style={{ flexGrow: 1, backgroundColor: tab[1] }}>
            <ScrollView style={{ marginBottom: 40 }}>
              <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                <ListForm />
              </View>
            </ScrollView>
          </View>
        }
      </View>

    </View>
  );
}



const style = StyleSheet.create({
  tab: {
    flex: 1, height: 40, justifyContent: "center"
  }
})

