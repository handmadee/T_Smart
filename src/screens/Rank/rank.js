import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, Image, TextInput, FlatList, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { Container } from '../../components/Container';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';


export const Rank = () => {
    const infor = useSelector(state => state.authReducer?.authData?.infor);
    console.log(infor)
    return (
        <Container
            width={wp(97)}
            height={hp(85)}
            style={[styles.content]}
        >
            {/*  */}
            <View style={{
                position: 'absolute',
                width: '100%',
                height: hp(25),
                top: -hp(5),
                flexDirection: 'column',
                alignContent: 'center'
            }}>
                <Image source={{ uri: infor?.avatar }} style={{
                    width: wp(20),
                    height: wp(20),
                    alignSelf: 'center',
                    borderRadius: wp(20),
                    borderColor: Color.colorOrangered,
                    borderWidth: 1
                }} />
                <Text
                    style={{
                        fontFamily: FontFamily.jostBold,
                        fontSize: 25,
                        color: Color.colorBlack,
                        textAlign: 'center',
                        marginTop: hp(2)
                    }}>
                    {infor?.fullname}
                </Text>
            </View>
            {/*  */}
            <View style={[styles.CardView]}>
                <View style={[styles.item]}>
                    <Image source={require('./../../../assets/Poins.png')} />
                    <Text style={[styles.txtScorce]} >POINS</Text>
                    <Text
                        style={[styles.txtRank]}
                    >590</Text>
                </View>
                <View style={[styles.item]}>
                    <Image source={require('./../../../assets/localRanks.png')} />
                    <Text style={[styles.txtScorce]} >WORLD RANK</Text>
                    <Text
                        style={[styles.txtRank]}
                    >#1.428</Text>
                </View>

                <View style={[styles.item, {
                    borderRightWidth: 0
                }]}>
                    <Image source={require('./../../../assets/wordRank.png')} />
                    <Text style={[styles.txtScorce]} >LOCAL RANK</Text>
                    <Text
                        style={[styles.txtRank]}
                    >#34</Text>
                </View>


            </View>
            {/* DS */}
            <View style={[styles.Badge]}>
                <Image
                    source={require('./../../../assets/ShowRank.png')}
                    style={[styles.bgrImage]}
                    resizeMode='stretch'
                />
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            fontFamily: FontFamily.mulishBold,
                            fontSize: 20,
                            color: Color.colorGray_200,
                            marginTop: hp(4),
                            textAlign: 'center',
                            width: '80%',
                            letterSpacing: 1
                        }}
                    >
                        Bạn đã chơi tổng cộng
                        <Text style={{ color: Color.colorOrangered }}>   10 trò chơi  </Text>
                        trong tháng này!
                    </Text>
                    <Progress.Circle progress={.7}
                        size={160} borderWidth={10} borderColor={Color.colorGhostwhite} color={Color.globalApp} showsText={true} textStyle={{ color: Color.colorGray_200, fontSize: 20, fontFamily: FontFamily.mulishBold }
                        }
                        style={{ marginTop: 20, marginBottom: 20 }}
                    />

                    <View style={[styles.rowCard]}>
                        <View style={[styles.cardQuiz]}>
                            <Image source={require('./../../../assets/pen.png')}
                                style={{
                                    position: 'absolute',
                                    right: 15,
                                    top: 10
                                }}
                            />
                            <Text
                                style={{
                                    fontFamily: FontFamily.jostBold,
                                    fontSize: 20,
                                    color: Color.colorBlack
                                }}
                            >5</Text>
                            <Text
                                style={{
                                    fontFamily: FontFamily.mulishBold,
                                    fontSize: 18,
                                    color: Color.colorDimgray_200
                                }}
                            >Bài kiểm tra</Text>
                        </View>

                        <View style={[styles.cardQuiz, {
                            backgroundColor: Color.globalApp
                        }]}>
                            <Image source={require('./../../../assets/starDown.png')}
                                style={{
                                    position: 'absolute',
                                    right: 15,
                                    top: 10
                                }}
                            />
                            <Text
                                style={{
                                    fontFamily: FontFamily.jostBold,
                                    fontSize: 25,
                                    color: Color.primaryWhite
                                }}
                            >21</Text>
                            <Text
                                style={{
                                    fontFamily: FontFamily.mulishBold,
                                    fontSize: 18,
                                    color: Color.primaryWhite
                                }}
                            >Số Quiz Win</Text>
                        </View>
                    </View>

                </View>
            </View>
        </Container>
    )
}


const styles = {
    container: {
        flex: 1,
        backgroundColor: Color.globalApp,
        justifyContent: 'flex-end',

    },
    content: {
        backgroundColor: Color.colorGhostwhite,
        borderRadius: wp(5),
        height: hp(80)

    },
    CardView: {
        backgroundColor: Color.globalApp,
        width: '95%',
        height: hp(15),
        alignSelf: 'center',
        marginTop: hp(13),
        borderRadius: wp(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        elevation: 4
    },
    item: {
        flexDirection: "column",
        alignItems: 'center',
        alignContent: 'center',
        width: '30%',
        paddingRight: 10,
        borderRightWidth: .5,
        borderRightColor: Color.colorGhostwhite,
    },
    txtScorce: {
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.size_mini,
        color: Color.colorSilver_100,
        marginVertical: hp(1)
    },
    txtRank: {
        fontFamily: FontFamily.poppinsBold,
        fontSize: 20,
        color: Color.primaryWhite
    },
    Badge: {
        width: '95%',
        alignSelf: 'center',
        height: hp(50),
        borderRadius: 30,
        overflow: 'hidden',
        marginTop: hp(2),

    },
    bgrImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    rowCard: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-evenly',
    },
    cardQuiz: {
        width: '45%',
        height: hp(12),
        backgroundColor: Color.primaryWhite,
        padding: 20,
        borderRadius: 20
    },

}