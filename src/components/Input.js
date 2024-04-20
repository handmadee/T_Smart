/* eslint-disable prettier/prettier */
import React, { useCallback, useState } from 'react';
import { Text, View, TextInput, StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Eye, EyeSlash, PasswordCheck, Google } from 'iconsax-react-native';
import { Color, FontFamily } from '../../GlobalStyles';

// Tạo một custom hook để xử lý logic
function useInput(initialShow) {
    const [isEye, setEye] = useState(initialShow);
    const showEye = useCallback(() => {
        setEye(!isEye);
    }, [isEye]);

    return { isEye, showEye };
}

// Sử dụng custom hook trong component Input
function Input(props) {
    const { isEye, showEye } = useInput(props.show);
    const error = props.err || '';
    const isError = error.length > 0;

    return (
        <View>
            <View style={[styles.contaiInput, { borderColor: isError ? 'red' : '#333', borderWidth: isError ? 1 : 0 }]}>
                {
                    props.show ? <PasswordCheck size="22" color={Color.colorDimgray_200} style={{ marginRight: 10 }} /> : <Google size="22" color={Color.colorDimgray_200} style={{ marginRight: 10 }} />
                }

                <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={Color.colorGray_100}
                    style={[{ width: wp(70), color: Color.colorGray_100, fontFamily: FontFamily.mulishBold }]}
                    secureTextEntry={isEye}
                    onChangeText={props.onChange}
                    value={props.value || ''}
                />
                {
                    props.show ? (!isEye ? <EyeSlash color={props.icon} size={20} style={styles.eyeIcon} onPress={showEye} /> : <Eye color={props.icon} size={20} style={styles.eyeIcon} onPress={showEye} />) : ''
                }
            </View>
            {isError ? <Text style={{ marginVertical: 2, color: 'red' }}>{error}</Text> : <Text style={{ marginVertical: 2, color: 'red' }}></Text>}
        </View>
    );
}
const styles = StyleSheet.create({
    contaiInput: {
        width: wp(90),
        height: hp(7.5),
        marginTop: hp(1),
        borderRadius: 13,
        backgroundColor: Color.colorGhostwhite,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(3),
        ...Platform.select({
            ios: {
                shadowColor: Color.colorDimgray_200,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    eyeIcon: {
        color: Color.colorDimgray_200
    }
});

export default Input;

