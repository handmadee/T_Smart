import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Container } from '../../components/Container';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { Search } from '../../contanst/search';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';


const CartificateCourse = ({ navigation, route }) => {
    const { title, date } = route.params.course;
    const { fullname } = useSelector(state => state.authReducer?.authData?.infor);

    const Cartificate = React.memo(({ name = '', language = '', date = '16/3/2024', id = 'MD18302' }) => {
        const fullName = name && name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
        const FullLanguage = language && language.trim().toUpperCase();
        return (
            <ImageBackground source={require('./../../../assets/CERTIFICATE.png')} resizeMode='cover' style={[styles.catificate]}>
                <Text style={[styles.name]}>{fullName}</Text>
                {/* Catirficate Languge */}
                <View style={[styles.language]}>
                    <Text style={[styles.nameLanguage]}>{FullLanguage}</Text>
                    <Text style={[styles.dateLanguage]}>Issued on {date}</Text>
                    <Text style={[styles.idLanguage]}>ID: {id} </Text>
                </View>
            </ImageBackground>
        )
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorGhostwhite }}>
            <Container style={styles.content}>
                {/* Search */}
                <Search placeholder='3D Design Illustration' />
                {/* Content */}
                <Container style={[styles.container]} >
                    <Cartificate name={fullname} language={title} date={date} />
                    <Button title={'Download Certificate'} />
                </Container>
            </Container>
        </SafeAreaView>

    );
};

const shadowStyle = {
    shadowColor: '#c5c0c0',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: wp(85),
        backgroundColor: Color.colorGhostwhite,
    },
    container: {
        width: wp(85),
        backgroundColor: Color.colorGhostwhite,

    },
    catificate: {
        width: wp(85),
        height: hp(65),
        borderWidth: 2,
        borderRadius: 12,
        overflow: 'hidden',
        borderColor: Color.colorAliceblue,
        ...shadowStyle,
    },
    name: {
        fontFamily: FontFamily.mulishExtraBold,
        fontSize: FontSize.size_xl,
        color: '#332DA1',
        textAlign: 'center',
        top: hp(20.6),
        lineHeight: 35
    },
    language: {
        width: '70%',
        alignSelf: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        top: '44%'
    },
    nameLanguage: {
        fontFamily: FontFamily.mulishExtraBold,
        fontSize: FontSize.buttonMedium_size,
        color: Color.colorGray_100,
        textAlign: 'center',
        letterSpacing: 1
    },
    dateLanguage: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorDimgray_100,
        lineHeight: 18,
        marginVertical: 10
    },
    idLanguage: {
        fontFamily: FontFamily.mulishExtraBold,
        fontSize: FontSize.size_smi,
        color: '#472D2D',
        lineHeight: 18
    },





});

export default CartificateCourse;
