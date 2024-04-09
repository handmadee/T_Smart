import React from "react";
import { TextInput, View, Image, StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from "../../GlobalStyles";


export function Search({ placeholder = '', onChangeText, value }) {
    const styles = StyleSheet.create({
        search: {
            width: '100%',
            height: '100%',
            borderRadius: 12
        },
        iconSearch: {
            position: 'absolute',
            top: hp(1.3),
            right: wp(5)
        },
        bgSearch: {
            width: wp(90),
            height: hp(7),
            backgroundColor: Color.primaryWhite,
            borderRadius: 12,
            position: 'relative',
            marginVertical: hp(2),
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 5,
        },
    })

    return (
        <View style={styles.bgSearch}>
            <TextInput placeholder={placeholder} style={styles.search} />
            <Image source={require('../../assets/SEARCH.png')} style={styles.iconSearch} />
        </View>
    )
}