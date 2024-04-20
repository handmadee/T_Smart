/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Image, Text, View, Modal, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native";
import AuthNav from "./src/navigation/Auth.nav";
import Splash from "./Splash";
import LoadingView from "./src/screens/Auth/LoadingScreen";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Provider } from 'react-redux';
import store from "./src/redux/store";
import AppRouters from "./src/navigation/app.router";
import Notification from "./src/screens/Services/Notification";
import { Color, FontFamily, FontSize } from "./GlobalStyles";
import { Container } from "./src/components/Container";
import { Rank } from './src/screens/Rank/rank';
import LeaderBoard from "./src/screens/Rank/Leaderboard";


const App = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AppRouters />
      </View>
    </Provider>



  );
}

export default App;