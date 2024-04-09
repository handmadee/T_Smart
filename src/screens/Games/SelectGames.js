'use strict'

import React, { useCallback } from 'react'
import { View, StyleSheet, SafeAreaView, ImageBackground, Text, Image, Platform, Pressable } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container } from '../../components/Container';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { Clock } from 'iconsax-react-native';
import { dataQuiz } from '../../data/data';


export default function SelectGames({ navigation }) {
    const quiz = require('./../../../assets/QUIZTEST.png');
    const python = require('./../../../assets/python.png');
    const java = require('./../../../assets/java.png');


    const CardSelect = React.memo(({ image, title, onPress }) => (
        <Pressable
            style={{
                backgroundColor: Color.primaryWhite,
                elevation: 5,
                marginBottom: 30,
                ...(Platform.OS !== 'android' && {
                    shadowColor: Color.primaryBlack,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.4,
                    shadowRadius: 2,
                }),
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 20,
                paddingHorizontal: 10,
                borderRadius: 20,
            }}
            onPress={onPress}
        >
            <Image source={image} style={{
                width: wp(25),
                height: hp(10),
                resizeMode: 'contain'
            }}

            />
            <Text style={{
                color: Color.colorGray_100,
                fontFamily: FontFamily.poppinsSemiBold,
                fontSize: 22,
                textAlign: 'center',
                marginTop: 10,
                marginLeft: 20
            }}>{title}</Text>
        </Pressable>
    ), []);

    const handlerSelect = useCallback(() => {
        return navigation.navigate('TopicSet', {
            data: dataQuiz
        })
    })


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('./../../../assets/bgrQuiz.png')}
                style={{
                    width: wp(100),
                    height: hp(95),
                    position: 'absolute',
                    top: 0
                }}
            />
            <Container
                width={wp(85)}
                height={hp(80)}
                style={{
                    zIndex: 1,
                    backgroundColor: 'transparent',
                    marginTop: hp(35)
                }}
            >
                <CardSelect image={quiz} title={'Bộ để kiểm tra'}
                    onPress={() => ''}
                />
                <CardSelect image={python} title={'Python'}
                    onPress={handlerSelect}
                />
                <CardSelect image={java} title={'Java'}
                    onPress={() => ''}
                />

            </Container>

        </SafeAreaView>
    )
}

