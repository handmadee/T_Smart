;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const LazyImage = ({ url, width = 100, height = 100, style, resize = 'stretch' }) => {
    if (!url) return null;
    const styles = StyleSheet.create({
        container: {
            width: width,
            height: height,
            position: 'relative',
        },
        image: {
            width: '100%',
            height: '100%',
            ...style
        },
    });
    return (
        <View style={styles.container}>
            <FastImage
                style={styles.image}
                source={{
                    uri: url,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={resize}
                blurRadius={1}
            />
        </View>
    );
};



export default LazyImage;

