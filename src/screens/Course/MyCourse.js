import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, Image, TextInput, FlatList, TouchableOpacity, TextBase, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Container } from '../../components/Container';
import { RowComponent } from '../../components/RowComponent';
import { PlayCircle, ChartSuccess, Star } from 'iconsax-react-native';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { Search } from '../../contanst/search';
import FastImage from 'react-native-fast-image';
import LazyImage from '../../components/LazyImage';
import { LineProcess } from '../../contanst/LineProcess';
import { dataCourse1 } from '../../data/data';
import { useTranslation } from 'react-i18next';

const MyCourse = ({ navigation }) => {

    const [courseSuccess, setCourseSuccess] = useState(() => dataCourse1.filter((item) => item.status === 112) || []);
    const [courseLearn, setCourseLearn] = useState(() => dataCourse1.filter((item) => item.status === 111) || []);
    const [onGo, setOnGo] = useState(false);
    const { t } = useTranslation();
    const CourseSuccess = useCallback(({ image = '', title = '', category = '', time = 0 }) => {
        return (
            <View style={[styles.cardCourse, styles.rowC, { justifyContent: 'space-between' }]}>
                <LazyImage url={image} width={wp(40)} height={'100%'} style={styles.lazy} resize={'cover'} />
                <View style={{ paddingRight: 15 }}>
                    <Text style={[styles.cardCategory]} >{category}</Text>
                    <Text style={[styles.title]}>{title}</Text>
                    <View style={[styles.rowC, { marginVertical: 7 }]}>
                        <View style={[styles.rowC, styles.line]}>
                            <Text style={[styles.star, { marginRight: 10 }]}>
                                4.3
                            </Text>
                            <Star color='gold' size={12} />
                        </View>
                        <Text style={[styles.star, { letterSpacing: .2 }]}>
                            {time} Hour
                        </Text>
                    </View>
                    <Text style={[styles.star, styles.cretificate,]}
                        onPress={() => handleViewCertificate({ image: image, title: title })}>View Certificate</Text>
                    <Image style={styles.tick} source={require('./../../../assets/Check1.png')} />

                </View>
            </View>
        )
    })
    const CourseGoing = useCallback(({ image = '', category = '', title = '', time = 90, learned = 0, totalCourse = 0 }) => {
        console.log(title)
        return (
            <View style={[styles.cardCourse, styles.rowC, { justifyContent: 'space-between' }]}>
                <LazyImage url={image} width={wp(30)} height={'100%'} style={styles.lazy} resize={'cover'} />
                <View style={{ paddingRight: 15 }}>
                    <Text style={[styles.cardCategory]} >{title}</Text>
                    <Text style={[styles.title]}>{category}</Text>
                    <View style={[styles.rowC, { marginVertical: 7 }]}>
                        <View style={[styles.rowC, styles.line]}>
                            <Text style={[styles.star, { marginRight: 10 }]}>
                                4.3
                            </Text>
                            <Star color='gold' size={12} />
                        </View>
                        <Text style={[styles.star, { letterSpacing: .2 }]}>
                            {time} Hour
                        </Text>
                    </View>
                    <LineProcess w={wp(34)} h={hp(1)} on={learned} total={totalCourse} />
                    <Image style={styles.tick} source={require('./../../../assets/Check1.png')} />

                </View>
            </View>

        )
    });


    const RenderCourseSuccess = React.memo(() => {
        return (
            <FlatList
                data={courseSuccess}
                renderItem={({ item, index }) => <CourseSuccess
                    image={item?.image}
                    category={item?.category}
                    title={item?.title}
                    time={112}
                />}
                keyExtractor={(item) => item.id.toString()}
            />
        )
    }, [courseSuccess, CourseSuccess])

    const RenderCourseGoing = React.memo(() => {
        return (
            <FlatList
                data={courseLearn}
                renderItem={({ item, index }) => <CourseGoing
                    image={item?.image}
                    category={item?.category}
                    title={item?.title}
                    learned={12}
                    totalCourse={112}
                    time={112}
                />}

            />
        )
    }, [courseLearn, CourseGoing])

    const handlePress = useCallback(() => {
        return setOnGo(!onGo);
    }, [onGo]);

    const handleViewCertificate = useCallback((course) => {
        return navigation.navigate('CartificateCourse', { course: course });
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Color.colorGhostwhite }}>
            <Container style={styles.content}>
                {/* Search */}
                <Search placeholder='3D Design Illustration' />
                {/* Content */}
                <Container style={[styles.container]}>
                    <RowComponent style={[styles.rowC, { width: '100%', justifyContent: 'space-between' }]}>
                        <TouchableOpacity style={[styles.btn, {
                            backgroundColor: onGo ? Color.globalApp : Color.colorAliceblue,
                        }]} onPress={handlePress}>
                            <Text style={[styles.txtButton, {
                                color: onGo ? Color.primaryWhite : Color.colorGray_100,
                            }]}>{t('completed')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,
                        {
                            backgroundColor: !onGo ? Color.globalApp : Color.colorAliceblue,
                        }
                        ]} onPress={handlePress}>
                            <Text style={[styles.txtButton, {
                                color: !onGo ? Color.primaryWhite : Color.colorGray_100,
                            }]}>{t('ongoing')}</Text>
                        </TouchableOpacity>
                    </RowComponent>
                    {/* Render Data */}
                    {
                        onGo ? <RenderCourseSuccess /> : <RenderCourseGoing />
                    }


                    {/* The End */}
                </Container>
            </Container>
        </View>

    );
};

const shadowStyle = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: wp(90),
        backgroundColor: Color.colorGhostwhite,
    },
    container: {
        width: wp(90),
        backgroundColor: Color.colorGhostwhite,
    },
    btn: {
        width: '45%',
        height: hp(6),
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtButton: {
        fontFamily: FontFamily.mulishExtraBold,
        fontSize: FontSize.size_mini,
        alignSelf: 'center',
    },
    cardCourse: {
        width: wp(85),
        height: hp(15),
        borderRadius: 16,
        ...shadowStyle,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.primaryWhite,
        alignSelf: 'center',
        marginBottom: hp(2)
    },
    cardCategory: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.paragraphSmall_size,
        color: Color.colorOrangered,
        marginVertical: 10
    },
    title: {
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.buttonMedium_size,
        color: Color.colorGray_100,
        letterSpacing: 0.2,
    },
    star: {
        fontFamily: FontFamily.mulishExtraBold,
        fontSize: FontSize.size_2xs,
        color: Color.colorGray_100,
        letterSpacing: 0.2,
    },
    cretificate: {
        color: Color.globalApp,
        textDecorationLine: 'underline',
        fontSize: 12,
        textAlign: 'right',
        marginVertical: 7

    },
    tick: {
        width: wp(5),
        height: wp(5),
        borderRadius: 50,
        position: 'absolute',
        right: 0,
        top: -10,
    },
    img: {
        width: wp(25),
        height: '100%',
    },
    line: {
        paddingRight: 20,
        borderRightColor: Color.colorGray_100,
        borderRightWidth: 2,
        marginRight: 20
    },
    rowC: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    lazy: {
        borderBottomLeftRadius: 16,
        borderTopLeftRadius: 16,
    },

    process: {
        position: 'relative',
        width: wp(40),
        height: hp(1),
        borderRadius: 5,
        backgroundColor: Color.colorAliceblue,
    },
    magicLine: {
        borderRadius: 5,
        position: 'absolute',
        width: '60%',
        backgroundColor: Color.globalApp,
        height: '100%',
        top: 0,
        left: 0,
        bottom: 0,

    }



});

export default MyCourse;
