import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { PlaySound } from '../../contanst/PlaySound';
import { useTranslation } from 'react-i18next';


const ResuftTest = ({ navigation, route }) => {

    const { total, score, coins, data } = route.params;
    useEffect(() => {
        PlaySound('victory.mp3');
    }, []);
    const { t } = useTranslation();
    const showAswer = () => {
        navigation.navigate('ShowAnswer', { data });
    };
    const handlerHome = () => {
        navigation.pop(2)
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { fontSize: 30, color: Color.colorOrangered, marginVertical: 10 }]}>{t("courseTest")}</Text>
            <View style={styles.content}>
                <Image style={styles.champion} source={require('./../../../assets/Champion.png')} />
                <Text style={[styles.answer, { fontSize: 22, marginVertical: 20 }]}>{
                    t("happy")
                }</Text>
                <Text style={[styles.answer, { fontSize: 18, textAlign: 'center', width: '80%' }]}>
                    {
                        t("congratulations")
                    }
                </Text>
                <Text style={[styles.title, { fontSize: 18, fontFamily: FontFamily.mulishExtraBold, width: '80%', textAlign: 'center', marginVertical: 15 }]}>
                    {
                        t("score")
                    }      </Text>
                <View style={styles.row}>
                    <Text style={[styles.score, { color: Color.colorOrangered }]}>{score}</Text>
                    <Text style={styles.score}> / {total}</Text>
                </View>
                <Text style={[styles.answer, { fontSize: 20, marginTop: 10 }]}>
                    {
                        t("point")
                    }
                </Text>
                <View style={[styles.row, { marginTop: 20 }]}>
                    <Text style={styles.coinAmount}>{coins * score}</Text>
                    <Image style={styles.coinImage} resizeMode='contain' source={require('./../../../assets/Coin.png')} />
                </View>
            </View>
            {/* Handler */}
            <View style={styles.ctnBtn}>
                <Pressable style={styles.btnContai} onPress={showAswer}>
                    <Text style={[
                        styles.answer, { color: '#141a46' }
                    ]}>
                        {
                            t("seeAnswer")
                        }
                    </Text>
                </Pressable>
                <Pressable style={[styles.btnContai, { backgroundColor: Color.globalApp }]} onPress={handlerHome}>
                    <Text style={[
                        styles.answer, { color: Color.primaryWhite }
                    ]}>
                        {
                            t("goBack")
                        }
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.colorGhostwhite,
        paddingTop: hp(5)
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
        width: wp(43),
        height: hp(8),
        backgroundColor: Color.colorOrangered,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ctnBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: wp(90), alignSelf: 'center' },
});

export default ResuftTest;
