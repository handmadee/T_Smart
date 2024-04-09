// SpecialOfferSwitch.js
import React from "react";
import { Text, Switch, StyleSheet, Platform } from "react-native";
import { RowComponent } from "../components/RowComponent";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";

const SpecialOfferSwitch = React.memo(({ title, status, toggleSwitch }) => (
    <RowComponent style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Switch
            thumbColor={status ? Color.globalApp : "#E8F1FF"}
            trackColor={{ false: "grey", true: '#91d9ba' }}
            ios_backgroundColor={'grey'}
            onValueChange={toggleSwitch}
            value={status}
            style={Platform.OS !== 'ios' && { transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} />
    </RowComponent>
));

const styles = StyleSheet.create({
    container: { width: '90%', justifyContent: 'space-between' },
    title: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.buttonMedium_size,
        color: Color.colorGray_100,
    }
});

export default SpecialOfferSwitch;
