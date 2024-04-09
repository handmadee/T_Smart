/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
'use strict'

import React from 'react'
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Color, FontFamily, FontSize } from '../../GlobalStyles.js';
import { Container } from '../components/Container.js';
import Login from '../screens/Auth/Login.js';
import SignUp from '../screens/Auth/Signup.js';
import LetsAuth from '../screens/Auth/LetsAuth.js';
import { SetPass } from '../screens/Auth/SetPass.js';
import { Forgot } from '../screens/Auth/Forgot.js';
import HomeNav from './Home.nav.js';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
const AuthNav = React.memo(() => {
    // Notification 




    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer >
            <Stack.Navigator
                initialRouteName='LetsAuth'
                screenOptions={{
                    header: ({ navigation, route, options }) => (
                        <SafeAreaView style={{ backgroundColor: Color.colorGhostwhite }}>
                            <Container style={{ backgroundColor: Color.colorGhostwhite }} >
                            </Container>
                        </SafeAreaView>
                    ),
                    gestureEnabled: false

                }}>
                <Stack.Screen name="LetsAuth" component={LetsAuth} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: true }} />
                <Stack.Screen name="SetPass" component={SetPass} options={{ headerShown: true }} />
                <Stack.Screen name="HomeNav" component={HomeNav} options={{ headerShown: false }} />

            </Stack.Navigator >
        </NavigationContainer>

    );
});

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    backButton: {
        marginRight: 10,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.size_2xl,
        color: Color.colorGray_100
    },
});

export default AuthNav;
