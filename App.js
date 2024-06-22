/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { View, SafeAreaView, Platform } from "react-native";
import { Provider } from 'react-redux';
import store from "./src/redux/store";
import AppRouters from "./src/navigation/app.router";
import { Color } from "./GlobalStyles";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from "react-native-screens";
import FlashMessage from 'react-native-flash-message';
import { NetworkStatusProvider } from "./src/redux/NetworkStatusContext";


const App = () => {
  useEffect(() => {
    Platform.OS === 'ios' && enableScreens(false);
  }, []);
  return (
    <NetworkStatusProvider>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorGhostwhite }}>
          <GestureHandlerRootView>
            <View style={{ flex: 1 }}>
              <AppRouters />
              <FlashMessage position="top" />
            </View>
          </GestureHandlerRootView>
        </SafeAreaView>
      </Provider>
    </NetworkStatusProvider>

  );
};

export default App;
