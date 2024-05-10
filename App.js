/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
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
import Input from "./src/components/Input";
import Button from "./src/components/Button";
import PlayQuiz from "./src/screens/Quiz/PlayQuiz";
import SelectGames from "./src/screens/Quiz/HomeQuiz";
import ResuftQuiz from "./src/screens/Quiz/ResuftGameQuiz";
import PopupImage from './src/screens/Popup/mainPop';
import SeeCourse from "./src/screens/Course/SeeAll";
//  react-native-gesture-handler

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';



const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <View style={{ flex: 1 }}>
          <AppRouters />
        </View>
      </GestureHandlerRootView>
    </Provider>

  );
};

export default App;
