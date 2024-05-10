import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container } from '../../components/Container';
import { RowComponent } from '../../components/RowComponent';
import { Star } from 'iconsax-react-native';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { Search } from '../../contanst/search';
import LazyImage from '../../components/LazyImage';
import { LineProcess } from '../../contanst/LineProcess';
import { trackingCourseFinsnish, trackingCourseLearn } from '../../apis/trackingCourse';
import LoadingView from '../Auth/LoadingScreen';
import { useSelector } from 'react-redux';


const MyCourse = ({ navigation }) => {
    const idUser = useSelector(state => state.authReducer?.authData?.id);
    const [courseSuccess, setCourseSuccess] = useState([]);
    const [courseLearn, setCourseLearn] = useState([]);
    const [loading, setLoading] = useState(false);
    const [onGo, setOnGo] = useState(false);
    const feachData = async () => {
        try {
            setLoading(true);
            const courseLearnData = await trackingCourseLearn(idUser);
            setCourseLearn(courseLearnData?.data?.data?.data);
            const courseSuccessData = await trackingCourseFinsnish(idUser);
            setCourseSuccess(courseSuccessData?.data?.data?.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        feachData();
    }, []);

    const handlePress = useCallback(() => {
        feachData();
        setOnGo(!onGo);
    }, [onGo]);

    // handlerPressCourse
    const handlerPressCourse = (id) => {
        navigation.navigate('LessonCourse', { courseID: id });
    };



    const CourseSuccess = ({ image = '', title = '', category = '', time = 0, date = '20/10/2024', onPress }) => {
        const day = new Date(date).getDate() + '/' + (new Date(date).getMonth() + 1) + '/' + new Date(date).getFullYear();
        return (
            <Pressable
                onPress={onPress}
                style={[styles.cardCourse, styles.rowC, { justifyContent: 'space-between' }]}>
                <LazyImage url={image} width={wp(35)} height={'100%'} style={styles.lazy} resize={'cover'} />
                <View style={{ paddingRight: 15, width: wp(45) }}>
                    <Text style={[styles.cardCategory]}>{category}</Text>
                    <Text style={[styles.title]}>{title}</Text>
                    <View style={[styles.rowC, { marginVertical: 7 }]}>
                        <View style={[styles.rowC, styles.line]}>
                            <Text style={[styles.star, { marginRight: 10 }]}>4.3</Text>
                            <Star color='gold' size={12} />
                        </View>
                        <Text style={[styles.star, { letterSpacing: .2 }]}>{time + " " + "Hour"}</Text>
                    </View>
                    <Text
                        style={[styles.star, styles.certificate]}
                        onPress={() => handleViewCertificate({ title: title, date: day })}
                    >
                        View Certificate
                    </Text>
                    <Image style={styles.tick} source={require('./../../../assets/Check1.png')} />
                </View>
            </Pressable>
        );
    };

    const CourseGoing = ({ image = '', category = '', title = '', time = 90, learned = 0, totalCourse = 0, onPress }) => (
        <Pressable onPress={onPress} style={[styles.cardCourse, styles.rowC, { justifyContent: 'space-between' }]}>
            <LazyImage url={image} width={wp(30)} height={'100%'} style={styles.lazy} resize={'cover'} />
            <View style={{ paddingRight: 15 }}>
                <Text style={[styles.cardCategory]}>{title}</Text>
                <Text style={[styles.title]}>{category}</Text>
                <View style={[styles.rowC, { marginVertical: 7 }]}>
                    <View style={[styles.rowC, styles.line]}>
                        <Text style={[styles.star, { marginRight: 10 }]}>4.3</Text>
                        <Star color='gold' size={12} />
                    </View>
                    <Text style={[styles.star, { letterSpacing: .2 }]}>{time}Hour</Text>
                </View>
                <LineProcess w={wp(34)} h={hp(1)} on={learned} total={totalCourse} />
                <Image style={styles.tick} source={require('./../../../assets/Check1.png')} />
            </View>
        </Pressable>
    );

    const RenderCourseSuccess = () => (
        <FlatList
            data={courseSuccess}
            renderItem={({ item, index }) => (
                <CourseSuccess
                    image={item?.courseID?.imageCourse}
                    category={item?.category}
                    title={item?.courseID?.title}
                    time={item?.courseID?.totalLesson}
                    date={item?.updatedAt}
                    onPress={() => handlerPressCourse(item?.courseID?._id)}
                />
            )}
            keyExtractor={(item) => item?._id}

        />
    );

    const RenderCourseGoing = () => (
        <FlatList
            data={courseLearn}
            renderItem={({ item, index }) => (
                <CourseGoing
                    image={item?.courseID?.imageCourse}
                    category={item?.category}
                    title={item?.courseID?.title}
                    learned={item?.completedLessonsCount}
                    totalCourse={item?.courseID?.totalLesson}
                    onPress={() => handlerPressCourse(item?.courseID?._id)}
                    time={112}
                />
            )}
        />
    );

    const handleViewCertificate = (course) => {
        navigation.navigate('CartificateCourse', { course: course });
    };

    return (
        loading ? <LoadingView /> : <View style={{ flex: 1, backgroundColor: Color.colorGhostwhite }}>
            <Container style={styles.content}>
                <Search placeholder='3D Design Illustration' />
                <Container style={[styles.container]}>
                    <RowComponent style={[styles.rowC, { width: '100%', justifyContent: 'space-between' }]}>
                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: onGo ? Color.globalApp : Color.colorAliceblue }]}
                            onPress={handlePress}
                        >
                            <Text style={[styles.txtButton, { color: onGo ? Color.primaryWhite : Color.colorGray_100 }]}>
                                Completed
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: !onGo ? Color.globalApp : Color.colorAliceblue }]}
                            onPress={handlePress}
                        >
                            <Text style={[styles.txtButton, { color: !onGo ? Color.primaryWhite : Color.colorGray_100 }]}>
                                Ongoing
                            </Text>
                        </TouchableOpacity>
                    </RowComponent>
                    {onGo ? <RenderCourseSuccess /> : <RenderCourseGoing />}
                </Container>
            </Container>
        </View>
    );
};

const shadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
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
        marginBottom: hp(2),
    },
    cardCategory: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.paragraphSmall_size,
        color: Color.colorOrangered,
        marginVertical: 10,
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
    certificate: {
        color: Color.globalApp,
        textDecorationLine: 'underline',
        fontSize: 12,
        textAlign: 'right',
        marginVertical: 7,
    },
    tick: {
        width: wp(5),
        height: wp(5),
        borderRadius: 50,
        position: 'absolute',
        right: 10,
        top: 10,
    },
    img: {
        width: wp(25),
        height: '100%',
    },
    line: {
        paddingRight: 20,
        borderRightColor: Color.colorGray_100,
        borderRightWidth: 2,
        marginRight: 20,
    },
    rowC: {
        flexDirection: 'row',
        alignItems: 'center',
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
    },
});

export default MyCourse;
