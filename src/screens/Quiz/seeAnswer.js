import React, { useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { dataQuiz } from '../../data/data';
import Button from '../../components/Button';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';

const AnswerItem = React.memo(({ item, index }) => (
    <View style={styles.answerContainer}>
        <View style={styles.questionContainer}>
            <Text style={styles.questionNumber}>Question {index + 1}:</Text>
            <Text style={[styles.questionText, { flexWrap: 'wrap', width: '70%' }]}>
                {item?.title}</Text>
        </View>
        <Text style={[styles.correctAnswer, { width: '95%' }]}>Correct Answer: {
            item.answer.find((answer) => answer.isCorrect)?.titleAnswer
        }</Text>
    </View>
));

export const ViewAnswer = ({ navigation, route }) => {
    const quizData = route.params?.data ?? [];
    const handlerBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>QUIZ ANSWER</Text>
            <FlatList
                style={{ width: '100%' }}
                contentContainerStyle={{ padding: 16 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
                data={quizData}
                renderItem={({ item, index }) => <AnswerItem item={item} index={index} />}
                keyExtractor={(item, index) => index.toString()}
            />
            <Button title={'Back'} onPress={handlerBack} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: wp(5),
        paddingVertical: hp(2)
    },
    title: {
        color: Color.inkDarkGray,
        fontSize: FontSize.headingH4_size,
        fontFamily: FontFamily.mulishBold,
        marginBottom: hp(2)
    },
    answerContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: hp(1),
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8
    },
    questionContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: hp(1)
    },
    questionNumber: {
        color: Color.colorGraySilver,
        fontSize: FontSize.buttonMedium_size,
        fontFamily: FontFamily.mulishBold,
    },
    questionText: {
        color: Color.inkDarkGray,
        fontSize: FontSize.buttonMedium_size,
        fontFamily: FontFamily.mulishSemiBold,
        marginLeft: wp(2)
    },
    correctAnswer: {
        color: 'green',
        fontSize: FontSize.buttonMedium_size,
        fontFamily: FontFamily.mulishBold,
        fontWeight: 'bold'
    }
});
