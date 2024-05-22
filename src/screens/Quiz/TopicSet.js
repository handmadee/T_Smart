import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, Pressable, FlatList, SafeAreaView, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container } from '../../components/Container';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { Clock } from 'iconsax-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getQuestion, getQuiz, getQuizByCategory, getQuizByLevel, startQuiz } from '../../apis/trackingQuiz';
import LoadingView from '../Auth/LoadingScreen';
import AlertNotification from '../../components/AlertNotification';
import { useSelector } from 'react-redux';



const levelMap = {
    111: 'Dễ',
    112: 'Trung Bình',
    113: 'Khó',
};

export default function TopicSet({ navigation, route }) {
    const initialData = route.params.data;
    const idUser = useSelector(state => state.authReducer?.authData?.id);
    const [loading, setLoading] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [isContain, setIsContain] = useState(false)
    const [isPremission, setIsPermission] = useState(false)
    const [data, setData] = useState(initialData);
    const [open, setOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(999);
    const [quizNow, setQuizNow] = useState(null);
    const levelItems = [
        { label: 'Tất Cả', value: 999 },
        { label: 'Dễ', value: 111 },
        { label: 'Trung Bình', value: 112 },
        { label: 'Khó', value: 113 },
    ];
    useEffect(() => {
        fetchData();
    }, [selectedLevel]);

    const fetchData = async () => {
        console.log(selectedLevel)
        setLoading(true);
        try {
            let response;
            if (selectedLevel == 999) {
                response = await getQuizByCategory(initialData?.id);
                console.log(response)
                console.log(response?.data?.data?.quizes)
                setData(response?.data?.data?.quizes || []);
            } else {
                response = await getQuizByLevel(initialData?.id, selectedLevel);
                console.log(response?.data?.data)
                setData(response?.data?.data || []);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuizTest = useCallback(async (data) => {
        try {
            setLoading(true);
            const response = await getQuestion(data?.id);
            if (response?.data?.data?.questionQuiz.length == 0) {
                setIsShow(true);
            } else {
                try {
                    await startQuiz({
                        userID: idUser,
                        quizID: data?.id,
                    })
                    const quizData = response?.data?.data?.questionQuiz;
                    const timeQuiz = response?.data?.data?.time || 15;
                    const points = response?.data?.data?.points || 0;
                    return navigation.navigate('Exam', { id: data?.id, quizData, timeQuiz, points });
                } catch (error) {
                    setQuizNow(data?.id);
                    setIsContain(true);
                }
            }
        } catch (error) {
            setIsPermission(true);
        } finally {
            setLoading(false);
        }
    }, []);

    const handlerUnLock = useCallback(async () => {
        ''
    });


    const handlerResetTest = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getQuestion(quizNow);
            const quizData = response?.data?.data?.questionQuiz;
            const timeQuiz = response?.data?.data?.time || 15;
            const points = response?.data?.data?.points || 0;
            return navigation.navigate('Exam', { id: quizNow, quizData, timeQuiz, points });
        } catch (error) {
            console.log(error)
        } finally {
            setIsContain(false);
            setLoading(false);
        }
    }, [quizNow]);

    const renderQuizItem = ({ item }) => {
        return (
            <Pressable
                style={styles.quizItemContainer}
                onPress={() => handleQuizTest({
                    id: item?._id,
                    idCategory: initialData?.id,
                    imageCategory: initialData?.image,
                })}
            >
                <Image
                    source={{ uri: initialData?.image }}
                    style={styles.quizItemImage}
                />
                <View style={styles.quizItemDetails}>
                    <Text style={styles.quizItemTitle}>{item.title}</Text>
                    <View style={styles.quizItemMeta}>
                        <View style={styles.quizItemTime}>
                            <Clock color={Color.colorGray_100} size={13} />
                            <Text style={styles.quizItemTimeText}>{item.time || 15} mins</Text>
                        </View>
                        <View style={styles.quizItemLevel}>
                            <Text style={styles.quizItemLevelText}>Level: </Text>
                            <Text style={[styles.quizItemLevelText, { color: getColorByLevel(item.level) }]}>
                                {levelMap[item.level]}
                            </Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    };

    const getColorByLevel = (level) => {
        switch (level) {
            case '111':
                return Color.colorOrangered;
            case '112':
                return Color.globalApp;
            case '113':
                return 'red';
            default:
                return Color.colorGray_100;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Container width={wp(85)} style={{
                backgroundColor: Color.colorGhostwhite
            }}>
                <View style={styles.headerContainer}>
                    {initialData?.image && (
                        <Image
                            source={{ uri: initialData?.image }}
                            style={styles.headerImage}
                        />
                    )}
                    <Text style={styles.headerTitle}>Tổng hợp các bài quiz test</Text>
                </View>
                <DropDownPicker
                    open={open}
                    value={selectedLevel}
                    items={levelItems}
                    setOpen={setOpen}
                    setValue={setSelectedLevel}
                    placeholder={'Chọn mức độ'}
                    style={styles.dropDownPicker}
                />
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderQuizItem}
                    contentContainerStyle={styles.quizListContainer}
                    showsVerticalScrollIndicator={false}
                />
            </Container>
            {loading && <LoadingView />}
            <AlertNotification
                title={'Sorry '}
                value={'Dữ liệu bài kiểm tra sẽ được chúng tôi  cập nhật sớm nhất !!'}
                isVisible={isShow}
                onPress={() => setIsShow(false)}
                height={hp(30)}
            />
            <AlertNotification
                title={'Hello'}
                value={'Bạn đã từng làm bài kiểm tra này rồi 😇 \n Bạn có muốn làm lại không ?'}
                isVisible={isContain}
                onPress={() => setIsContain(false)}
                isPress={true}
                onPress2={handlerResetTest}
            />
            <AlertNotification
                title={'Tài khoản chưa có quyền truy cập'}
                value={' Vui lòng liên hệ với giảng viên để mở khoá tính năng này 😇  ?'}
                isVisible={isPremission}
                onPress={() => setIsPermission(false)}
                isPress={true}
                txtBtn2='Mở khoá'
                onPress2={handlerUnLock}
            />

        </SafeAreaView>
    );
}

const styles = {
    container: { flex: 1, backgroundColor: Color.colorGhostwhite },
    headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: Color.colorGhostwhite },
    headerImage: { width: wp(15), height: hp(10), resizeMode: 'contain' },
    headerTitle: { fontFamily: FontFamily.poppinsSemiBold, fontSize: FontSize.size_3xl - 5, color: Color.colorGray_100 },
    dropDownPicker: { width: wp(25), height: hp(2), padding: wp(3), backgroundColor: Color.colorOrangered, borderRadius: 10, color: Color.primaryWhite, fontFamily: FontFamily.mulishBold, alignSelf: 'flex-end' },
    quizListContainer: { marginTop: 50, paddingBottom: hp(2) },
    quizItemContainer: { backgroundColor: Color.primaryWhite, elevation: 5, marginBottom: 15, shadowColor: Color.primaryBlack, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 2, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5, borderRadius: 10 },
    quizItemImage: { width: wp(25), height: hp(5), resizeMode: 'contain' },
    quizItemDetails: { flex: 1, marginLeft: wp(3) },
    quizItemTitle: { color: Color.colorOrangered, fontFamily: FontFamily.poppinsSemiBold, fontSize: 13 },
    quizItemMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: hp(1), width: '90%' },
    quizItemTime: { flexDirection: 'row', alignItems: 'center' },
    quizItemTimeText: { fontFamily: FontFamily.mulishBold, fontSize: FontSize.size_mini, color: Color.colorGray_100, marginLeft: wp(1) },
    quizItemLevel: { flexDirection: 'row', alignItems: 'center' },
    quizItemLevelText: { fontFamily: FontFamily.mulishBold, fontSize: FontSize.size_mini },
};


