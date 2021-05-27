import React, { useState } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { globalStyle } from './GlobalStyle'

export default function Login() {
  return (
    <View>
      <Text style={[globalStyle.title]}>Login</Text>
    </View>
  );
}

