import React, { useCallback, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import LottieView from 'lottie-react-native';
import { PlaySound } from '../../contanst/PlaySound';
import { useNavigation, useRoute } from '@react-navigation/native';



const ResuftQuiz = ({ mark = 10 }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id,
        quizData,
        score,
        total
    } = route.params?.data;
    useEffect(() => {
        PlaySound('victory.mp3');
    }, []);
    const myScore = score;
    const showAswer = useCallback(() => {
        navigation.navigate('viewAnswer', {
            data: quizData
        });
    });
    const handlerHome = useCallback(() => {
        navigation.navigate('SelectGames');
    })
    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: Color.primaryWhite,
                width: wp(90),
                borderRadius: 20,
                paddingVertical: 20,
                paddingHorizontal: 20,
                paddingTop: hp(10),
                elevation: 5,
            }}>
                <View style={styles.content}>
                    <View style={{
                        position: 'absolute',
                        top: -hp(22),
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Image style={styles.champion} source={require('./../../../assets/appreciation.png')} />
                        <LottieView source={require('../../../assets/AnimationWin.json')} autoPlay loop
                            style={{ width: 350, height: 250, position: 'absolute', top: -hp(4), right: -20 }}
                        />
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 30,
                                color: Color.globalApp,
                                fontFamily: FontFamily.mulishExtraBold,
                                marginTop: hp(2),
                            }}
                        >GOOD JOB</Text>
                    </View>
                    <Text style={[styles.answer, { fontSize: 20, marginTop: 10 }]}>Chúc mừng bạn đã hoàn thành bài thi</Text>
                    <Text style={[styles.title, { fontSize: 18, fontFamily: FontFamily.mulishExtraBold, width: '80%', textAlign: 'center', marginTop: 10, marginBottom: 0 }]}>
                        Your Score
                    </Text>
                    <Text style={styles.score}> {myScore}</Text>
                    <View style={[styles.item]}>
                        <View style={[styles.itemQuestion]}>
                            <Text
                                style={[styles.txtItem]}
                            >{total}</Text>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 18,
                                }}
                            >Câu hỏi</Text>
                        </View>
                        <View style={[styles.itemQuestion, {
                            backgroundColor: '#01c819'
                        }]}>
                            <Text
                                style={[styles.txtItem]}
                            >
                                {score}
                            </Text>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 18,
                                }}
                            >Chính xác</Text>
                        </View>
                        <View style={[styles.itemQuestion,
                        {
                            backgroundColor: '#f50101'
                        }
                        ]}>
                            <Text
                                style={[styles.txtItem]}
                            >{total - score}</Text>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 18,
                                }}
                            >Câu Sai</Text>
                        </View>
                    </View>
                </View>
                {/* Handler */}
                <View style={styles.ctnBtn}>
                    <Pressable style={styles.btnContai} onPress={showAswer}>
                        <Text style={styles.answer}>Xem lại đáp án</Text>
                    </Pressable>
                    <Pressable style={[styles.btnContai, { backgroundColor: Color.globalApp }]} onPress={handlerHome}>
                        <Text style={styles.answer}>Làm lại bài mới</Text>
                    </Pressable>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: Color.globalApp,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    champion: {
        width: wp(30),
        height: hp(15),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: '#3C3A36',
        fontSize: FontSize.headingH4_size,
        fontFamily: FontFamily.mulishBold,
        textAlign: 'center',
        marginBottom: 10,
    },
    answer: {
        color: Color.colorGraySilver,
        fontSize: FontSize.buttonMedium_size,
        fontFamily: FontFamily.mulishBold,
        textAlign: 'center',
    },
    score: {
        fontSize: 50,
        fontFamily: FontFamily.jostBold,
        color: Color.colorGray_100,
    },
    coinAmount: {
        fontSize: 20,
        fontFamily: FontFamily.mulishBold,
        marginRight: 10,
    },
    coinImage: {
        width: wp(10),
        height: hp(4),
    },
    btnContai: {
        marginTop: hp(3),
        width: wp(40),
        height: hp(8),
        backgroundColor: Color.colorOrangered,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ctnBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: wp(90), alignSelf: 'center' },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: hp(2)
    },
    itemQuestion: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#8197b2',
        padding: 15,
        borderRadius: 10
    },
    txtItem: {
        color: '#fff',
        fontSize: 20,
        fontFamily: FontFamily.mulishBold,
    },


});

export default ResuftQuiz;
