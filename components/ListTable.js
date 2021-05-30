import React, { useState, useEffect } from 'react';
import ReactNative, { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Dimensions, TouchableHighlight, ScrollView, Alert, FlatList, TouchableWithoutFeedback } from 'react-native';
import { globalStyle } from './GlobalStyle'
import { withConnect } from './Redux'
import Table from './Table'

let ListTable = ({ listState, listSetter }) => {

  return (
    <FlatList
      data={listState.list}
      renderItem={({ item }) => <Table x={item} />}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 60

      }}
    />
  )
}

export default withConnect(ListTable)