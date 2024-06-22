'use strict';

import React, { useCallback, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontFamily, FontSize, Color } from "../../../GlobalStyles";
import { Container } from "../../components/Container";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import { PlaySound } from "../../contanst/PlaySound";
import AlertNotification from "../../components/AlertNotification";
import { BackHandler } from 'react-native';




const Quiz = ({ navigation, route }) => {
    const quizData = route.params.quizData;
    const time = route.params.time || 10;
    const timlet = Math.floor((time * 60) / quizData.length);
    const [isShow, setIsShow] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timlet);
    // Sound mp3 
    const SELECT_SOUND = 'select.mp3';

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            setIsShow(true);
            return true;
        });
        return () => {
            backHandler.remove();
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                if (currentQuestion < quizData.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                    setTimeLeft(timlet);
                } else {
                    handlerTheEnd();
                }
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [currentQuestion, timeLeft]);

    const handleAnswer = (selectedOption) => {
        PlaySound(SELECT_SOUND)
        if (selectedOption?.isCorrect) {
            setScore(score + 1);
        }
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(timlet);
        } else {
            return handlerTheEnd();
        }
    };

    const handerEnd = useCallback(() => {
        if (quizData.length - 1 > currentQuestion) {
            setIsShow(true);
        }
    }, [])


    const handlerTheEnd = () => {
        setIsShow(false);
        navigation.navigate('ResuftTest', { total: quizData.length, score: score, coins: score * 10, data: quizData });
    }
    const MemoizedQuestion = React.memo(({ question, manyAnswers, current, end, image = "" }) => {
        return (
            <View>
                {/*The end*/}
                <TouchableOpacity
                    onPress={handerEnd}
                    style={styles.btnEnd}
                >
                    <Text
                        style={{
                            color: Color.primaryWhite,
                            fontSize: FontSize.buttonMedium_size,
                            fontFamily: FontFamily.mulishBold,
                        }}
                    >
                        Kết thúc
                    </Text>
                </TouchableOpacity>
                {/* Count Question */}
                <Text style={styles.numberOf}>
                    {current + 1} of {end}
                </Text>
                {/* Progress Bar */}
                <Progress.Bar
                    animationType="timing"
                    color={Color.globalApp}
                    progress={timeLeft / timlet} width={wp(90)} />
                <Text style={styles.title}>{question}</Text>
                {image && <Image source={{ uri: image }} style={styles.image} />}
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
                {/* Aleart */}
            </View>
        );
    });

    return (
        <View style={styles.container}>
            <Container style={styles.viewContain}>
                {
                    quizData && quizData.length ? (
                        <MemoizedQuestion
                            question={quizData[currentQuestion].question}
                            manyAnswers={quizData[currentQuestion].answers}
                            current={currentQuestion}
                            end={quizData.length}
                        />
                    ) : <Text>Dữ liệu bài kiểm tra đang được cập nhật</Text>
                }

            </Container>
            <AlertNotification
                title="Thông báo"
                value="Bạn có muốn kết thúc bài kiểm tra không?"
                isVisible={isShow}
                isPress={true}
                txtBtn1="Tiếp tục làm bài"
                txtBtn2="Kết thúc bài "
                onPress={() => setIsShow(false)}
                onPress2={handlerTheEnd}

            />
            {/* {quizCompleted && <ResuftTest score={score}
                total={quizData.length}
                showAswer={handlerShowAnswer} handlerHome={handlerHome} />} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.colorGhostwhite,
        paddingTop: hp(2)
    },
    numberOf: {
        color: Color.inkDarkGray,
        fontSize: FontSize.size_2xl,
        fontFamily: FontFamily.mulishBold,
        marginBottom: 10,
        textAlign: 'center'
    },
    title: {
        color: '#3C3A36',
        fontSize: FontSize.size_2xl,
        fontFamily: FontFamily.mulishBold,
        textAlign: 'center',
        marginBottom: 10,
        width: wp(85),
        alignSelf: 'center',
        marginTop: hp(2)
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
    },
    btnEnd: {
        backgroundColor: Color.globalApp,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        width: wp(30),
        alignItems: 'center',
        alignSelf: 'flex-end'
    }
});


export default Quiz;
