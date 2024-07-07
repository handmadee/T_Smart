import React from 'react';
import { Image, View } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import { Color } from './GlobalStyles';
const logo = require('./assets/Logo.png');
const Splash = () => (
    <>
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: Color.primaryWhite,
            }}>
            <View style={{ width: wp(80), height: hp(79), alignSelf: 'center' }}>
                <Image source={logo} resizeMode="contain" style={{ width: wp(75) }} />
                <Progress.Circle
                    size={40}
                    indeterminate={true}
                    color={Color.globalApp}
                    borderWidth={3}
                    style={{ alignSelf: 'center' }}
                />
            </View>
        </View>
    </>
);

export default Splash;
