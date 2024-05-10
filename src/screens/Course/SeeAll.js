
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';;
import { RowComponent } from '../../components/RowComponent';
import { AlignBottom, Clock, SaveAdd, Filter, AlignTop } from 'iconsax-react-native';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { useTranslation } from 'react-i18next';
import { getPageCourse, searchCourse } from '../../apis/courseApi';
import * as Progress from 'react-native-progress';
import { Modalize } from 'react-native-modalize';
import { getLowCourse, getTopCourse } from '../../apis/trackingCourse';


const SeeCourse = ({ navigation }) => {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('');
    const modalizeRef = useRef(null);
    // Lọc khoá học được nhiều học sinh học nhất 
    const handlerTopCourse = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getTopCourse();
            setData(response?.data?.data?.data);

        } catch (error) {
            console.log(error)
        } finally {
            modalizeRef.current?.close();
            setLoading(false);
        }
    }, []);
    // Lọc khoá học được ít học sinh học nhất
    const handlerBottomCourse = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getLowCourse();
            setData(response?.data?.data?.data);

        } catch (error) {
            console.log(error)
        } finally {
            modalizeRef.current?.close();
            setLoading(false);
        }
    }, []);

    // Search course
    const headerSearch = async (text) => {
        try {
            setLoading(true);
            const response = await searchCourse(text);
            setData(response?.data?.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        headerSearch(keyword)
    }, [keyword]);

    useEffect(() => {
        const fetchCouse = async () => {
            try {
                setLoading(true);
                const response = await getPageCourse(page);
                setTotalPage(response?.data?.data?.totalPages);
                const newData = response?.data?.data?.courses;
                if (newData) {
                    const combinedData = [...data, ...newData];
                    const uniqueData = Array.from(new Set(combinedData.map(JSON.stringify))).map(JSON.parse);
                    setData(uniqueData);
                }
            } catch (error) {
                console.error('Failed to fetch page course:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCouse();
    }, [page]);
    const CourseList = ({ data }) => (
        <FlatList
            bounces={false}
            numColumns={1}
            onEndReached={
                () => {
                    return totalPage > page ? setPage(page + 1) : ''
                }
            }
            onEndReachedThreshold={1}
            data={data}
            showsVerticalScrollIndicator={false}
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
                resizeMode='stretch'
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

    const handleCoursePress = (course) => {
        navigation.navigate('DetailCourse', { course });
    };
    const onOpenModal = (e) => {
        e.persist();
        return modalizeRef.current?.open();
    };

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput
                    style={styles.input}
                    placeholder={t('search')}
                    onChangeText={(text) => setKeyword(text)}
                    value={keyword}
                />
                <TouchableOpacity
                    onPress={onOpenModal}
                    style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 5,
                        borderRadius: 10,
                        backgroundColor: 'hsl(205, 74%, 52%)'
                    }}>
                    <Filter size="32" color="#fff" variant="Bold" />
                </TouchableOpacity>

            </View>
            {/* Render Course */}
            <CourseList data={data} />
            {/* Loading view */}
            {
                loading &&
                <View style={{
                    height: hp(7.5),
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Progress.Circle size={30} animated={true} color='black' borderWidth={3} />
                    <Text>Loading ... </Text>
                </View>
            }
            {/*  */}
            {/* Modal */}
            <Modalize
                ref={modalizeRef}
                modalHeight={200}
                handlePosition="outside"
                modalStyle={{
                    backgroundColor: 'white',

                }}

            >
                <View
                    onTouchStart={(e) => {
                        e.persist();
                    }}
                    style={{
                        flex: 1,
                        height: 200,
                        flexDirection: 'column',
                        justifyContent: 'space-evenly', alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        onPress={handlerTopCourse}
                        style={styles.control} >
                        <AlignBottom size="32" color="#fff" variant="Bold" />
                        <Text style={{
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: 16
                        }}>Lọc khoá học phổ biến nhất</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handlerBottomCourse}
                        style={styles.control} >
                        <AlignTop size="32" color="#fff" variant="Bold" />
                        <Text style={{
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: 16
                        }}>Lọc khoá học độ phổ biến thấp</Text>
                    </TouchableOpacity>


                </View>
            </Modalize>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: hp(2),
        flex: 1,
        paddingHorizontal: wp(5),
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2),
        backgroundColor: Color.primaryWhite,
        borderRadius: 12,
        paddingVertical: hp(1),
        paddingHorizontal: wp(3),
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            }
        })
    },
    input: {
        width: wp(70),
        marginLeft: wp(2),
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorDimgray_200,
    },
    courseMeta: {
        alignItems: 'center',
        padding: 0,
        width: '100%',
        marginTop: 10
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
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
    textCategory: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorOrangered,
    },
    courseTitle: {
        fontFamily: FontFamily.poppinsSemiBold,
        fontSize: 16,
        color: Color.colorGray_100,
        textTransform: 'uppercase'

    },
    card: {
        borderRadius: 12,
        width: wp(90),
        height: hp(15),
        marginTop: 20,
        backgroundColor: Color.primaryWhite,
        flexDirection: 'row',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            }
        })


    },
    courseImage: {
        width: wp(40),
        height: '100%',
        borderRadius: 12,
    },
    cardDetail: {
        width: wp(50),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 5,
    },
    control: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '70%',
        height: hp(8),
        borderRadius: 20,
        backgroundColor: 'hsl(205, 74%, 52%)',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            }
        })
    }
});





export default SeeCourse;


