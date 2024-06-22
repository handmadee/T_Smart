import React from "react";
import { Image, Text, View, Modal, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontSize, FontFamily } from "../../GlobalStyles";
import LottieView from 'lottie-react-native';

export default function AlertNotification({ img, title, value, onPress, isVisible = false, isPress = false, onPress2, txtBtn1 = 'Mình đã hiểu', txtBtn2 = 'Thử sức lại', height = hp(40) }) {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }} >
                <View style={{
                    backgroundColor: 'white', padding: 20, borderRadius: 10, width: wp(80),
                    height: height,
                    alignItems: 'center',
                    justifyContent: 'center'

                }}>
                    <View
                        style={{
                            position: 'absolute',
                            top: -hp(15),
                            alignSelf: 'center'
                        }}
                    >
                        <LottieView source={require('./../../assets/animationRobot.json')} autoPlay loop
                            style={{ width: wp(70), height: hp(20) }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontFamily: FontFamily.poppinsSemiBold,
                            fontSize: 23,
                            marginTop: 10,
                            color: Color.colorGray_100,
                            textAlign: 'center'
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
                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
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
                                }}>{txtBtn1}</Text>
                            </TouchableOpacity>
                            {/* Onpress 2 */}
                            {
                                isPress && <TouchableOpacity
                                    style={{
                                        width: wp(70),
                                        backgroundColor: Color.colorMediumslateblue,
                                        padding: 15,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        marginTop: 10
                                    }}
                                    onPress={onPress2}>
                                    <Text style={{
                                        color: Color.primaryWhite, fontSize: 20,
                                        fontFamily: FontFamily.mulishBold
                                    }}>{txtBtn2}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}