import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color } from '../../GlobalStyles';
import LazyImage from '../components/LazyImage';

const SlideShow = ({ dataImage }) => {
    const images = dataImage || [];
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const currentIndex = useRef(0);
    const nextSlide = () => {
        const nextIndex = (currentIndex.current + 1) % images.length;
        flatListRef.current?.scrollToOffset({
            offset: nextIndex * wp(90),
            animated: true,
        });
        currentIndex.current = nextIndex;
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.slide}>
            <FlatList
                ref={flatListRef}
                horizontal
                data={images}
                renderItem={({ item }) => (
                    <LazyImage url={item} width={wp(90)} height={hp(20)} />
                )}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            />

            <View style={styles.dotContainer}>
                {images.map((_, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                opacity: scrollX.interpolate({
                                    inputRange: [
                                        wp(100) * (index - 1),
                                        wp(100) * index,
                                        wp(100) * (index + 1),
                                    ],
                                    outputRange: [0.3, 1, 0.3],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        marginTop: 20,
        width: wp(90),
        alignSelf: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: hp(25),
    },
    dotContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Color.globalApp,
        marginHorizontal: 5,
    },
});

export default SlideShow;