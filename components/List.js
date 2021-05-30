import React, { useState, useEffect, useContext } from 'react';
import ReactNative, { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Dimensions, TouchableHighlight,ScrollView, Alert } from 'react-native';
import { globalStyle } from './GlobalStyle'
import ListTable from './ListTable' 
import ListForm from './ListForm' 
import { GlobalContext } from './GlobalContext'
import { GlobalStyle } from './GlobalStyle'


export default function List(props) {

  let context = useContext(GlobalContext)

  let [tab ] = useState([
    context.randColor(),
    context.randColor()
  ])
  let [activeTab, setActiveTab] = useState(1)

 
  return (
   <View style={{flex: 1}}>
      <Text style={[globalStyle.title,]}>List</Text>
      <View style={{flex: 1}}>
        <View style={{flexDirection: "row",}}>
            <View style={{width: 10, borderBottomColor: "gray", borderBottomWidth: 2}} />
            <TouchableHighlight 
            onPress={() => setActiveTab(1)} 
            style={[style.tab, globalStyle.bordered,{backgroundColor: activeTab == 1 ?"white":"lightgray", borderBottomColor: activeTab == 1 ?"white":"gray", }]} 
            underlayColor={context.randColor()}>
              <Text 
              style={[{fontSize: 20, textAlign: "center", color:activeTab == 1 ?"black":"gray" }, activeTab == 1 && {fontWeight: "bold"}]}>Table</Text>
               </TouchableHighlight>
            <View style={{width: 5, borderBottomColor: "gray", borderBottomWidth: 2}} />
             <TouchableHighlight 
             onPress={() => setActiveTab(2)} 
             style={[style.tab, globalStyle.bordered, { backgroundColor: activeTab == 2 ?"white":"lightgray", borderBottomColor: activeTab == 2 ?"white":"gray",}]} 
             underlayColor={context.randColor()}>
              <Text 
              style={[{fontSize: 20, textAlign: "center", color:activeTab == 2 ?"black":"gray"}, activeTab == 2 && {fontWeight: "bold"}]}>Form</Text>
              </TouchableHighlight>
              <View style={{width: 10, borderBottomColor: "gray", borderBottomWidth: 2}} />
   
        </View>
        { activeTab === 1 &&
        <View style={{flexGrow: 1, backgroundColor: tab[0]}}>
        <View style={{height: 15}}/>
            <ListTable />
        </View>
        } 
        {
          activeTab === 2 &&
        <View style={{flexGrow: 1, backgroundColor: tab[1]}}>
          <ScrollView style={{marginBottom: 40}}>
            <View style={{marginTop: 10, marginHorizontal: 20}}>
              <ListForm/>
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
    flex: 1, height: 40, justifyContent: "center",
 
   
  }
})

