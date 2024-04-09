/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
'use strict'

import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { Container } from "../../components/Container"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from "../../../GlobalStyles";
import Input from "../../components/Input";
import { useCallback, useState } from "react";
import Button from "../../components/Button";
import { RowComponent } from "../../components/RowComponent";
import CheckButton from '../../contanst/checkbox';
import { useTranslation } from 'react-i18next';


export default function SignUp({ navigation }) {
    const { t } = useTranslation();
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const changeUserName = (text) => setUserName(text);
    const changePass = (text) => setPass(text);
    //  Handler checkbox 
    const [check, setCheck] = useState(false);
    const handleCheck = useCallback(() => setCheck(!check), [check]);

    const handlerSignIn = useCallback(() => navigation.navigate('Login'), [navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.primaryWhite }}>
            <Container width={wp(90)}>
                {/* Logo */}
                <View style={{ alignSelf: 'center' }}>
                    <Image
                        source={require('./../../../assets/Logo.png')}
                        style={{ width: wp(65), height: hp(23) }}
                    />
                </View>
                {/* Getting */}
                <Text style={styles.title}>
                    {t('getting')}
                </Text>
                <Text style={styles.detail}>
                    {t('create')}
                </Text>
                {/*  */}
                <Input show={false} label={'Your Email'} placeholder={'Username'} onChange={changeUserName} error={false} err={usernameError} value={userName} disable={false} />
                {/*  */}
                <Input show={true} label={'Password'} placeholder={'password'} onChange={changePass} error={false} styInput={{ backgroundColor: Color.colorGhostwhite, color: Color.colorDimgray_200 }} icon={Color.colorDimgray_200} err={passwordError} value={pass} />
                {/* Remember */}
                <View style={styles.ctRemember}>
                    <CheckButton borderColor={Color.globalApp} status={check} handlePress={handleCheck} style={styles.checkBtn} />
                    <Text style={styles.Remember}>{t("agree")}</Text>
                </View>
                {/* Button */}
                <Button title={t('signup')} onPress={() => { }} />
                {/* Or */}
                <Text style={styles.or}>{t('or')}</Text>
                <RowComponent width={wp(40)} style={{ alignSelf: 'center' }} >
                    <Image source={require('./../../../assets/google.png')} style={{ width: wp(15), height: hp(5) }} />
                    <View style={{ width: wp(5) }} />
                    <Image source={require('./../../../assets/apple.png')} style={{ width: wp(15), height: hp(5) }} />
                </RowComponent>
                {/* Login */}
                <Text style={styles.or}> Don’t have an Account? <Text
                    style={{ color: Color.colorMediumslateblue, textDecorationLine: 'underline' }}
                    onPress={handlerSignIn}
                >SIGN IN</Text></Text>
            </Container>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:
            'column',
        alignItems: 'center',
        paddingVertical: hp(5)
    },
    title: {
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.headingH4_size,
        color: Color.colorGray_100,
        letterSpacing: 0.2,

    },
    detail: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_mini,
        color: Color.colorDimgray_100,
        letterSpacing: 0.2,
        lineHeight: 30
    },
    or: {
        fontFamily: FontFamily.mulishExtraBold,
        fontSize: FontSize.size_mini,
        color: Color.colorGray_100,
        textAlign: 'center'
    },
    ctRemember: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp(60),
        marginVertical: hp(1)
    },
    Remember: {
        fontFamily: FontFamily.mulishExtraBold,
        fontSize: FontSize.size_smi,
        color: Color.colorGray_100,
        marginLeft: wp(3)
    },
    checkBtn: {
        borderRadius: 50,
        borderWidth: 3,
    }
})