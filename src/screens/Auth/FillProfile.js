/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
"use strict";
import {
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { Container } from "../../components/Container";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Color, FontFamily, FontSize } from "../../../GlobalStyles";
import Input from "../../components/Input";
import DatePicker from "react-native-date-picker";
import { Paperclip, Calendar } from "iconsax-react-native";
import Button from "../../components/Button";
import DropDownPicker from "react-native-dropdown-picker";
import { launchImageLibrary } from "react-native-image-picker";
import React, { useCallback, useState } from "react";

export const FillIP = React.memo(
    ({
        value,
        onPress,
        placeholder,
        style = {},
        isError = false,
        error = "bạn cần nhập đủ thông tin ?",
    }) => (
        <>
            <TextInput
                placeholder={placeholder}
                style={[
                    styles.input,
                    isError
                        ? { borderColor: "red", borderWidth: 0.5 }
                        : { borderWidth: 0 },
                    style,
                ]}
                placeholderTextColor={Color.colorDimgray_200}
                onChangeText={onPress}
                value={value}
            />
            {isError ? (
                <Text
                    style={{
                        marginVertical: 8,
                        marginLeft: 25,
                        color: "red",
                        alignSelf: "flex-start",
                    }}
                >
                    {error}
                </Text>
            ) : (
                <Text style={{ marginVertical: 2, color: "red" }} />
            )}
        </>
    )
);

export default function FillProfile() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "Nam", value: "Nam" },
        { label: "Nữ", value: "Nữ" },
    ]);
    const [date, setDate] = useState(new Date());
    const [open1, setOpen1] = useState(false);
    const [imageSource, setImageSource] = useState(null);
    const selectImage = useCallback(() => {
        const options = {
            storegeOptions: {
                skipBackup: true,
                path: "images",
            },
        };
        launchImageLibrary(options, (response) => {
            console.log(response);
        });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorGhostwhite }}>
            <Container width={wp(90)} style={styles.container}>
                {/* On back */}

                {/* Profile */}
                <Pressable onPress={() => selectImage()}>
                    <Image
                        source={require("../../../assets/Profile.png")}
                        style={{ width: wp(25), height: hp(13) }}
                        resizeMode="contain"
                    />
                </Pressable>
                {/* Fill Inpput */}
                <FillIP placeholder={"FullName"} />
                <FillIP placeholder={"NickName"} />
                <Pressable
                    style={[
                        styles.input,
                        { marginBottom: hp(2), flexDirection: "row", alignItems: "center" },
                    ]}
                    onPress={() => setOpen1(!open1)}
                >
                    <Calendar size={FontSize.size_mini} color={Color.colorDimgray_200} />
                    <Text
                        style={{
                            fontFamily: FontFamily.mulishBold,
                            color: Color.colorDimgray_200,
                            marginLeft: 10,
                        }}
                    >
                        {date.toString()}
                    </Text>
                </Pressable>
                <FillIP placeholder={"Email"} />
                <View
                    style={[styles.input, { flexDirection: "row", alignItems: "center" }]}
                >
                    <Image
                        source={require("./../../../assets/vietnam.png")}
                        resizeMode="contain"
                        style={{ width: wp(10), height: hp(6) }}
                    />
                    <FillIP
                        placeholder={"( +84)  724-848-1225"}
                        style={{ width: "auto" }}
                    />
                </View>

                {/* Gagrende */}
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={"Gender"}
                    style={[
                        styles.input,
                        { borderWidth: 0, marginTop: hp(2), alignSelf: "center" },
                    ]}
                />
                <DatePicker
                    mode="date"
                    modal
                    open={open1}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false);
                        setDate(date);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
                {/* Button */}
                <Button title="Continue" onPress={() => { }} />
            </Container>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        paddingVertical: hp(2),
        backgroundColor: Color.colorGhostwhite,
    },
    input: {
        width: wp(85),
        height: hp(8),
        padding: wp(3),
        backgroundColor: Color.primaryWhite,
        borderRadius: 12,
        color: Color.colorDimgray_200,
        fontFamily: FontFamily.mulishBold,
    },
});
