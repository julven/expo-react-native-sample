import React, { useState } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function Display() {
  return (
    <View style={[style.display]}>
      
    </View>
  );
}

const style = StyleSheet.create({
  display: {
   
      backgroundColor: "#" + Math.floor(Math.random()*16777215).toString(16),
  }
})