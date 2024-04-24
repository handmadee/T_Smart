import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color } from "../../../GlobalStyles";
import { Container } from "../../components/Container";
import Input from "../../components/Input";
import { useForm, Controller } from "react-hook-form";
import Button from "../../components/Button";
import AlertNotification from '../../components/AlertNotification';
import { changePassword } from "../../apis/authApi";
import LoadingView from "./LoadingScreen";
import { useSelector } from "react-redux";
import Toast from 'react-native-toast-message';

const ChangePass = () => {
    const idUser = useSelector(state => state.authReducer?.authData?.id);
    const [loadding, SetLoadding] = useState(false);
    const { control, handleSubmit, watch, formState: { errors } } = useForm();
    const [isVisible, setIsVisible] = useState(false);
    const password = watch("newPass", "");
    const handlerIsVisible = useCallback(() => setIsVisible(!isVisible), [isVisible]);
    const onSubmit = async (data) => {
        try {
            SetLoadding(true);
            await changePassword({
                userId: idUser,
                oldPassword: data.currentPass,
                newPassword: data.newPass
            });
            return Alert.alert("Thành công", "Thay đổi mật khẩu thành công")
        } catch (error) {
            setIsVisible(true);
            console.log(error)
        } finally {
            SetLoadding(false)
        }
    }


    const renderInput = (name, placeholder, rules) => (
        <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <Input
                        show={true}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        onChange={value => onChange(value)}
                        value={value}
                        style={errors[name] && styles.errorInput}
                    />
                    {errors[name] && <Text style={styles.errorText}>{errors[name].message}</Text>}
                </>
            )}
            name={name}
            rules={rules}
            defaultValue=""
        />
    );
    return (
        loadding ? <LoadingView /> : <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorGhostwhite }}>
            <Container style={{
                width: wp(90),
                backgroundColor: Color.colorGhostwhite,
                marginTop: hp(5),
            }}>
                {renderInput("currentPass", "Current Password", { required: "Bạn không được để trống " })}
                {renderInput("newPass", "New Password", { required: "Vui lòng nhập mật khẩu mới", minLength: { value: 6, message: "Mật khẩu phải lớn hơn 6 kí tự" } })}
                {renderInput("confirmPass", "Confirm Password", { required: "Vui lòng nhập mật khẩu mới", validate: value => value === password || "Mật khẩu không trùng khớp" })}
                <Button title={"Thay đổi mật khẩu"} onPress={handleSubmit(onSubmit)} />
            </Container>
            {/* Cusstom Alert */}
            <AlertNotification isVisible={isVisible} title={"Chưa thay đổi được rồi!"} value={"Vui lòng nhập đúng mật khẩu cũ để tiến hành thay đổi mật khẩu mới"} onPress={handlerIsVisible} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
    },
});

export default ChangePass;