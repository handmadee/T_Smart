'use strict'
import React from 'react'
import { View, Text, Pressable, StyleSheet, ImageBackground, Image, SafeAreaView, Platform } from 'react-native'
import { Color, FontFamily, FontSize } from '../../../GlobalStyles'
import { Container } from '../../components/Container'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RowComponent } from '../../components/RowComponent'
import { MoneySend } from 'iconsax-react-native'



const img = require('./../../../assets/User.png');
export default function HightScores() {
    const dummyData = [
        { id: 1, img: img, top: 1, name: 'John Doe', score: 3998 },
        { id: 2, img: img, top: 2, name: 'Jane Smith', score: 3899 },
        { id: 3, img: img, top: 3, name: 'Alice Johnson', score: 3800 },
        // Add more dummy data as needed
    ];


    const CircleDot = ({ img, top, name, score }) => (
        <View style={styles.circle} >
            <Image source={require('./../../../assets/User.png')} style={[styles.img]} />
            <View style={[styles.dot]}>
                <Text style={[styles.txtDot]}>1</Text>
            </View>
        </View>
    )

    const RenderPlayer = React.memo(({ img, top, name, score }) => (
        <RowComponent style={styles.top5}>
            <View style={styles.rowC}>
                <Text style={styles.txtName}>{top}</Text>
                <Image source={img} style={styles.userImage} />
                <Text style={styles.point}>{name}</Text>
            </View>
            <View style={styles.rowC}>
                <Text style={[styles.txtName, { marginRight: 20 }]}>{score}</Text>
                <MoneySend size="16" variant="Bold" color="#FFD912" />
            </View>
        </RowComponent>
    ));

    return (
        <SafeAreaView style={styles.home}>
            <Container style={[styles.container]}>
                {/* Header */}
                <View style={{ marginTop: 30 }}>
                    <Text style={[styles.txtDot, { fontSize: 25, alignSelf: 'center' }]}>Bảng Xếp Hạng Thi Đua</Text>
                    <View style={{ width: wp(95), flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={[styles.circle, styles.top2]} >
                            <Image source={require('./../../../assets/User.png')} style={[styles.img]} />
                            <View style={[styles.dot, { backgroundColor: '#004643' }]}>
                                <Text style={[styles.txtDot]}>2</Text>
                            </View>
                            <View style={{ marginTop: 25, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={[styles.point]}>John Doe</Text>
                                <View style={[styles.rowC]}>
                                    <Text style={[styles.txtName, { marginRight: 10 }]}>3998</Text>
                                    <MoneySend size="16" variant="Bold" color="#FFD912" />
                                </View>
                            </View>
                        </View>
                        <View style={styles.circle} >
                            <Image source={require('./../../../assets/User.png')} style={[styles.img]} />
                            <View style={[styles.dot]}>
                                <Text style={[styles.txtDot]}>1</Text>
                            </View>
                            <View style={{ marginTop: 25, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={[styles.point]}>John Doe</Text>
                                <View style={[styles.rowC]}>
                                    <Text style={[styles.txtName, { marginRight: 10 }]}>3998</Text>
                                    <MoneySend size="16" variant="Bold" color="#FFD912" />
                                </View>
                            </View>
                        </View>
                        <View style={[styles.circle, styles.top2]} >
                            <Image source={require('./../../../assets/User.png')} style={[styles.img]} />
                            <View style={[styles.dot, { backgroundColor: '#004643' }]}>
                                <Text style={[styles.txtDot]}>3</Text>
                            </View>
                            <View style={{ marginTop: 25, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={[styles.point]}>John Doe</Text>
                                <View style={[styles.rowC]}>
                                    <Text style={[styles.txtName, { marginRight: 10 }]}>3998</Text>
                                    <MoneySend size="16" variant="Bold" color="#FFD912" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {/* Header */}
                <View style={{ width: wp(95), marginTop: hp(18) }}>
                    {dummyData.map((item, index) => (
                        <RenderPlayer key={index} img={item.img} top={item.top} name={item.name} score={item.score} />
                    ))}
                </View>
            </Container>
            {/* Top 3 */}
            <Image source={require('./../../../assets/hightScore.png')} style={[styles.backImg]} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: Color.colorGhostwhite
    },
    container: {
        width: wp(95),
        zIndex: 1,
        backgroundColor: 'transparent',
    },
    backImg: {
        position: 'absolute',
        width: '100%',
        height: hp(55),
        top: -hp(10),
    },
    circle: {
        width: wp(25),
        height: wp(25),
        borderRadius: 50,
        borderColor: '#FFD912',
        borderWidth: 7,
        alignSelf: 'center',
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    dot: {
        width: wp(8),
        height: wp(8),
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFD912',
        alignSelf: 'center',
        position: 'absolute',
        bottom: -wp(5),
    },
    txtDot: {
        color: Color.primaryWhite,
        fontSize: 20,
        fontFamily: 'Mulish-Bold',
    },
    txtName: {
        fontFamily: 'Mulish-Bold',
        fontSize: FontSize.size_mini,
        color: Color.colorGray_100,
        textAlign: 'center',

    },
    rowC: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    point: {
        fontFamily: FontFamily.poppinsBold,
        fontSize: FontSize.buttonMedium_size,
        color: Color.colorGray_100,
        textAlign: 'center',
    },
    top2: {
        marginTop: hp(5),
        borderColor: '#004643'
    },
    top5: {
        justifyContent: 'space-between',
        width: wp(95), backgroundColor: Color.primaryWhite,
        borderRadius: 20,
        marginBottom: hp(2),
        elevation: 4,
        ...(Platform.OS !== 'android' && {
            shadowColor: Color.colorGray_200,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
        }),
    },
    userImage: {
        width: wp(10),
        height: wp(10),
        borderRadius: 50,
        marginHorizontal: 20
    }

});