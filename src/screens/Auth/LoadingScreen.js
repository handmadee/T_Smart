/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Text, View } from "react-native";
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { Color } from "../../../GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const LoadingView = () => {
    const { t } = useTranslation();
    return (
        <View style={{
            flex: 1, justifyContent: 'center',
            alignItems: 'center', flexDirection: 'column'
        }}>
            <LottieView source={require('./../../../assets/loading.json')} autoPlay loop
                style={{ width: wp(75), height: hp(25) }}
            />
            <Text style={{ fontSize: 20, color: Color.colorGray_200, fontWeight: 'bold', marginTop: 5 }}>{t('loading')}</Text>
        </View>
    )
}
export default LoadingView;
