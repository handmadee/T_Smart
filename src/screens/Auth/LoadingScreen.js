/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Image, Text, View } from "react-native";
import LottieView from 'lottie-react-native';
const LoadingView = () => (
    <View style={{
        flex: 1, justifyContent: 'center',
        alignItems: 'center', flexDirection: 'column'
    }}>
        <LottieView source={require('./../../../assets/loading.json')} autoPlay loop
            style={{ width: 250, height: 250 }}
        />
        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 10 }}>Loading...</Text>
    </View>
);
export default LoadingView;
