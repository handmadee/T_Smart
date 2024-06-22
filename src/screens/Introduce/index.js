import React from "react";
import { Image, StyleSheet, Text, View, Linking, Pressable, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Color, FontFamily, FontSize } from "../../../GlobalStyles";
import { Location, Headphone, Box1 } from "iconsax-react-native";
import { useTranslation } from "react-i18next";


export default function Introduce({ navigation }) {
    const { t } = useTranslation();
    const Maps = 'https://www.google.com/maps/place/TSmart/@16.0793408,108.1566794,17z/data=!3m1!4b1!4m6!3m5!1s0x3142199c300204d1:0x8e713512d88fb452!8m2!3d16.0793408!4d108.1592543!16s%2Fg%2F11vctdv37t?hl=vi-VN&entry=ttu'
    const handlerPhone = () => {
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:0868552445';
        } else {
            phoneNumber = 'tel:0868552445';
        }

        Linking.openURL(phoneNumber);
    }



    const handlerMap = () => {
        Linking.openURL(Maps);
    }


    return (
        <View style={[styles.container]}>
            <View style={[styles.header]}>
                <Image
                    source={require('./../../../assets/Logo.png')}
                    style={[styles.logo]}
                />
                <Text style={styles.title}>
                    {t('tsmart')}
                </Text>
            </View>
            {/* Bottom */}
            <View style={[styles.bottom]}>
                {/* Contact */}
                <View style={[styles.contact]}>
                    <Pressable style={[styles.item]} onPress={handlerPhone}>
                        <Headphone
                            variant="Bold"
                            size="32" color={Color.globalApp} />
                        <View style={{
                            width: '100%',
                            marginLeft: wp(4)
                        }}>
                            <Text style={[styles.txtContact]}>Liên hệ</Text>
                            <Text style={[
                                styles.hotline
                            ]}>    {t('hotline')}: 0868 552 445</Text>
                        </View>
                    </Pressable>
                    <Pressable style={[styles.item]}
                        onPress={handlerMap}
                    >
                        <Location
                            variant="Bold"
                            size="32" color={Color.globalApp} />
                        <View style={{
                            marginLeft: wp(4)
                        }}>
                            <Text style={[styles.txtContact]}>  {t('localtion')}</Text>
                            <Text style={[styles.hotline]}>
                                34 Lương Khánh Thiện - Liên Chiểu - Đà Nẵng
                            </Text>
                        </View>
                    </Pressable>
                </View>
                {/*Content*/}
                {/* Popup */}
                <View style={[styles.contentText]}>
                    <View style={[
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                        }
                    ]}>
                        <Box1
                            style={[styles.lineHeading]}
                            size="32" color="#FF8A65" variant="Bold" />
                        <Text
                            style={{
                                fontSize: FontSize.size_mid,
                                fontFamily: FontFamily.mulishBold,
                                color: Color.colorOrangered,
                                marginLeft: wp(2)

                            }}
                        >{t('tsmart1')}</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: FontSize.size_mid,
                                fontFamily: FontFamily.mulishRegular,
                                color: Color.colorDimgray_100,
                                lineHeight: 25,
                                marginTop: hp(2)

                            }}
                        >
                            {t('tsmart2')}
                        </Text>
                    </View>

                </View>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.globalApp,
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: wp(30),
        height: wp(30),
        borderRadius: wp(15),
    },
    title: {
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.mulishBold,
        color: Color.primaryWhite,
        textAlign: 'center',
        marginTop: hp(2)
    },
    header: {
        paddingVertical: hp(4),
        alignItems: 'center',

    },
    content: {
        marginTop: hp(22),
        width: wp(90),
        alignSelf: 'center'

    },
    bottom: {
        height: Platform.OS === 'android' ? hp(55) : hp(48),
        width: wp(100),
        backgroundColor: Color.primaryWhite,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    contact: {
        width: wp(90),
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top: -hp(7),
        zIndex: 99
    },
    item: {
        width: wp(90),
        flexDirection: 'row',
        alignItems: 'center',
        padding: hp(2),
        backgroundColor: Color.primaryWhite,
        elevation: 5,
        ...Platform.OS !== 'android' && {
            shadowColor: Color.primaryBlack,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        borderRadius: 10,
        marginVertical: hp(1),
    },
    hotline: {
        fontSize: 16,
        fontFamily: FontFamily.mulishRegular,
        color: Color.primaryBlack,
        width: '80%',
        lineHeight: 25,
        flexWrap: 'nowrap',

    },
    txtContact: { fontSize: 20, fontFamily: FontFamily.mulishBold, color: Color.primaryBlack },
    contentText: {
        backgroundColor: '#ffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: hp(32),
        elevation: 5,
        ...Platform.OS !== 'android' && {
            shadowColor: Color.primaryBlack,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            height: hp(28),
        },
        padding: wp(5),
        ...Platform.OS !== 'android' && {
            paddingBottom: hp(2),
        },
        position: 'absolute',
        zIndex: 99,
        bottom: 0,
        left: 0,
        right: 0,
    },
    contai: {
        width: wp(90),
        alignSelf: 'center',
    },
    lineHeading: {
        borderTopColor: Color.colorOrangered,
        borderTopWidth: wp(2),
    },
    welcome: {
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.mulishExtraBold,
        color: Color.globalApp,
        alignItems: 'center',
        lineHeight: 30,
        textAlign: 'center',
        textTransform: 'uppercase'
    }
});