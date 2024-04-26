import React, { useCallback, useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontFamily, FontSize, Color } from "../../../GlobalStyles";
import { Container } from "../../components/Container";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PlaySound } from "../../contanst/PlaySound";
import LoadingView from "../Auth/LoadingScreen";
import { FinishQuiz } from "../../apis/trackingQuiz";
import { useSelector } from "react-redux";

const PlayQuiz = ({ navigation, route }) => {
    const selectSound = 'select.mp3';
    const correctSound = 'is_correct.mp3';
    const incorrectSound = 'is_wrong.mp3';
    const idUser = useSelector(state => state.authReducer?.authData?.id);
    const { id } = route.params;
    const quizData = route.params?.quizData;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [loading, SetLoadding] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                if (currentQuestion < quizData.length - 1) {
                    handleNext();
                    setShowAnswer(true);
                    setTimeLeft(10);
                } else {
                    setShowAnswer(true);
                }
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [currentQuestion, timeLeft]);

    const handleAnswer = (selectedOption) => {
        PlaySound(selectSound);
        setSelectedAnswer(selectedOption);
    };

    const handleResult = async (data) => {
        console.log(data)
        try {
            SetLoadding(true);
            await FinishQuiz({
                userID: idUser,
                quizID: data?.id,
                Score: data?.score
            })
            navigation.navigate('ShowAnswer', { data: data });
        } catch (error) {
            console.log(error)
        } finally {
            SetLoadding(true)
        }
    };

    const handleNext = () => {
        if (selectedAnswer?.isCorrect) {
            PlaySound(correctSound);
            setScore(score + 1);
        } else {
            PlaySound(incorrectSound);
        }
        setShowAnswer(true);
    };

    const MemoizedQuestion = React.memo(({ image, question, manyAnswers, current, end }) => {
        return (
            <View>
                <View style={styles.timeLeft}>
                    <Text style={[styles.title, { color: Color.primaryWhite, marginBottom: 0 }]}>{timeLeft}</Text>
                </View>

                <Text style={styles.numberOf}>
                    {current + 1} of {end}
                </Text>

                <Text style={styles.title}>{question}</Text>
                {image && <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />}
                {manyAnswers.map((item, index) => (
                    <Pressable
                        key={index}
                        style={[
                            styles.input,
                            selectedAnswer?.titleAnswer === item?.titleAnswer && styles.selectedAnswer,
                            showAnswer && correctAnswer === item?.titleAnswer && styles.correctAnswer
                        ]}
                        onPress={() => handleAnswer(item)}
                    >
                        <Text style={styles.answer}>{String.fromCharCode(65 + index)}. </Text>
                        <Text style={styles.answer}>{item?.titleAnswer}</Text>
                    </Pressable>
                ))}
            </View>
        );
    });

    useEffect(() => {
        if (showAnswer) {
            const correctIndex = quizData[currentQuestion]?.answer.findIndex(answer => answer.isCorrect);
            setCorrectAnswer(quizData[currentQuestion]?.answer[correctIndex]?.titleAnswer);
            const timer = setTimeout(() => {
                setSelectedAnswer(null);
                setShowAnswer(false);
                if (currentQuestion < quizData.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                    setTimeLeft(10);
                } else {
                    handleResult({
                        id,
                        quizData,
                        score,
                        total: quizData.length
                    });
                }
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showAnswer]);

    return (
        loading ? <LoadingView /> : <SafeAreaView style={styles.container}>
            <Container style={styles.viewContain}>
                <MemoizedQuestion
                    image={quizData[currentQuestion]?.imageQuestion}
                    question={quizData[currentQuestion]?.title}
                    manyAnswers={quizData[currentQuestion]?.answer}
                    current={currentQuestion}
                    end={quizData.length}
                />
                <TouchableOpacity
                    style={[styles.btnContainer, { backgroundColor: 'green' }]}
                    onPress={() => handleNext()}
                    disabled={showAnswer}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </Container>
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
    btnContainer: {
        marginTop: hp(3),
        width: wp(43),
        height: hp(8),
        backgroundColor: Color.colorOrangered,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: Color.primaryWhite,
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.buttonMedium_size + 4,
    },
    selectedAnswer: {
        backgroundColor: 'green',
    },
    correctAnswer: {
        backgroundColor: 'lightgreen',
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

export default PlayQuiz;
