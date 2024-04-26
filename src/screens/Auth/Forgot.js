import React, { useState } from 'react'
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Container } from '../../components/Container'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';
import { findUserByUserName } from '../../apis/authApi';
import LoadingView from './LoadingScreen';
import Toast from 'react-native-toast-message';


export const Forgot = ({ navigation }) => {
    const { t } = useTranslation();
    const [userName, setUserName] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const changeUserName = (text) => setUserName(text);
    const [loading, setLoading] = useState(false);


    const handlerForgot = async () => {
        if (userName === '') {
            setUsernameError('Tên đăng nhập không được bỏ trống');
            return;
        } else {
            try {
                setLoading(true);
                await findUserByUserName(userName);
                navigation.navigate('SetPass', { userName: userName });
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Cảnh báo',
                    text2: 'Tài khoản không tồn tại  👋'
                });
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
    }
    return (
        <SafeAreaView style={styles.contai}>
            <Container width={wp(90)} style={{ backgroundColor: Color.colorGhostwhite, paddingBottom: hp(20) }}>
                <Text style={styles.title}>
                    {t('forgotPass')}
                </Text>
                <Input show={false} label={'Your Email'} placeholder={'Username'} onChange={changeUserName} error={false} err={usernameError} value={userName} disable={false} />
                <Button title={'Continue'} onPress={handlerForgot} />
            </Container>
            <Toast topOffset={10} visibilityTime={2000}
                text1Style={{
                    fontWeight: 'bold',
                    fontSize: 14
                }}
                text2Style={{
                    fontWeight: 'bold',
                    fontSize: 14
                }}

            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    title: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_mini,
        lineHeight: 20,
        color: Color.colorDimgray_100,
        textAlign: 'center'
    },
    contai: { flex: 1, backgroundColor: Color.colorGhostwhite, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }
});

