import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, Image, TextInput, FlatList, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { ArrowRight2, SearchNormal1, SaveAdd, Clock } from 'iconsax-react-native';
import { RowComponent } from '../../components/RowComponent';
import { Container } from '../../components/Container';
import { Tag } from '../../contanst/tag';
import { getCategory, getCourses, getCategoryById, getNotification, checkInforUser, getPopup } from '../../apis/courseApi';
import SlideShow from '../../contanst/Slide';
import LoadingView from '../Auth/LoadingScreen';
import { useSelector } from 'react-redux';
import Modal2 from '../../components/Modal';
import PopupImage from '../Popup/mainPop';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [popup, setPopup] = useState(false);
    const [imagePopup, setImagePopup] = useState('');
    const [courses, setCourses] = useState([]);
    const [trackingCourse, setTrackingCourse] = useState('ALL');
    const [imageCourse, setImageCourse] = useState([]);
    const inforUser = useSelector(state => state.authReducer?.authData?.infor);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const [categoryResponse, courseResponse, imageResponse, imagePopup] = await Promise.all([
                    getCategory(),
                    getCourses(),
                    getNotification(),
                    getPopup()

                ]);
                setCategories(categoryResponse.data.data);
                setCourses(courseResponse.data.data.courses);
                setImageCourse(imageResponse.data.data);
                setImagePopup(imagePopup.data.data);
                console.log(imagePopup?.data?.data)
                if (!inforUser) {
                    setOpen(true);
                }
                setTimeout(() => {
                    setPopup(true);
                }, 10000);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const handleCategoryPress = useCallback(async (category) => {
        setTrackingCourse(category.nameCategory);
        try {
            setLoading(true);
            const response = category.nameCategory === 'ALL' ? await getCourses() : await getCategoryById(category?._id);
            setCourses(response.data.data.courses);
        } catch (error) {
            console.error('Error fetching courses by category:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCoursePress = (course) => {
        navigation.navigate('DetailCourse', { course });
    };

    const handlerNotification = useCallback(() => {
        navigation.navigate('NotificationOne');
    }, []);

    const Header = ({ name, onPress }) => (
        <RowComponent style={styles.header}>
            <View style={{ width: wp(60) }}>
                <Text style={styles.titHeader}>{`${t('hi')}, ${name}`}</Text>
                <Text style={styles.titDetail}>{t('today')}</Text>
            </View>
            <Pressable onPress={onPress}>
                <Image source={require("./../../../assets/NOTIFICATIONS.png")} resizeMode='contain' />
                <View style={styles.notificationDot} />
            </Pressable>
        </RowComponent>
    );

    const Search = () => (
        <RowComponent style={styles.search}>
            <SearchNormal1 size={FontSize.buttonMedium_size} color={Color.colorBlack} />
            <TextInput
                style={styles.input}
                placeholder={t('search')}
                onChangeText={() => navigation.navigate('SearchCourse')}
                onPressIn={() => navigation.navigate('SearchCourse')}
            />
            <Image source={require('./../../../assets/FILTER.png')} />
        </RowComponent>
    );

    const handlerSellAll = useCallback(() => {
        navigation.navigate('SeeCourse');
    }, []);

    const TagList = () => (
        <FlatList
            bounces={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={categories}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <Tag
                    title={item.nameCategory}
                    onPress={() => handleCategoryPress(item)}
                    status={trackingCourse === item.nameCategory}
                />
            )}
        />
    );

    const CourseList = ({ data }) => (
        <FlatList
            bounces={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <CardCourse
                    title={item.title}
                    url={{ uri: item.imageCourse }}
                    category={item.category_id?.nameCategory}
                    onPress={() => handleCoursePress(item)}
                />
            )}
        />
    );

    const CardCourse = React.memo(({ url, title, category, onPress, time = 145 }) => (
        <Pressable style={styles.card} onPress={onPress}>
            <Image
                style={styles.courseImage}
                resizeMode='cover'
                source={url}
            />
            <View style={styles.cardDetail}>
                <Text style={styles.courseTitle}>{title}</Text>
                <RowComponent style={styles.courseMeta}>
                    <Text style={styles.textCategory}>{category}</Text>
                    <View style={styles.metaInfo}>
                        <View style={styles.metaItem}>
                            <Clock size={FontSize.buttonMedium_size} color={Color.globalApp} />
                            <Text style={styles.metaText}>{`${time} hour`}</Text>
                        </View>
                        <SaveAdd size={FontSize.size_2xl} color={Color.globalApp} />
                    </View>
                </RowComponent>
            </View>
        </Pressable>
    ));

    return (
        loading ? <LoadingView /> :
            <View style={{
                flex: 1,
                backgroundColor: Color.colorGhostwhite,
            }}>
                <Container style={styles.container}>
                    <Header name={inforUser?.fullname} onPress={handlerNotification} />
                    <Search />
                    <View style={{
                        marginTop: hp(1)
                    }}>
                        <RowComponent style={styles.row}>
                            <Text style={styles.popular}>{t('popular')}</Text>
                            <Pressable style={styles.pressable}>
                                {/* Sell */}
                                <Text onPress={handlerSellAll} style={styles.sellAll}>{t('sell')}</Text>
                                <ArrowRight2 size={FontSize.size_lg} color={Color.globalApp} />
                            </Pressable>
                        </RowComponent>
                        <TagList />
                        <CourseList data={courses} />
                        <Text style={styles.notification}>{t('notifications')}</Text>
                        {imageCourse && imageCourse.length > 0 && <SlideShow dataImage={imageCourse} />}
                    </View>
                    <Modal2
                        title={'Cập nhật thông tin '}
                        img={require('./../../../assets/Logo.png')}
                        value={'Bạn cần phải cập nhật thông tin của mình để sử dụng app'}
                        onPress={() => {
                            setOpen(false);
                            navigation.navigate('EditProfile');
                        }}
                        isVisible={open}
                    />
                    {
                        imagePopup && imagePopup.length > 0 && <PopupImage imageUri={imagePopup[
                            Math.random() * imagePopup.length | 0
                        ]?.popupImage}
                            isVisible={popup}
                            toggleModal={() => setPopup(false)}
                        />
                    }

                    {/* <PopupImage imageUri={'https://mdcop.vn/wp-content/uploads/2020/02/pop-up-l%C3%A0-g%C3%AC.jpg'}
                    isVisible={popup}
                    toggleModal={() => setPopup(false)}
                /> */}
                </Container>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: wp(90),
        alignSelf: 'center',
        backgroundColor: Color.colorGhostwhite
    },
    header: {
        justifyContent: 'space-between',
        width: wp(90),
    },
    titHeader: {
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.headingH4_size,
        color: Color.colorBlack,
    },
    titDetail: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorDimgray_100,
    },
    input: {
        flex: 1,
        height: hp(8),
        backgroundColor: Color.primaryWhite,
        borderRadius: 12,
        color: Color.colorDimgray_200,
        fontFamily: FontFamily.mulishBold,
        marginLeft: 10,
    },
    search: {
        width: wp(90),
        height: hp(8),
        padding: hp(2),
        backgroundColor: Color.primaryWhite,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    row: {
        justifyContent: 'space-between',
        width: wp(90),
        padding: 0,
        marginBottom: hp(2)
    },
    textCategory: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorOrangered,
    },
    courseTitle: {
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.size_mini,
        color: Color.colorGray_100,
    },
    card: {
        width: wp(55),
        height: hp(24),
        borderColor: Color.colorBlack,
        borderWidth: .2,
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 20,
        marginRight: 20
    },
    courseImage: {
        width: wp(55),
        height: hp(15),
    },
    cardDetail: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
    },
    notification: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_mid,
        color: Color.colorGray_100,
        marginTop: 20,
    },
    popular: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_mid,
        color: Color.colorGray_100,
    },
    sellAll: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorGray_100,
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        position: 'absolute',
        right: 0,
    },
    courseMeta: {
        alignItems: 'center',
        padding: 0,
        width: '85%',
        marginTop: 10
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    metaText: {
        color: Color.colorDimgray_100,
        fontWeight: '600',
    },
});

export default Home;
