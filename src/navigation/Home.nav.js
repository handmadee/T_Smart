/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect } from 'react';
import { View, Text, Pressable, SafeAreaView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Color, FontFamily, FontSize } from '../../GlobalStyles.js';
import { ArrowLeft, Home, Book, Message, User, Game } from 'iconsax-react-native';
import CourseNav from './Course.nav.js';
import SettingNav from './Setting.nav';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MyCourse from '../screens/Course/MyCourse.js';
import GameNav from './Game.nav.js';
import { useTranslation } from 'react-i18next';
import LeaderBoard from '../screens/Rank/Leaderboard.js';


export const CustomHeader = React.memo(({ navigation, title }) => {
    const goBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <Pressable onPress={goBack}>
                <ArrowLeft style={{ marginRight: 20 }} variant="Outline" color={Color.colorDimgray_100} />
            </Pressable>
            <Text style={{ fontFamily: FontFamily.jostSemiBold, fontSize: FontSize.size_2xl, color: Color.colorGray_100 }}>{title}</Text>
        </View>
    );
});

const HomeNav = React.memo(() => {
    const { t, i18n } = useTranslation();
    const IconTab = ({ focused, children, name }) => (
        <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            {children}
            <Text style={{ color: focused ? Color.globalApp : Color.colorGray_100, fontWeight: '700', marginTop: 5 }}>{name}</Text>
        </View>
    );
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={({ navigation, route }) => ({
                    header: () => (
                        <SafeAreaView style={{ backgroundColor: Color.colorGhostwhite }}>
                            <View style={{ backgroundColor: Color.colorGhostwhite }}>
                                <CustomHeader navigation={navigation} title={route.name} />
                            </View>
                        </SafeAreaView>
                    ),
                    gestureEnabled: false,
                    tabBarLabel: '',
                    tabBarStyle: {
                        ...(Platform.OS === 'ios' && { paddingTop: 20 }),
                        height: hp(8),

                    }
                })}
            >
                <Tab.Screen
                    name="CourseNav"
                    component={CourseNav}
                    options={({ route }) => {
                        return {
                            tabBarIcon: ({ focused }) => (
                                <IconTab focused={focused} name={t('home')}>
                                    <Home size={22} variant="Bold" color={focused ? Color.globalApp : Color.colorDimgray_100} />
                                </IconTab>
                            ),
                            headerShown: false,
                            tabBarStyle: {
                                ...(Platform.OS === 'ios' && { paddingTop: 20 }),
                                height: hp(8),
                                display: getTabBarVisible(route),
                            }
                        };
                    }}
                />
                <Tab.Screen
                    name="My Courses"
                    component={MyCourse}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <IconTab focused={focused} name={t('coure')}>
                                <Book size={22} variant="Bold" color={focused ? Color.globalApp : Color.colorDimgray_100} />
                            </IconTab>
                        ),

                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Honor"
                    component={LeaderBoard}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <IconTab focused={focused} name={t('Honor')}>
                                <Message size={22} variant="Bold" color={focused ? Color.globalApp : Color.colorDimgray_100} />
                            </IconTab>
                        ),
                        tabBarStyle: {
                            display: 'none'
                        },
                        headerShown: true,


                    }}
                />
                <Tab.Screen
                    name="GameNav"
                    component={GameNav}
                    options={({ route }) => {
                        return {
                            tabBarIcon: ({ focused }) => (
                                <IconTab focused={focused} name={t('Game')}>
                                    <Game size={22} variant="Bold" color={focused ? Color.globalApp : Color.colorDimgray_100} />
                                </IconTab>

                            ),
                            headerShown: false,
                            tabBarStyle: {
                                ...(Platform.OS === 'ios' && { paddingTop: 20 }),
                                backgroundColor: '#4B5FBB',
                                height: hp(8),
                                display: getTabBarVisible(route),
                            }
                        };
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={SettingNav}
                    options={({ route }) => {
                        return {
                            tabBarIcon: ({ focused }) => (
                                <IconTab focused={focused} name={t('Profile')}>
                                    <User size={22} variant="Bold" color={focused ? Color.globalApp : Color.colorDimgray_100} />
                                </IconTab>
                            ),
                            headerShown: false,
                            tabBarStyle: {
                                ...(Platform.OS === 'ios' && { paddingTop: 20 }),
                                height: hp(8),
                                display: getTabBarVisible(route),
                            }
                        };
                    }}
                />



            </Tab.Navigator>
        </NavigationContainer>

    );
});

function getTabBarVisible(route) {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'EditProfile1' || routeName === 'Notification' || routeName === 'Security' || routeName === 'Help' || routeName === 'DetailCourse' || routeName === 'LessonCourse' || routeName === 'ShowAnswer' || routeName === 'Quiz' ||
        routeName === 'CartificateCourse' || routeName === 'TopicSet' || routeName === 'SearchCourse' || routeName === 'NotificationOne' || routeName === 'ChangePasswo' || routeName === 'Exam' || routeName === 'viewAnswer'
    ) {
        return 'none';
    }
    return 'flex';
}

export default HomeNav;
