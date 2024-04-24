import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, Image, TextInput, FlatList } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Container } from '../../components/Container';
import { RowComponent } from '../../components/RowComponent';
import { PlayCircle, ChartSuccess, Pause } from 'iconsax-react-native';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import LazyImage from '../../components/LazyImage';
import Video from "react-native-youtube-iframe";
import { getCourseById } from '../../apis/courseApi';
import LoadingView from '../Auth/LoadingScreen';
import { addLessonToTracking, getTracking } from '../../apis/trackingCourse';
import { useSelector } from 'react-redux';

const LessonCourse = ({ navigation, route }) => {
    const idUser = useSelector(state => state?.authReducer?.authData?.id);
    const idCourse = route.params?.courseID;
    const [loading, setLoading] = useState(true);
    const [video, setVideo] = useState(false);
    const [watching, setWatching] = useState(false);
    const [dataLeson, setDataLesson] = useState([]);
    // const [haveLearn, setHeaveLearn] = useState([]);
    const [idLassLesson, setIdLastLesson] = useState('');
    const [haveLearn, setHaveLearn] = useState([]);
    let haveLearnRef = useRef([]);

    const fetchCourse = useCallback(async () => {
        try {
            setLoading(true);
            // get lesson course
            const CourseLesson = await getCourseById(idCourse);
            // set Lesson
            await setDataLesson(CourseLesson.data?.data?.chapters);
            // get tracking course
            const tracking = await getTracking(idUser, idCourse);
            // SET LESSON LEARN
            const trackingData = tracking.data?.data?.data?.trackingCourse?.learnLesson || [];
            await setHaveLearn(trackingData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [idCourse, idUser]);


    useEffect(() => {
        fetchCourse()
    }, [fetchCourse])



    const handlePress = useCallback(async (id, url) => {
        console.log(id)
        const idVideo = url.slice(32, 43);
        setVideo(idVideo);
        setWatching(id)
        await addLessonToTrackingCourse(idUser, idCourse, id);

    }, []);

    const addLessonToTrackingCourse = async (idAccount, idCourse, idLesson) => {
        try {
            await addLessonToTracking({ idAccount, idCourse, idLesson });
        } catch (error) {
            console.log({
                addLessonError: error
            })
        }
    }

    const handlerQuizTest = useCallback((data) => {
        navigation.navigate('Quiz', { quizData: data });
    }, [navigation]);

    const RenderItem = ({ id, index = 1, status = false, title = '', duration = 10, onPress }) => {
        console.log(haveLearn)
        return (
            <Pressable style={[styles.lesson,
            status && { backgroundColor: '#a5e6ca' },
            ]} onPress={onPress}>
                <RowComponent style={styles.rowC}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '70%' }}>
                        <View style={styles.circleOrder}>
                            <Text style={[styles.section, styles.order]}>{index}</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={[styles.section, { fontSize: FontSize.buttonMedium_size }]}>{title}</Text>
                            <Text style={styles.minLesson}>{duration} mins</Text>
                        </View>
                    </View>
                    {/* Icon Play */}
                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                        {/* Icon Play */}
                        {
                            !(watching === id) ? <PlayCircle size="32" color={Color.globalApp} variant="Bold" /> :
                                <Pause size="32" color={Color.globalApp} variant="Bold" />
                        }
                        {/* Đã hoàn thành */}
                        {
                            status && (
                                <Image source={require('./../../../assets/check.png')}
                                    style={{
                                        width: 25,
                                        height: 25
                                    }}
                                    resizeMode='contain'
                                />
                            )
                        }
                    </View>
                </RowComponent>
            </Pressable>
        )
    }
    const Chapter = React.memo(({ index = 0, chapter = '', totalChapter = 90 }) => {
        return (
            <RowComponent style={styles.rowC}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.section}>Section {index} </Text>
                    <Text style={[styles.section, { color: Color.globalApp }]}>{chapter}</Text>
                </View>
                <Text style={styles.mins}>{totalChapter} Mins</Text>
            </RowComponent>
        )
    })
    const Test = React.memo(({ title = '', duration = '15 Mins', status = false, data = [], onPress }) => {
        return (
            <Pressable style={[styles.lesson,
            status && { backgroundColor: '#a5e6ca' }
            ]} onPress={onPress}>
                <RowComponent style={styles.rowC}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.circleOrder}>
                            <Image
                                source={require('./../../../assets/test.png')}
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={[styles.section, { fontSize: FontSize.buttonMedium_size }]}>{title}</Text>
                            <Text style={styles.minLesson}>{duration} mins</Text>
                        </View>
                    </View>
                    {/* Icon Play */}
                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                        {/* Icon Play */}
                        {
                            status && (
                                <PlayCircle size="32" color={Color.globalApp} variant="Bold" />
                            )
                        }
                        {/* Đã hoàn thành */}
                        {
                            status && (
                                <Image source={require('./../../../assets/check.png')}
                                    style={{
                                        width: 25,
                                        height: 25
                                    }}
                                    resizeMode='contain'
                                />
                            )
                        }
                    </View>
                </RowComponent>
            </Pressable>
        )
    });
    const RenderCourse = useMemo(() => () => (
        <FlatList
            data={dataLeson}
            renderItem={({ item, index }) => {
                return (
                    item && (
                        <View>
                            <Chapter index={index + 1} chapter={item?.titleChapter} totalChapter={item?.duration} />
                            {item?.lessons && item?.lessons.length > 0 && item?.lessons.map((lesson, index) => (
                                <RenderItem
                                    key={index}
                                    index={index + 1}
                                    title={lesson?.titleLesson}
                                    duration={lesson?.timeLesson}
                                    status={haveLearn.includes(lesson?._id)}
                                    onPress={() => handlePress(lesson?._id, lesson?.urlVideo)}
                                    id={lesson._id}
                                />
                            ))}
                            {item?.exams && item?.exams.length > 0 && item?.exams.map((test, index) => (
                                <Test
                                    key={index}
                                    title={test?.title}
                                    duration={test?.time}
                                    status={test?.status}
                                    onPress={() => handlerQuizTest(test?.question)}
                                />
                            ))}
                        </View>
                    )
                );
            }}
            keyExtractor={(item, index) => index.toString()}
        />
    ), [dataLeson, watching]);






    return (
        loading ? <LoadingView /> : <SafeAreaView style={styles.container}>
            <Container style={styles.content}>
                {
                    !video && (<LazyImage
                        url={'https://www.georgeanimatrix.com/blog/wp-content/uploads/2023/08/jpeg-optimizer_14-1.jpg'}
                        width={'100%'}
                        height={hp(20)}
                        style={{ borderRadius: 16 }}
                    />)
                }
                {
                    video && (
                        <Video
                            width={'100%'}
                            height={hp(24)}
                            videoId={video}
                            play={true}
                        />
                    )
                }
                {/* Section */}
                <Container style={styles.viewLesson}>
                    <RenderCourse />


                </Container>
            </Container>
        </SafeAreaView>
    );
};

const shadowStyle = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.colorGhostwhite,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',


    },
    content: {
        flex: 1,
        width: wp(90),
        backgroundColor: Color.colorGhostwhite,
        marginTop: hp(2)
    },
    viewLesson: {
        flex: 1,
        width: wp(90),
        backgroundColor: Color.primaryWhite,
        borderRadius: 16,
        padding: wp(1),
        marginTop: hp(2),
        ...shadowStyle,

    },
    section: {
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.size_smi,
        color: Color.colorGray_100,
    },
    mins: {
        fontFamily: FontFamily.mulishExtraBold,
        fontSize: FontSize.paragraphSmall_size,
        color: Color.globalApp,
    },
    rowC: {
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: hp(1)
    },
    minLesson: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorDimgray_100,
        lineHeight: 20
    },
    circleOrder: {
        width: wp(13),
        height: wp(13),
        borderRadius: 50,
        backgroundColor: Color.colorGhostwhite,
        borderWidth: 3,
        borderColor: Color.colorAliceblue,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(3),
    },
    lesson: {
        borderBottomColor: Color.colorAliceblue,
        borderBottomWidth: 2,
    },
    order: { fontSize: FontSize.section },
    tagSuccess: {
        width: wp(23),
        height: wp(7),
        borderRadius: 10,
        backgroundColor: Color.colorMediumslateblue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: wp(1),
        marginTop: 7
    },
});



export default React.memo(LessonCourse);