import React, { useState, useEffect } from 'react';
import ReactNative, { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView, Alert, FlatList, TouchableWithoutFeedback } from 'react-native';
import { globalStyle } from './GlobalStyle'
import { withConnect } from './Redux'
import Table from './Table'

let ListTable = ({ listState, listSetter }) => {



  return (

    <ScrollView style={{ marginBottom: 40 }}>

      <FlatList
        data={listState.list}
        renderItem={({ item }) => <Table x={item} />}
        contentContainerStyle={{
          marginVertical: 10
        }}
      />

    </ScrollView>

  )
}

export default withConnect(ListTable)