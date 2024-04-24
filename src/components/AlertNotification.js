import React from "react";
import { Image, Text, View, Modal, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontSize, FontFamily } from "../../GlobalStyles";


export default function AlertNotification({ img, title, value, onPress, isVisible = false }) {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }} >
                <View style={{
                    backgroundColor: 'white', padding: 20, borderRadius: 10, width: wp(80),
                    height: hp(40),
                    alignItems: 'center',
                    justifyContent: 'center'

                }}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Image source={require('./../../assets/UserAI.png')}
                            style={{ width: wp(20), height: hp(7) }}
                            resizeMode="contain"
                        />
                        <Text style={{
                            fontFamily: FontFamily.poppinsSemiBold,
                            fontSize: 23,
                            marginTop: 10,
                            color: Color.colorGray_100
                        }}>
                            {title}
                        </Text>
                        <Text
                            style={{
                                fontFamily: FontFamily.robotoRegular,
                                fontSize: 18,
                                textAlign: 'center',
                                fontWeight: '400',
                                marginVertical: 10,
                                lineHeight: 25,
                                color: Color.colorGray_100
                            }}
                        >
                            {value}
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: wp(70),
                                backgroundColor: Color.globalApp,
                                padding: 15,
                                borderRadius: 10,
                                alignItems: 'center',
                                marginTop: 20
                            }}
                            onPress={onPress}>
                            <Text style={{
                                color: Color.primaryWhite, fontSize: 20,
                                fontFamily: FontFamily.mulishBold
                            }}>Mình đã hiểu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}