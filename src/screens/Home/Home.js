import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, Image, TextInput, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { ArrowRight2, SearchNormal1, SaveAdd, Clock } from 'iconsax-react-native';
import { RowComponent } from '../../components/RowComponent';
import { Container } from '../../components/Container';
import { Tag } from '../../contanst/tag';
import { getCategory, getCourses, getCategoryById, getNotification, checkInforUser } from '../../apis/courseApi';
import SlideShow from '../../contanst/Slide';
import LoadingView from '../Auth/LoadingScreen';
import { useSelector } from 'react-redux';
import Modal2 from '../../components/Modal';


const Home = ({ navigation }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [trackingCourse, setTrackingCourse] = useState('ALL');
    const [imageCourse, setImageCourse] = useState([]);
    const inforUser = useSelector(state => state.authReducer?.authData?.infor);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const categoryResponse = await getCategory();
                setCategories(categoryResponse.data.data);
                const courseResponse = await getCourses();
                console.log(courseResponse.data.data.courses)
                setCourses(courseResponse.data.data.courses);
                const imageResponse = await getNotification();
                console.log(imageCourse)
                setImageCourse(imageResponse.data.data);
                console.log(inforUser)
                if (!inforUser) {
                    setOpen(true);
                }
            } catch (error) {
                console.error('Error fetching initial data:', error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const handleCategoryPress = useCallback(async (category) => {
        setTrackingCourse(category.nameCategory);
        if (category.nameCategory === 'ALL') {
            fetchInitialData();
        } else {
            try {
                setLoading(true);
                const response = await getCategoryById(category?._id);
                setCourses(response.data.data.courses);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses by category:', error);
            } finally {
                setLoading(false);
            }
        }
    }, []);
    const handleCoursePress = (course) => {
        navigation.navigate('DetailCourse', { course });
    };
    const handlerNotification = useCallback(async () => {
        return navigation.navigate('NotificationOne');
    })
    const Header = ({ name, onPress }) => (
        <RowComponent style={styles.header}>
            <View style={{ width: wp(60) }}>
                <Text style={styles.titHeader}>{t('hi')}, {name}</Text>
                <Text style={styles.titDetail}>{t('today')}</Text>
            </View>
            <Pressable onPress={onPress} >
                <Image source={require("./../../../assets/NOTIFICATIONS.png")} resizeMode='contain' />
                <View style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'red',
                    position: 'absolute',
                    right: 0,
                }} />
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
    const TagList = () => (
        <FlatList
            bounces={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={categories}
            keyExtractor={(item, index) => index.toString()}
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
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
                return (
                    < CardCourse
                        title={item.title}
                        url={{ uri: item.imageCourse }}
                        category={item.category_id?.nameCategory}
                        onPress={() => handleCoursePress(item)}
                    />
                )
            }

            }
        />
    );
    const CardCourse = React.memo(({ url, title, category, onPress, time = 145 }) => (
        <Pressable style={styles.card} onPress={onPress}>
            <View>
                <Image
                    style={{ width: wp(55), height: hp(15) }}
                    resizeMode='cover'
                    source={url}
                />
            </View>
            <View style={styles.cardDetail}>
                <Text style={styles.courseTitle}>{title}</Text>
                <RowComponent style={{
                    alginItems: 'center',
                    padding: 0,
                    height: hp(5),
                    width: wp(55),
                }}>
                    <Text style={styles.textCategory}>{category}</Text>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'flex-end' }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                            <Clock size={FontSize.buttonMedium_size} color={Color.globalApp} />
                            <Text style={{ color: Color.colorDimgray_100, fontWeight: '600' }}>{`${time} hour`}</Text>
                        </View>
                        <SaveAdd size={FontSize.size_2xl} color={Color.globalApp} />
                    </View>
                </RowComponent>
            </View>
        </Pressable>
    ))
    return (
        loading ? <LoadingView /> :
            <Container style={styles.container}>
                <Header name={inforUser?.fullname} onPress={handlerNotification} />
                <Search />
                <View>
                    <RowComponent style={styles.row}>
                        <Text style={styles.popular}>{t('popular')}</Text>
                        <Pressable style={styles.pressable}>
                            <Text style={styles.sellAll}>{t('sell')}</Text>
                            <ArrowRight2 size={FontSize.size_lg} color={Color.globalApp} />
                        </Pressable>
                    </RowComponent>
                    <TagList />
                    <CourseList data={courses} />
                    <Text style={styles.notification}>{t('notifications')}</Text>
                    {
                        imageCourse && imageCourse.length > 0 && <SlideShow dataImage={imageCourse} />
                    }
                </View>
                <Modal2 title={'Cập nhật thông tin '} img={require('./../../../assets/Logo.png')}
                    value={'Bạn cần phải cập nhật thông tin của mình để sử dụng app'}
                    onPress={() => {
                        setOpen(false);
                        navigation.navigate('EditProfile')
                    }
                    }
                    isVisible={open}
                />
            </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: wp(90),
        alignSelf: 'center',
        backgroundColor: 'transparent',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    header: {
        justifyContent: 'space-between',
        width: wp(90),
    },
    titHeader: {
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.headingH4_size,
        color: '#202244',
    },
    titDetail: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorDimgray_100,
    },
    input: {
        width: wp(65),
        height: hp(8),
        backgroundColor: Color.primaryWhite,
        borderRadius: 12,
        color: Color.colorDimgray_200,
        fontFamily: FontFamily.mulishBold,
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
    },
    textCategory: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorOrangered,
        marginTop: 10,
    },
    courseTitle: {
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.size_mini,
        color: Color.colorGray_100,
    },
    card: {
        width: wp(55),
        height: hp(24),
        borderColor: '#0000003b',
        borderWidth: 1,
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 20,
        marginRight: 20,
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
    searchResultsContainer: {
        position: 'absolute',
        top: 100, // Adjust this value as needed
        width: '100%',
        backgroundColor: 'white',
        zIndex: 1,
    },
});

export default Home;
