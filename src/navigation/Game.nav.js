/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
'use strict'

import React from 'react'
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Color, FontFamily, FontSize } from '../../GlobalStyles.js';
import { Container } from '../components/Container.js';
import Quiz from '../screens/Games/quiz.js';
import SelectGames from '../screens/Quiz/HomeQuiz.js';
import { CustomHeader } from './Home.nav.js';
import TopicSet from '../screens/Quiz/TopicSet.js';
import ResuftQuiz from '../screens/Quiz/ResuftGameQuiz.js';
import PlayQuiz from '../screens/Quiz/PlayQuiz.js';
import { ViewAnswer } from '../screens/Quiz/seeAnswer.js';


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
            <Stack.Screen name="Exam" component={PlayQuiz} options={{
                headerShown: false,
            }}
            />
            <Stack.Screen name="TopicSet" component={TopicSet} options={{ headerShown: true }} />
            <Stack.Screen name="ShowAnswer" component={ResuftQuiz} options={{ headerShown: false }} />
            <Stack.Screen name="viewAnswer" component={ViewAnswer} options={{ headerShown: false }} />
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
