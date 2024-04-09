'use strict'

import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, ImageBackground, Text, Image, Platform, Pressable, FlatList } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container } from '../../components/Container';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { Clock } from 'iconsax-react-native';
import DropDownPicker from 'react-native-dropdown-picker';


export default function TopicSet({ navigation, route }) {
    const initialData = route.params.data;
    const [data, setData] = useState(initialData);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('all');
    const [items, setItems] = useState([
        { label: 'Khó', value: 'hight' },
        { label: 'Trung Bình ', value: 'medium' },
        { label: 'Dễ ', value: 'low' },
    ]);

    useEffect(() => {
        const data1 = value == 'all' ?
            initialData : initialData.filter((item) => item.level === value);
        setData(data1);
    }, [value])
    const quiz = require('./../../../assets/QUIZTEST.png');
    const python = require('./../../../assets/python.png');
    const java = require('./../../../assets/java.png');


    const CartAsm = React.memo(({ image, title, time, level = 'low', data = [] }) => {
        return (
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
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    borderRadius: 10,
                }}
                onPress={() => handlerQuizTest(data)}
            >
                <Image source={image} style={{
                    width: wp(25),
                    height: hp(5),
                    resizeMode: 'contain'
                }}

                />
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}
                >
                    <Text style={{
                        color: Color.colorOrangered,
                        fontFamily: FontFamily.poppinsSemiBold,
                        fontSize: 13,
                        textAlign: 'center',
                        width: '100%'
                    }}>{title}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Clock color={Color.colorGray_100} size={13} />
                        <Text
                            style={{
                                fontFamily: FontFamily.mulishBold,
                                fontSize: FontSize.size_mini,
                                color: Color.colorGray_100,
                                marginLeft: 10
                            }}
                        >{time} mins</Text>
                    </View>
                </View>
                <View style={{
                    marginLeft: 12,
                    width: wp(20),
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontSize: FontSize.size_mini,
                        color: Color.colorGray_100,
                        fontFamily: FontFamily.mulishBold,
                    }}>
                        Level:
                    </Text>
                    <Text style={{
                        marginLeft: 5,
                        fontSize: FontSize.size_mini,
                        color: level == 'low' ? 'green' : level == 'medium' ? Color.colorOrangered : 'red',
                        fontFamily: FontFamily.mulishBold,
                    }}>
                        {level}
                    </Text>
                </View>
            </Pressable>
        )
    }, []);

    const handlerQuizTest = useCallback((data) => {
        navigation.navigate('Quiz', { quizData: data });
    }, []);

    const RenderTopic = React.memo(() => {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                    marginTop: 50,
                    height: hp(70),
                    backgroundColor: Color.colorGhostwhite,
                }}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <CartAsm image={python} time={item?.time || 15} title={item.title} level={item?.level} data={item?.quiz || []} />
                )}
            />
        )
    }, [data])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container width={wp(85)}
                style={{
                    backgroundColor: Color.colorGhostwhite,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-around',
                    backgroundColor: Color.colorGhostwhite,

                }}>
                    <Image source={quiz} style={{
                        width: wp(15),
                        height: hp(10),
                        resizeMode: 'contain',
                    }} />
                    <Text style={
                        {
                            fontFamily: FontFamily.poppinsSemiBold,
                            fontSize: FontSize.size_3xl - 5,
                            color: Color.colorGray_100,

                        }
                    }>Tổng hợp các bài quiz test </Text>

                </View>

                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={'Mức Độ'}
                    style={[{
                        width: wp(25),
                        height: hp(2),
                        padding: wp(3),
                        backgroundColor: Color.colorOrangered,
                        borderRadius: 10,
                        color: Color.primaryWhite,
                        fontFamily: FontFamily.mulishBold,
                        alignSelf: 'flex-end'
                    }]}
                />


                <RenderTopic />
            </Container>
        </SafeAreaView>
    )
}

