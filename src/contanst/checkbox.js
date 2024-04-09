'use strict'

import React, { useState } from 'react';
import { Pressable, Image, View } from 'react-native';

const CheckButton = ({ width = 22, height = 22, borderColor, status = false, handlePress, style = {} }) => {
    return (
        <Pressable onPress={handlePress} style={[{ width: width, height: height, borderWidth: 2, borderColor: borderColor }, style]}>
            {status && (
                <Image source={require('../../assets/check.jpeg')} style={{ width: width - 3, height: height - 3 }} resizeMode="contain" />
            )}
        </Pressable>
    );
}

export default CheckButton;
