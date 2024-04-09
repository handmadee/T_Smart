/* eslint-disable prettier/prettier */
'use strict';

import React from 'react';
import { View, Image } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const RowComponent = ({ children, width = wp(70), padding = 20, style = {} }) => {
    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center', width: width, padding: padding, justifyContent: 'space-around', alignContent: 'center' }, style]}>
            {children}
        </View>
    );
};