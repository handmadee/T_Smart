/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Image, Text, View } from "react-native";
import AuthNav from "./src/navigation/Auth.nav";
import Splash from "./Splash";


const App = () => {
  const [splash, setSplash] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {splash ? <Splash /> : <AuthNav />}
    </View>
  );
}
export default App;
