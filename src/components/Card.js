/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image } from 'react-native';

const Card = ({ title, imageSource, description, style }) => (
    <View style={style}>
        <Image source={imageSource} />
        <Text>{title}</Text>
        <Text>{description}</Text>
    </View>
);

export default Card;
