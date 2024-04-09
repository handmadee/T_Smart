/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
'use strict'

import React from 'react'
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Color, FontFamily, FontSize } from '../../GlobalStyles.js';
import { Container } from '../components/Container.js';
import DetailCourse from '../screens/Course/DetailCourse.js';
import Home from '../screens/Home/Home.js';
import { ShowAnswer } from '../screens/Games/ShowQuiz.js';
import Quiz from '../screens/Games/quiz.js';
import CartificateCourse from '../screens/Course/CertificateCourse';
import SelectGames from '../screens/Games/SelectGames';
import TopicSet from '../screens/Games/TopicSet';
import { CustomHeader } from './Home.nav.js';



const GameNav = React.memo(() => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='SelectGames'
            screenOptions={{
                header: ({ navigation, route, options }) => (
                    <SafeAreaView style={{ backgroundColor: Color.colorGhostwhite }}>
                        <Container style={{ backgroundColor: Color.colorGhostwhite }} >
                            <CustomHeader navigation={navigation} title={options.headerTitle || route.name} />
                        </Container>
                    </SafeAreaView>
                ),
                gestureEnabled: false

            }}>
            <Stack.Screen name="SelectGames" component={SelectGames} options={{ headerShown: false }} />
            <Stack.Screen name="Quiz1" component={Quiz} options={{ headerShown: true }} />
            <Stack.Screen name="TopicSet" component={TopicSet} options={{ headerShown: true }} />
            <Stack.Screen name="ShowAnswer" component={ShowAnswer} options={{ headerShown: true }} />
        </Stack.Navigator >

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

export default GameNav;
