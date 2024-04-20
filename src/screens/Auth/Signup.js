import React from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { Container } from "../../components/Container";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from "../../../GlobalStyles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import CheckButton from '../../contanst/checkbox';
import { useTranslation } from 'react-i18next';
import Modal2 from "../../components/Modal";
import LoadingView from "./LoadingScreen";
import { register } from "../../apis/authApi";
import { addAuth } from "../../redux/token/slice.token";
import { useDispatch, useSelector } from "react-redux";
import { checkInforUser } from "../../apis/courseApi";



export default function SignUp({ navigation }) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { control, handleSubmit, formState: { errors }, getValues } = useForm();
    const [isVisible, setIsVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const client = await register({ username: data.userName, password: data.pass });
            const account = {
                id: client.message.data.user_id,
                accesstoken: client.message.data.accessToken,
                refreshtoken: client.message.data.refreshToken,
                infor: null
            }
            dispatch(addAuth(account));
            await AsyncStorage.setItem('auth',
                check ? JSON.stringify(account) : data.userName
            )
            navigation.navigate('');
        } catch (error) {
            console.log(error)
            setIsVisible(true);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        isLoading ? <LoadingView /> : (
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.primaryWhite }}>
                <Container width={wp(90)}>
                    <View style={{ alignSelf: 'center' }}>
                        <Image
                            source={require('./../../../assets/Logo.png')}
                            style={{ width: wp(65), height: hp(23) }}
                        />
                    </View>
                    <Text style={styles.title}>{t('getting')}</Text>
                    <Text style={styles.detail}>{t('create')}</Text>




                    <Controller
                        control={control}
                        render={({ field }) => (
                            <Input
                                show={false}
                                label={'Your Email'}
                                placeholder={'Username'}
                                onChange={field.onChange}
                                value={field.value}
                                error={errors.userName ? true : false}
                                err={errors.userName ? errors.userName.message : ''}
                                disable={false}
                            />
                        )}
                        name="userName"
                        rules={{ required: "Username không được để trống", pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Vui lòng nhập đúng định dạng email" } }}
                    />

                    <Controller
                        control={control}
                        render={({ field }) => (
                            <Input
                                show={true}
                                label={'Password'}
                                placeholder={'password'}
                                onChange={field.onChange}
                                value={field.value}
                                error={errors.pass ? true : false}
                                err={errors.pass ? errors.pass.message : ''}
                            />
                        )}
                        name="pass"
                        rules={{ required: "Mật khẩu không được để trống", minLength: { value: 6, message: "Mật khẩu phải từ 6 kí tự trở lên" } }}
                    />

                    <Controller
                        control={control}
                        render={({ field }) => (
                            <Input
                                show={true}
                                label={'Password'}
                                placeholder={'Enter the password'}
                                onChange={field.onChange}
                                value={field.value}
                                error={errors.rpPass ? true : false}
                                err={errors.rpPass ? errors.rpPass.message : ''}
                            />
                        )}
                        name="rpPass"
                        rules={{ required: "Mật khẩu nhập lại không được để trống", validate: value => value === getValues('pass') || "Mật khẩu không trùng khớp" }}
                    />



                    <View style={styles.ctRemember}>
                        <CheckButton borderColor={Color.globalApp} handlePress={() => { }} style={styles.checkBtn} status={true} />
                        <Text style={styles.Remember}>{t("agree")}</Text>
                    </View >

                    {errors.agreeError && <Text style={{ color: 'red', marginBottom: 10 }}>{errors.agreeError.message}</Text>}

                    <Button title={t('signup')} onPress={handleSubmit(onSubmit)} />

                    <Text style={styles.or}>{t('or')}</Text>

                    <Text style={styles.or}> Don’t have an Account? <Text
                        style={{ color: Color.colorMediumslateblue, textDecorationLine: 'underline' }}
                        onPress={() => navigation.navigate('Login')}
                    >SIGN IN</Text></Text>
                </Container >
                <Modal2 img={
                    require('./../../../assets/Logo.png')
                }
                    title={'Đăng kí thất bại'}
                    value={'Email đã tồn tại vui lòng nhập email khác'}
                    isVisible={isVisible}
                    onPress={() => setIsVisible(!isVisible)}
                />
            </SafeAreaView >
        )
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
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
    },
    input: { backgroundColor: Color.colorGhostwhite, color: Color.colorDimgray_200 },
})
