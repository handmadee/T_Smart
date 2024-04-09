import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";


const styles = StyleSheet.create({
    process: {
        position: 'relative',
        borderRadius: 5,
        backgroundColor: Color.colorAliceblue,
    },
    magicLine: {
        borderRadius: 5,
        position: 'absolute',
        height: '100%',
        top: 0,
        left: 0,
        bottom: 0,

    }, rowC: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    star: {
        fontFamily: FontFamily.mulishExtraBold,
        fontSize: FontSize.size_2xs,
        color: Color.colorGray_100,
        letterSpacing: 0.2,
    },
})

export const LineProcess = ({ w, h, on, total }) => {
    const process = Math.floor((on / total) * 100);

    console.log(process)

    return (
        <View style={styles.rowC}>
            <View style={[styles.process, { width: w, height: h }]} >
                <View style={[styles.magicLine, { width: `${process}%` }, process > 70 ? { backgroundColor: Color.globalApp } :
                    process > 50 ? { backgroundColor: '#FF6B00' } : { backgroundColor: '#FCCB40' }
                ]} />
            </View>
            <Text style={[styles.star, { marginLeft: 10 }]}>{`${on}/${total}`}</Text>
        </View>
    );
};
