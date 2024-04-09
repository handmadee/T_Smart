/* eslint-disable prettier/prettier */
'use strict';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FontFamily, Color } from '../../GlobalStyles';

export const H1 = ({
    children,
    color = Color.colorDimgray_100,
    size = 16,
    font = FontFamily.Mulish,
    letterSpacing = 0.2,
    lineHeight = 0,
    customStyle = {},
}) => {
    const styles = StyleSheet.create({
        text: {
            color: color,
            fontSize: size,
            fontFamily: font,
            lineHeight: lineHeight,
            letterSpacing: letterSpacing,
        },
    });

    return <Text style={[styles.text, customStyle]}>{children}</Text>;
};


