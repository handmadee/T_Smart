'use strict';
import React, { useMemo, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, Image, TextInput, ScrollView, Platform, FlatList } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Container } from '../../components/Container';
import { RowComponent } from '../../components/RowComponent';
import { Camera, Clock, Message, Star, Star1, Book, Mobile, Transmit, AudioSquare, PenTool2, BackwardItem } from 'iconsax-react-native';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import loadText from '../../services/loadText';
import Button from '../../components/Button';
import { createTracking } from '../../apis/trackingCourse';
import Modal2 from '../../components/Modal';
import { useSelector } from 'react-redux';
import LoadingView from '../Auth/LoadingScreen';

export default function DetailCourse({ navigation, route }) {
    const course = route.params?.course;
    const idUser = useSelector(sate => sate?.authReducer?.authData?.id);
    const [readMore, setReadMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const RenderIntructor = React.memo(() => {
        return (
            <Container style={[styles.intructor]}>
                <RowComponent style={{ justifyContent: 'space-between', width: wp(90) }}>
                    <View>
                        <View style={[styles.row1]}>
                            <Image source={require('./../../../assets/AI.png')}
                                style={{
                                    width: wp(15),
                                    height: wp(15),
                                    borderRadius: 50

                                }}
                            />
                            <View>
                                <Text style={[styles.category]}>Nguyễn Ngọc Tính</Text>
                                <Text style={[styles.p]}>Graphic Design</Text>
                            </View>
                        </View>
                    </View>
                    <Message size="20" color={Color.colorDimgray_100} style={[styles.p]} />
                </RowComponent>
            </Container>
        )
    })
    const RenderIcon = React.memo(({ icon, text }) => {
        return (
            <View style={[styles.row1, { marginVertical: 20 }]}>
                {icon}
                <Text style={[styles.p, { color: Color.colorDimgray_100, marginLeft: 20 }]}>{text}</Text>
            </View>
        );
    });
    const data = [
        { id: 1, icon: <Book size="20" color={Color.colorDimgray_100} />, text: '25 Lessons' },
        { id: 2, icon: <Mobile size="20" color={Color.colorDimgray_100} />, text: 'Access Mobile, Desktop & TV' },
        { id: 3, icon: <Transmit size="20" color={Color.colorDimgray_100} />, text: 'Beginner Level' },
        { id: 4, icon: <AudioSquare size="20" color={Color.colorDimgray_100} />, text: 'Audio Book' },
        { id: 5, icon: <PenTool2 size="20" color={Color.colorDimgray_100} />, text: '100 Quizzes' },
        { id: 6, icon: <BackwardItem size="20" color={Color.colorDimgray_100} />, text: 'Certificate of Completion' },
    ];
    // Render Get
    const RenderGetIcon = React.memo(() => {
        return (
            <Container style={{ width: wp(90), backgroundColor: Color.colorGhostwhite }} >
                <Text style={[styles.title, { marginTop: 20 }]}>What You’ll Get</Text>
                {
                    data.map((item) => <RenderIcon icon={item.icon} text={item.text} key={item.id} />)
                }
            </Container>
        )
    });
    // Infor Course 
    const RenderDetailCousrse = React.memo(({ name, time, about, caterory, readMore }) => {
        return (
            <Container style={styles.cardDetail}>
                <View style={{ padding: 10 }}>
                    <View>
                        <RowComponent style={[styles.rowCompo, { padding: 0, width: wp(85), marginTop: 10 }]} >
                            <Text style={styles.category}>{caterory}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Star size={15} color={'#d1b92d'} variant="Bold" />
                                <Text>4.5</Text>
                            </View>
                        </RowComponent>
                    </View>
                    {/* Title */}
                    <Text style={styles.title}>{
                        name
                    }</Text>
                    <View style={[styles.row1, { marginVertical: 10 }]}>
                        <View style={[styles.row1, { paddingRight: 20, borderRightWidth: 2, marginRight: 20 }]}>
                            <Camera color={Color.colorGray_100} size={FontSize.size_mid} variant="Outline" />
                            <Text style={[styles.category, { color: Color.colorGray_100, marginLeft: 5 }]}>12 class</Text>
                        </View>
                        <View style={styles.row1}>
                            <Clock color={Color.colorGray_100} size={FontSize.size_mid} variant="Outline" />
                            <Text style={[styles.category, { color: Color.colorGray_100, marginLeft: 5 }]}>{time} Hourse</Text>
                        </View>
                    </View>
                </View>
                {/* About */}
                <View style={{ width: wp(90) }}>
                    <RowComponent style={[styles.rowCompo, { padding: 0, width: wp(90) }]}>
                        <Pressable style={[styles.btn]} >
                            <Text style={[styles.category, {
                                color: Color.colorGray_100,
                                textAlign: 'center',
                                lineHeight: hp(7)
                            }]}>About</Text>
                        </Pressable>
                        {/*  */}
                        <Pressable style={[styles.btn]} >
                            <Text style={[styles.category, {
                                color: Color.colorGray_100,
                                textAlign: 'center',
                                lineHeight: hp(7)
                            }]}>Curriculcum</Text>
                        </Pressable>
                    </RowComponent>
                    {/* Content */}
                    <View style={{ width: '95%', alignSelf: 'center', paddingVertical: hp(2) }}>
                        <Text style={[styles.p]}>
                            {
                                readMore ? about : loadText(about, 150)
                            }
                            <Text style={[styles.p, { color: Color.globalApp, textDecorationLine: 'underline' }]}
                                onPress={() => setReadMore(!readMore)}>
                                {readMore ? '     Pull Up' : 'Read more'}
                            </Text>
                        </Text>
                    </View>
                    {/*  */}
                </View>
                <View style={{ position: 'absolute', top: -45, right: -15 }}>
                    <Image source={require('./../../../assets/Video.png')} resizeMode='contain' width={50} height={50} />
                </View>
                {/* */}
            </Container>
        )
    })
    const handlerLearing = async () => {
        // return navigation.navigate('LessonCourse', { courseID: course?._id });
        try {
            setLoading(true);
            const tracking = await createTracking({ idAccount: idUser, idCourse: course?._id });
            if (tracking) {
                setIsShowModal(true);
            }
        } catch (error) {
            navigation.navigate('LessonCourse', { courseID: course?._id });
            console.log('Failed to tracking course:', error);
        } finally {
            setLoading(false);
        }


    }
    return (
        loading ? <LoadingView /> : (<SafeAreaView style={{ backgroundColor: Color.colorGhostwhite }}>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ width: wp(100), paddingBottom: hp(10) }}>
                    <View>
                        <Image
                            source={{ uri: course?.imageCourse }}
                            style={{ width: wp(100), height: hp(30) }}
                        />
                    </View>
                    <View style={{ flex: .7 }}>
                        {
                            course && (
                                <RenderDetailCousrse name={course?.title} time={course?.time ?? 90} about={course?.detailCourse} caterory={course?.category} readMore={readMore} />
                            )
                        }
                        {/* Intructor */}
                        <RenderIntructor />
                        {/* What You’ll Get */}
                        <RenderGetIcon />
                    </View>
                </View>
            </ScrollView >
            <Button title="Start Learning" style={[styles.startCourse]} onPress={handlerLearing} />
            <Modal2 img={
                require('./../../../assets/Logo.png')
            }
                title={'Đăng kí khoá học '}
                value={'Bạn Đã Đăng Kí Khoá Học Thành Công'}
                isVisible={isShowModal}
                onPress={() => {
                    setIsShowModal(!isShowModal);
                    navigation.navigate('LessonCourse', { courseID: course?._id });
                }}
            />

        </SafeAreaView >)
    );
}

const styles = StyleSheet.create({
    cardDetail: {
        width: wp(90),
        paddingVertical: hp(2),
        backgroundColor: Color.primaryWhite,
        borderRadius: 10,
        marginVertical: 16,
        alignSelf: 'center',
        borderRadius: 16,
        ...Platform.OS === 'android' ? {
            elevation: 4,
        } : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: .2,
            shadowRadius: 8,
        },
    },
    category: {
        fontFamily: FontFamily.mulishBold,
        color: Color.colorOrangered,
        fontSize: FontSize.size_smi
    },
    title: {
        color: Color.colorGray_100,
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.size_xl,
        letterSpacing: .2,
    },
    rowCompo: {
        width: wp(95),
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    row1: { flexDirection: 'row', alignItems: 'center' },
    btn: {
        width: '50%',
        height: hp(7),
        backgroundColor: true ? Color.colorAliceblue : Color.colorGhostwhite,
        borderColor: Color.colorGray_100,
        borderWidth: .2,
    },
    p: {
        color: Color.colorDarkgray,
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        letterSpacing: .2,
        lineHeight: 20
    },
    intructor: {
        backgroundColor: Color.colorGhostwhite,
        borderBottomWidth: .3,
        borderBottomColor: Color.colorDarkgray,
    },
    startCourse: {
        position: 'fixed',
        alignSelf: 'center',
        bottom: Platform.OS === 'android' ? hp(13) : hp(10),
    }
});
