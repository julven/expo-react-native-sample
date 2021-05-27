import React, { useState } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Dimensions } from 'react-native';
import { AndroidBackButton, BackButton, DeepLinking, Link, MemoryRouter, NativeRouter, Prompt, Redirect, Route, Router, StaticRouter, Switch, generatePath, matchPath, useHistory, useLocation, useParams, useRouteMatch, withRouter } from 'react-router-native'

import { Provider } from 'react-redux'
import { reduxAccountStore, reduxListStore, reduxAccountContext, reduxListContext } from './components/Redux'
import Index from './components/Index';
import { GlobalProvider } from './components/GlobalContext'


let App = () => {



  return (
    <NativeRouter>
      <GlobalProvider >
        <Provider store={reduxAccountStore} context={reduxAccountContext}>
          <Provider store={reduxListStore} context={reduxListContext}>
            <Index />
          </Provider >
        </Provider >
      </GlobalProvider>
    </NativeRouter>
  );
}


export default App
