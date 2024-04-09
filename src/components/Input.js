/* eslint-disable prettier/prettier */
import React, { useCallback, useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Eye, EyeSlash, PasswordCheck, Google } from 'iconsax-react-native';
import { Color, FontFamily } from '../../GlobalStyles';
function Input(props) {
    const [isEye, setEye] = useState(props.show);
    const error = props.err || '';
    const isError = error.length > 0;
    const showEye = useCallback(() => {
        setEye(!isEye);
    }, [isEye]);
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
        marginTop: hp(1.7),
        borderRadius: 13,
        backgroundColor: Color.colorGhostwhite,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(3),
    },
});

export default Input;

