import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Container } from '../../components/Container'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import Input from '../../components/Input';
import { useState } from 'react';
import Button from '../../components/Button';

export const Forgot = () => {
    const [userName, setUserName] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const changeUserName = (text) => setUserName(text);
    return (
        <SafeAreaView style={styles.contai}>
            <Container width={wp(90)} style={{ backgroundColor: Color.colorGhostwhite, paddingBottom: hp(20) }}>
                <Text style={styles.title}>
                    Select which contact details should we use to Reset Your Password
                </Text>
                <Input show={false} label={'Your Email'} placeholder={'Username'} onChange={changeUserName} error={false} err={usernameError} value={userName} disable={false} />
                <Button title={'Continue'} onPress={() => { }} />
            </Container>
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

