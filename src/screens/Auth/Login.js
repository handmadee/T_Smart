import React from "react";
import { Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { Container } from "../../components/Container";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from "../../../GlobalStyles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { RowComponent } from "../../components/RowComponent";
import CheckButton from '../../contanst/checkbox';
import { useTranslation } from 'react-i18next';
import { login } from "../../apis/authApi";
import LoadingView from "./LoadingScreen";
import Modal2 from "../../components/Modal";
import { addAuth } from "../../redux/token/slice.token";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkInforUser } from "../../apis/courseApi";




export default function Login({ navigation }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const [check, setCheck] = React.useState(false);
    const [image, setImage] = React.useState('');
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const client = await login({
                username: data.userName,
                password: data.pass
            })
            console.log(client?.data.data.user_id)

            const infor = await checkInforUser(client?.data.data.user_id);


            console.log({
                infor: infor
            })

            const account = {
                id: client.data.data.user_id,
                accesstoken: client.data.data.accessToken,
                refreshtoken: client.data.data.refreshToken,
                infor: infor.data.data?.info
            }
            dispatch(addAuth(account));
            await AsyncStorage.setItem('auth',
                check ? JSON.stringify(account) : data.userName
            )
            navigation.navigate('HomeNav');
        } catch (error) {
            console.log(error)
            setIsVisible(true);
        } finally {
            setIsLoading(false);
        }
    };
    const handlerSignUp = () => navigation.navigate('SignUp');
    const handlerForgot = () => navigation.navigate('Forgot');
    const handlerCheck = () => setCheck(!check);

    return (
        isLoading ? <LoadingView /> : (
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.primaryWhite }}>
                <KeyboardAvoidingView>
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
                            {t('letSign')}
                        </Text>
                        <Text style={styles.detail}>
                            {t('login')}
                        </Text>
                        {/*  */}
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <Input
                                    show={false}
                                    label={'Your Email'}
                                    placeholder={'Username'}
                                    onChange={(text) => {
                                        setValue('userName', text);
                                        field.onChange(text);
                                    }}
                                    value={field.value}
                                    error={errors.userName ? true : false}
                                    err={errors.userName ? errors.userName.message : ''}
                                    disable={false}
                                />
                            )}
                            name="userName"
                            rules={{ required: "Username không được để trống", pattern: { value: /^\S+@\S+$/i, message: "Vui lòng nhập đúng định dạng email" } }}
                        />

                        <Controller
                            control={control}
                            render={({ field }) => (
                                <Input
                                    show={true}
                                    label={'Password'}
                                    placeholder={'password'}
                                    onChange={(text) => {
                                        setValue('pass', text);
                                        field.onChange(text);
                                    }}
                                    value={field.value}
                                    error={errors.pass ? true : false}
                                    styInput={{ backgroundColor: Color.colorGhostwhite, color: Color.colorDimgray_200 }}
                                    icon={Color.colorDimgray_200}
                                    err={errors.pass ? errors.pass.message : ''}
                                />
                            )}
                            name="pass"
                            rules={{ required: "Mật khẩu không được để trống", minLength: { value: 6, message: "Mật khẩu phải từ 6 kí tự trở lên" } }}
                        />

                        {/* Remember */}
                        <RowComponent padding={0} width={wp(90)} style={{ justifyContent: 'space-between', marginVertical: hp(1) }}>
                            <View style={styles.ctRemember}>
                                <CheckButton borderColor={Color.globalApp} status={check} handlePress={handlerCheck} />
                                <Text style={styles.Remember}>{t('remember')}</Text>
                            </View>
                            <Text style={styles.Remember}
                                onPress={handlerForgot}
                            >{t('forgot')}</Text>
                        </RowComponent>

                        {/* Button */}
                        <Button title={t('Signin')} onPress={handleSubmit(onSubmit)} />
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
                            onPress={handlerSignUp}
                        >SIGN UP</Text></Text>
                    </Container>
                    <Modal2 img={
                        require('./../../../assets/Logo.png')
                    }
                        title={'Đăng nhập thất bại'}
                        value={'Vui lòng kiểm tra lại thông tin đăng nhập'}
                        isVisible={isVisible}
                        onPress={() => setIsVisible(!isVisible)}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView >
        )


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
        width: wp(35),
    },
    Remember: {
        fontFamily: FontFamily.mulishExtraBold,
        fontSize: FontSize.size_smi,
        color: Color.colorGray_100,
        marginLeft: wp(3)
    }
})
