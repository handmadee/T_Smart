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


export const SetPass = () => {
    const [pass, SetPass] = useState('');
    const [rpPass, SetRpPass] = useState('');
    const [passErr, setPassError] = useState('');
    const [rpPassErr, setRpPasssErr] = useState('');

    return (
        <SafeAreaView style={styles.contai}>
            <Container width={wp(90)} style={{ backgroundColor: Color.colorGhostwhite, paddingBottom: hp(20) }}>
                <Text style={styles.title}>
                    Create Your New Password                </Text>
                <Input show={true} label={'Password'} placeholder={'password'} onChange={(text) => SetPass(text)} error={false} styInput={{ backgroundColor: Color.colorGhostwhite, color: Color.colorDimgray_200 }} icon={Color.colorDimgray_200} err={passErr} value={pass} />
                {/* Pass Repeat */}
                <Input show={true} label={'Password'} placeholder={'password'} onChange={(text) => SetRpPass(text)} error={false} styInput={{ backgroundColor: Color.colorGhostwhite, color: Color.colorDimgray_200 }} icon={Color.colorDimgray_200} err={passErr} value={rpPass} />
                {/* Button */}
                <Button title={'Continue'} onPress={() => { }} />
            </Container>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    title: {
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.size_lgi,
        lineHeight: 20,
        color: Color.colorGray_100,
        textAlign: 'left'
    },
    contai: { flex: 1, backgroundColor: Color.colorGhostwhite, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }
});

