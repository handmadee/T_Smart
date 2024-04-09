import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Pressable, SafeAreaView, Dimensions, Alert } from "react-native"; // Thêm Alert từ 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import { Color } from "../../../GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const VideoScreen = () => {
    const VideoPlayer = useRef();
    const [duration, setDuration] = useState(() => {
        VideoPlayer.current?.getDuration().then((dur) => dur)
    });
    const [currentTime, setCurrentTime] = useState(0);
    const [isWatched, setIsWatched] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [initialDuration, setInitialDuration] = useState(0);

    useEffect(() => {
        const interval = setInterval(async () => {
            const time = await VideoPlayer.current?.getCurrentTime();
            setCurrentTime(Math.floor(time));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (initialDuration > 0 && currentTime >= initialDuration * 0.75) {
            console.log('Yub')
            setIsWatched(true);
        }
    }, [currentTime, initialDuration]);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setIsWatched(true);
            Alert.alert("Video has finished playing!");
        }
    }, []);

    const handleBackHome = () => {
        // Xử lý điều hướng quay lại trang chủ
    };

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <YoutubePlayer
                ref={VideoPlayer}
                width={300}
                height={300}
                videoId={"4gdAEy40_gU"}
                play={isPlaying}
                onStateChange={onStateChange}
                onReady={async () => {
                    const initialDur = await VideoPlayer.current?.getDuration();
                    setDuration(initialDur);
                }}
            />
            <View>
                <Text>Current Time: {currentTime}</Text>
                <Text>Duration: {duration}</Text>
            </View>
            {isWatched && (
                <Pressable
                    style={{
                        position: 'absolute',
                        bottom: hp(5),
                        backgroundColor: Color.colorDarkgray,
                        padding: 10,
                        borderRadius: 10,
                    }}
                    onPress={handleBackHome}
                >
                    <Text style={{ color: 'white' }}>Back Home</Text>
                </Pressable>
            )}

        </SafeAreaView>
    );
};
