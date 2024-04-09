import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, Image, TextInput, ScrollView, Platform, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { ArrowRight2, SearchNormal1, SaveAdd } from 'iconsax-react-native';
import { RowComponent } from '../../components/RowComponent';
import { Container } from '../../components/Container';
import { Tag } from '../../contanst/tag';
import { DataCourse, dataImage } from '../../data/data';
import SlideShow from '../../contanst/Slide';
import LoadingView from '../Auth/LoadingScreen';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';


const Home = ({ navigation }) => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    // Notification 
    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }
    //
    const getToken = async () => {
        const token = await messaging().getToken();

        console.log('Token:', token);
    }

    useEffect(() => {
        requestUserPermission();
        getToken();
    })




    const listCategory = useMemo(() => ['All', 'Graphic Design', 'HTML', 'CSS', 'Python', 'Javascript', 'React Native'], []);
    const listCourse = useMemo(() => DataCourse, []);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [List, setListCourse] = useState(listCourse);
    const [searchCourse, setFilteredCourses] = useState([]);
    const [trackCourse, setCourse] = useState('All');
    const [images] = useState(() => dataImage);

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000);
    }, []);

    const handleCategoryPress = (category) => {
        setCourse(category);
        if (category === 'All') {
            setListCourse(listCourse);
        } else {
            const filteredCourses = listCourse.filter(course => course.category === category);
            setListCourse(filteredCourses);
        }
    };

    const handleCoursePress = useCallback((course) => {
        navigation.navigate('DetailCourse', { course });
    }, [navigation]);

    const Header = ({ name }) => (
        <RowComponent style={{ justifyContent: 'space-between', width: wp(90) }}>
            <View style={{ width: wp(60) }}>
                <Text style={styles.titHeader}>{t('hi')}, {name}</Text>
                <Text style={styles.titDetail}>{t('today')}</Text>
            </View>
            <Pressable>
                <Image source={require("./../../../assets/NOTIFICATIONS.png")} resizeMode='contain' />
            </Pressable>
        </RowComponent>
    );

    const Search = () => (
        <RowComponent style={styles.search}>
            <SearchNormal1 size={FontSize.buttonMedium_size} color={Color.colorBlack} />
            <TextInput
                style={styles.input}
                placeholder={t('search')}
                onChangeText={(text) => {
                    const filteredCourses = listCourse.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
                    setFilteredCourses(filteredCourses);
                }}
            />
            <Image source={require('./../../../assets/FILTER.png')} />
        </RowComponent>
    );

    const TagList = () => (
        <FlatList
            bounces={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={listCategory}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
                <Tag
                    title={item}
                    onPress={() => handleCategoryPress(item)}
                    status={trackCourse === item}
                />
            )}
        />
    );

    const CourseList = () => (
        <FlatList
            bounces={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={List}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <CardCourse
                    title={item?.title}
                    url={{ uri: item.image }}
                    category={item.category}
                    onPress={() => handleCoursePress(item)}
                />
            )}
        />
    );

    const CardCourse = ({ url, title, category, onPress }) => (
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
                    justifyContent: 'space-between', width: wp(50),
                    padding: 0
                }}>
                    <Text style={styles.textCategory}>{category}</Text>
                    <SaveAdd size={FontSize.buttonMedium_size} color={Color.globalApp} />
                </RowComponent>

            </View>
        </Pressable>
    );

    return (
        loading ? <LoadingView /> :
            <ScrollView style={styles.home} showsVerticalScrollIndicator={false} bounces={false}>
                <Container style={styles.container}>
                    <Header name={'Dat (FPT)'} />
                    <Search />
                    <View>
                        <RowComponent style={{ justifyContent: 'space-between', width: wp(90) }}>
                            <Text style={styles.popular}>{t('popular')}</Text>
                            <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.sellAll}>{t('sell')}</Text>
                                <ArrowRight2 size={FontSize.size_lg} color={Color.globalApp} />
                            </Pressable>
                        </RowComponent>
                        <TagList />
                        {searchCourse && searchCourse.length > 0 ? <CourseList /> : <CourseList />}
                        <Text style={[styles.notification]}>{t('notifications')}</Text>
                        <SlideShow dataImage={images} />
                    </View>
                </Container>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        width: wp(100),
        backgroundColor: Color.colorGhostwhite
    },
    container: {
        width: wp(90),
        alignSelf: 'center',
        ...(Platform.OS === 'ios' && { paddingTop: 20 }),
        backgroundColor: Color.colorGhostwhite
    },
    header: {
        justifyContent: 'space-between',
        width: wp(90)
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
        justifyContent: 'space-between'
    },
    tag: {
        maxWidth: wp(30),
        height: hp(5),
        backgroundColor: Color.globalApp,
        borderRadius: 15
    },
    textTag: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.primaryWhite,
        alignSelf: 'center',
        lineHeight: hp(5)
    },
    textCategory: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorOrangered,
        marginTop: 10
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
        marginRight: 20
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
        marginTop: 20
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
    }

});

export default Home;
