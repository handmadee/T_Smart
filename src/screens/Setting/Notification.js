
import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from "../../../GlobalStyles";
import { RowComponent } from "../../components/RowComponent";
import SpecialOfferSwitch from '../../contanst/Switch';
export default function Notification() {
    const [isEnabled, setIsEnabled] = React.useState(true);
    const [Sound, setSound] = React.useState(true);
    const [Vibrate, setIsVibrate] = React.useState(false);
    const [Notification, setIsNotification] = React.useState(true);
    const [isDiscount, setIsDiscount] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(true);
    const [Service, setIsService] = React.useState(false);


    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const togglesetSound = () => setSound(previousState => !previousState);
    const toggleVibrate = () => setIsVibrate(previousState => !previousState);
    const toggleNotification = () => setIsNotification(previousState => !previousState);
    const toggleisDiscount = () => setIsDiscount(previousState => !previousState);
    const toggleisUpdate = () => setIsUpdate(previousState => !previousState);
    const toggleService = () => setIsService(previousState => !previousState);



    return (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <SpecialOfferSwitch title={'Special Offers'} status={isEnabled} toggleSwitch={toggleSwitch} />
            <SpecialOfferSwitch title={'Sound'} status={Sound} toggleSwitch={togglesetSound} />
            <SpecialOfferSwitch title={'Vibrate'} status={Vibrate} toggleSwitch={toggleVibrate} />
            <SpecialOfferSwitch title={'General Notification'} status={Notification} toggleSwitch={toggleNotification} />
            <SpecialOfferSwitch title={'Promo & Discount'} status={isDiscount} toggleSwitch={toggleisDiscount} />
            <SpecialOfferSwitch title={'App Update'} status={isUpdate} toggleSwitch={toggleisUpdate} />
            <SpecialOfferSwitch title={'New Service Available'} status={Service} toggleSwitch={toggleService} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.buttonMedium_size,
        color: Color.colorGray_100,
    }
});