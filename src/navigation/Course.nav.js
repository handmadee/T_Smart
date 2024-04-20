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
import { CustomHeader } from './Home.nav.js';
import { ShowAnswer } from '../screens/Games/ShowQuiz.js';
import LessonCourse from '../screens/Course/LessonCourse.js';
import Quiz from '../screens/Games/quiz.js';
import CartificateCourse from '../screens/Course/CertificateCourse';
import SearchCourse from '../screens/Course/SearchCourse.js';
import EditProfile from '../screens/Setting/EditProfile.js';
import Notification12 from '../screens/Services/Notification.js';



const CourseNav = React.memo(() => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName='Home'
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
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="DetailCourse" component={DetailCourse} options={{ headerShown: true }} />
            <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false }} />
            <Stack.Screen name="CartificateCourse" component={CartificateCourse} options={{ headerShown: true }} />
            <Stack.Screen name="ShowAnswer" component={ShowAnswer} options={{ headerShown: true }} />
            <Stack.Screen name="LessonCourse" component={LessonCourse} options={{ headerShown: true }} />
            <Stack.Screen name="SearchCourse" component={SearchCourse} options={{ headerShown: true }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: true }} />
            <Stack.Screen name="NotificationOne" component={Notification12} options={{ headerShown: true }} />
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

export default CourseNav;
