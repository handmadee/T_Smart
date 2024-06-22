import React, { useCallback, useState } from 'react';
import { View, Text, Pressable, Image, TextInput, FlatList, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { SaveAdd, Clock } from 'iconsax-react-native';
import { searchCourse } from '../../apis/courseApi';
import LoadingView from '../Auth/LoadingScreen';

const SearchCourse = ({ navigation }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    const handleCoursePress = useCallback((course) => {
        navigation.navigate('DetailCourse', { course });
    }, [navigation]);

    const searchCourseHandler = useCallback(async () => {
        try {
            if (keyword.trim() === '') return;
            const response = await searchCourse(keyword);
            setSearchResults(response.data.data);
            setSearchHistory(prevHistory => {
                if (prevHistory.includes(keyword)) {
                    return prevHistory;
                } else {
                    let newHistory = [...prevHistory, keyword];
                    // Only keep the last 3 search histories
                    if (newHistory.length > 3) {
                        newHistory = newHistory.slice(-3);
                    }
                    return newHistory;
                }
            });
        } catch (error) {
            console.error('Error searching courses:', error);
        }
    }, [keyword]);

    const handleSearchPress = useCallback(() => {
        if (keyword.trim().length >= 2) {
            searchCourseHandler();
        } else {
            alert('Từ khoá quá ngắn vui lòng nhập > 2 kí tự')
        }
    }, [searchCourseHandler, keyword]);

    const deleteSearchHistoryItem = (itemToDelete) => {
        setSearchHistory(prevHistory => prevHistory.filter(item => item !== itemToDelete));
    };
    const renderSearchHistoryItem = ({ item }) => (
        <View style={styles.historyItemContainer}>
            <TouchableOpacity onPress={() => {
                setKeyword(item);
                searchCourseHandler();
            }}>
                <Text style={styles.historyItem}>{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteSearchHistoryItem(item)}>
                <Image source={require('./../../../assets/trash.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        </View>
    );

    const CardCourse = ({ url, title, category, onPress, time = 145 }) => (
        <Pressable style={styles.card} onPress={onPress}>
            <Image style={styles.courseImage} resizeMode='stretch' source={url} />
            <View style={styles.cardDetail}>
                <Text style={styles.courseTitle}>{title}</Text>
                <View style={styles.courseInfo}>
                    <Text style={styles.textCategory}>{category}</Text>
                    <View style={styles.timeAndSave}>
                        <View style={styles.timeContainer}>
                            <Clock size={FontSize.buttonMedium_size} color={Color.globalApp} />
                            <Text style={styles.timeText}>{`${time} hour`}</Text>
                        </View>
                        <SaveAdd size={FontSize.size_2xl} color={Color.globalApp} />
                    </View>
                </View>
            </View>
        </Pressable>
    );

    return (
        loading ? <LoadingView /> :
            <View style={styles.container}>
                {/* Search */}
                <View style={styles.search}>
                    <TextInput
                        style={styles.input}
                        placeholder={t('search')}
                        onChangeText={setKeyword}
                        value={keyword}
                        onSubmitEditing={handleSearchPress}
                    />
                    <TouchableOpacity onPress={handleSearchPress}>
                        <Image source={require('./../../../assets/btnSearch.png')} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                </View>
                {/* History  */}
                <View style={styles.historyContainer}>
                    <Text style={styles.historyTitle}>{t('History Search')}</Text>
                    <FlatList
                        data={searchHistory}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderSearchHistoryItem}
                        keyboardShouldPersistTaps='always'
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>{t('popular')}</Text>
                    <FlatList
                        data={searchResults}
                        numColumns={2}
                        keyExtractor={(item) => item._id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CardCourse
                                title={item.title}
                                url={{ uri: item.imageCourse }}
                                category={item?.nameCategory}
                                onPress={() => handleCoursePress(item)}
                            />
                        )}
                    />
                </View>
            </View>
    );
};

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
        flex: 1,
        marginLeft: wp(2),
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorDimgray_200,
    },
    content: {
        flex: 1,
    },
    sectionTitle: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_mid,
        color: Color.colorGray_100,
        marginBottom: hp(1),
    },
    card: {
        width: wp(43),
        height: hp(26),
        borderRadius: 15,
        overflow: 'hidden',
        marginRight: wp(4),
        marginBottom: hp(2),
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            }
        })

    },
    courseImage: {
        width: wp(43),
        height: hp(15),
    },
    cardDetail: {
        padding: wp(3),
        backgroundColor: Color.primaryWhite,
    },
    courseTitle: {
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.size_mini,
        color: Color.colorGray_100,
        marginBottom: hp(1),
    },
    courseInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textCategory: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorOrangered,
    },
    timeAndSave: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: wp(4),
    },
    timeText: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorDimgray_100,
        marginLeft: wp(1),
    },
    historyContainer: {
        marginTop: hp(2),
    },
    historyTitle: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_mid,
        color: Color.colorGray_100,
        marginBottom: hp(1),
    },
    historyItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1.5),
    },
    historyItem: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_smi,
        color: Color.colorGray_100,
        marginBottom: hp(1),
    },
    deleteButton: {
        color: 'red',
    },
});

export default SearchCourse;