/* eslint-disable prettier/prettier */
import React from 'react';
import { Pressable, Text, StyleSheet, Image } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../GlobalStyles';


const Button = ({ onPress, title, style }) => (
    <Pressable style={[styles.btn, style]} onPress={onPress}>
        <Text style={[styles.context]}>
            {title}
        </Text>
        <Image source={require('../../assets/arrow.png')} style={{ width: wp(14.2), height: hp(6.9) }}>
        </Image>
    </Pressable>
);
const styles = StyleSheet.create({
    context: {
        color: Color.primaryWhite, fontSize: 18, fontFamily: FontFamily.jostSemiBold, marginLeft: wp(10), textAlign: 'center', width: wp(57)
    },
    btn: {
        width: wp(90),
        height: hp(8),
        backgroundColor: Color.globalApp,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(3),
        justifyContent: 'space-between',
        paddingHorizontal: wp(2)
    },


});
export default Button;
