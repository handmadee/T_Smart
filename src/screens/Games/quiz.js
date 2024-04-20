'use strict';

import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { FontFamily, FontSize, Color } from "../../../GlobalStyles";
import { Container } from "../../components/Container";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { dataQuiz } from '../../data/data';
import ResuftTest from './ResuftQuiz';
import Button from "../../components/Button";

const Quiz = ({ navigation, route }) => {
    const quizData = route.params.quizData;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                if (currentQuestion < quizData.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                    setTimeLeft(10);
                } else {
                    setQuizCompleted(true);
                }
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [currentQuestion, timeLeft]);

    const handleAnswer = (selectedOption) => {
        if (selectedOption?.isCorrect) {
            setScore(score + 1);
        }
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(10);
        } else {
            setQuizCompleted(true);
        }
    };

    const handleRetest = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizCompleted(false);
        setTimeLeft(10);
    };

    const handlerShowAnswer = () => {
        setQuizCompleted(false);
        return navigation.navigate('ShowAnswer', { data: quizData });
    };

    const handlerHome = useCallback(() => navigation.goBack());

    const MemoizedQuestion = React.memo(({ question, manyAnswers, current, end }) => {
        return (
            <View>
                <View style={[styles.timeLeft]}>
                    <Text style={[styles.title, {
                        color: Color.primaryWhite,
                        marginBottom: 0
                    }]}>{timeLeft}</Text>
                </View>

                <Text style={styles.numberOf}>
                    {current + 1} of {end}
                </Text>

                <Text style={styles.title}>{question}</Text>

                <Image source={require('./../../../assets/quiz.png')} style={styles.image} resizeMode="cover" />
                {manyAnswers.map((item, index) => (
                    <Pressable
                        key={index}
                        style={[styles.input]}
                        onPress={() => handleAnswer(item)}
                    >
                        <Text style={styles.answer}>{String.fromCharCode(65 + index)}. </Text>
                        <Text style={styles.answer}>{item?.titleAnswer}</Text>
                    </Pressable>
                ))}
            </View>
        );
    });

    return (
        <SafeAreaView style={styles.container}>
            <Container style={styles.viewContain}>
                <MemoizedQuestion
                    question={quizData[currentQuestion].question}
                    manyAnswers={quizData[currentQuestion].answers}
                    current={currentQuestion}
                    end={quizData.length}
                />
            </Container>
            {quizCompleted && <ResuftTest score={score}
                total={quizData.length}
                showAswer={handlerShowAnswer} handlerHome={handlerHome} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.colorGhostwhite,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberOf: {
        color: Color.inkDarkGray,
        fontSize: FontSize.buttonMedium_size,
        fontFamily: FontFamily.mulishBold,
        marginBottom: 10,
        textAlign: 'center'
    },
    title: {
        color: '#3C3A36',
        fontSize: FontSize.headingH4_size,
        fontFamily: FontFamily.mulishBold,
        textAlign: 'center',
        marginBottom: 10,
        width: wp(85),
        alignSelf: 'center'
    },
    image: {
        width: wp(90),
        height: hp(23),
        borderRadius: 15,
        alignSelf: 'center',
        marginBottom: 10
    },
    input: {
        width: wp(90),
        height: hp(8),
        padding: wp(3),
        backgroundColor: Color.primaryWhite,
        borderRadius: 12,
        color: Color.colorDimgray_200,
        fontFamily: FontFamily.mulishBold,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#BEBAB3',
        borderWidth: 1,
        marginVertical: hp(1)
    },
    viewContain: {
        backgroundColor: Color.colorGhostwhite,
        flexDirection: 'column',
        alignItems: 'center',
    },
    answer: {
        color: Color.colorGraySilver,
        fontSize: FontSize.buttonMedium_size,
        fontFamily: FontFamily.mulishBold,
        textAlign: 'center',
    },
    btnContai: {
        marginTop: hp(3),
        width: wp(43),
        height: hp(8),
        backgroundColor: Color.colorOrangered,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ctnBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: wp(90) },
    selectedAnswr: {
        backgroundColor: Color.globalApp,
        opacity: .7,
        borderColor: Color.colorOrangered
    },
    timeLeft: {
        width: wp(10),
        height: wp(10),
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.globalApp
    }
});

export default Quiz;
