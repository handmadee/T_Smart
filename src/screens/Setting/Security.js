
import React from "react";
import { View, Text, StyleSheet, Switch, Pressable } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from "../../../GlobalStyles";
import { RowComponent } from "../../components/RowComponent";
import SpecialOfferSwitch from '../../contanst/Switch';
import { SettingsItem } from './ProfileSetting';
import { User } from "iconsax-react-native";
import Button from "../../components/Button";

export default function Security() {
    const [Remember, setIsRemember] = React.useState(true);
    const [Biometric, setBiometric] = React.useState(true);
    const [Face, setIsFace] = React.useState(false);


    const toggleRemember = () => setIsRemember(previousState => !previousState);
    const toggleBiometric = () => setBiometric(previousState => !previousState);
    const toggleFace = () => setIsFace(previousState => !previousState);




    return (
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
            <View>
                <SpecialOfferSwitch title={'Remember Me'} status={Remember} toggleSwitch={toggleRemember} />
                <SpecialOfferSwitch title={'Biometric ID'} status={Biometric} toggleSwitch={toggleBiometric} />
                <SpecialOfferSwitch title={'Face ID'} status={Face} toggleSwitch={toggleFace} />
            </View>
            <View style={{ marginBottom: hp(10) }}>
                <Pressable style={styles.btn}>
                    <Text style={styles.title}>Change PIN</Text>
                </Pressable>
                <Button title={"Change Password"} />
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        width: wp(90),
        height: hp(7),
        padding: wp(2),
        borderRadius: 30,
        borderColor: Color.colorGray_100,
        borderWidth: .5,
    },
    title: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_lg,
        color: Color.colorGray_100,
        textAlign: 'center',
        lineHeight: hp(5)
    }
});