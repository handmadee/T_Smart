'use strict'

import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, ImageBackground, Text, Image, Platform, Pressable, ScrollView } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container } from '../../components/Container';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { Clock } from 'iconsax-react-native';
import { dataQuiz } from '../../data/data';
import { getCategoryQuiz } from '../../apis/trackingQuiz';
import LoadingView from '../Auth/LoadingScreen';



export default function SelectGames({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setLoading(true);
                const response = await getCategoryQuiz();
                setData(response?.data?.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchCategory();
    }, [])
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
            <Image source={{ uri: image }} style={{
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

    const handlerSelect = useCallback((id, image) => {
        return navigation.navigate('TopicSet', {
            data: { id, image }
        })
    })


    return (
        loading ? <LoadingView /> : <SafeAreaView style={{ flex: 1 }}>
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
                <View
                    style={{
                        width: wp(90),
                        height: hp(55),
                    }}
                >
                    <ScrollView
                        bounces={true}
                        showsVerticalScrollIndicator={true}
                    >
                        {
                            data.map((item, index) => (
                                <CardSelect
                                    key={index}
                                    image={item.imageCategory}
                                    title={item.nameCategory}
                                    onPress={() => handlerSelect(item._id, item.imageCategory)}
                                />
                            ))
                        }
                    </ScrollView>
                </View>


            </Container>

        </SafeAreaView >
    )
}

<Image source={{}} style={{
    width: wp(15),
    height: hp(10),
    resizeMode: 'contain',
}} />