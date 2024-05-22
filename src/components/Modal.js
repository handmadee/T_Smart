import React from "react";
import { Image, Text, View, Modal, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontSize, FontFamily } from "../../GlobalStyles";


export default function Modal2({ img, title, value, onPress, isVisible = false, style = {} }) {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
        >
            <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }]} >
                <View style={{
                    backgroundColor: 'white', padding: 20, borderRadius: 10, width: wp(80),
                    height: hp(30),
                    flexDirection: 'column',
                    alignItems: 'center',
                    ...style
                }}>
                    <Image source={img}
                        style={{ width: wp(20), height: hp(7) }}
                        resizeMode="contain"
                    />
                    <Text style={{
                        fontFamily: FontFamily.robotoRegular,
                        fontSize: 22,
                        marginLeft: 10,
                        fontWeight: 'bold',
                        color: Color.colorOrangered,
                        textAlign: 'center'
                    }}>
                        {title}
                    </Text>
                    <Text
                        style={{
                            fontFamily: FontFamily.robotoRegular,
                            fontSize: 18,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            marginTop: 10,
                        }}
                    >
                        {value}
                    </Text>
                    <TouchableOpacity
                        style={{
                            width: wp(70),
                            backgroundColor: Color.colorOrangered,
                            padding: 10,
                            borderRadius: 10,
                            alignItems: 'center',
                            marginTop: 20
                        }}
                        onPress={onPress}>
                        <Text style={{
                            color: Color.primaryWhite, fontSize: 16,
                            fontWeight: '400'
                        }}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}