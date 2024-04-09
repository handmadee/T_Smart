/* eslint-disable prettier/prettier */
'use strict'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditProfile, Help, Notification, ProfileSetting, Security } from './../../src/screens/Setting/index.js';
import { Color } from '../../GlobalStyles.js';
import { Container } from '../components/Container.js';
import { CustomHeader } from './Home.nav.js'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const SettingNav = React.memo(({ navigation, route }) => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                header: ({ navigation, route, options }) => (
                    <SafeAreaView style={{ backgroundColor: Color.colorGhostwhite }}>
                        <Container style={{
                            backgroundColor: Color.colorGhostwhite
                        }} >
                            <CustomHeader navigation={navigation} title={options.headerTitle || route.name} />
                        </Container>
                    </SafeAreaView>
                ),
                gestureEnabled: false

            }}>
            <Stack.Screen name="Setting" component={ProfileSetting} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile1" component={EditProfile} options={{ headerTitle: 'Edit Profile' }} />
            <Stack.Screen name="Notification" component={Notification} options={{ headerTitle: 'Notification' }} />
            <Stack.Screen name="Help" component={Help} options={{ headerTitle: 'Terms & Conditions' }} />
            <Stack.Screen name="Security" component={Security} options={{ headerTitle: 'Security' }} />
        </Stack.Navigator >
    );
});


export default SettingNav;
