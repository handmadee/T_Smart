
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
'use strict'

import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import DatePicker from 'react-native-date-picker'
import { Calendar } from 'iconsax-react-native';
import Button from '../../components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import React, { useCallback, useState } from 'react';
import { FillIP } from '../Auth/FillProfile';


export default function EditProfile() {
    const [open1, setOpen1] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('Nam');
    const [items, setItems] = useState([
        { label: 'Nam', value: 'Nam' },
        { label: 'Nữ', value: 'Nữ' },
    ]);
    const [date, setDate] = useState(new Date('2003-10-24'));
    const [imageSource, setImageSource] = useState(null);
    const selectImage = useCallback(() => {
        const options = {
            storegeOptions: {
                skipBackup: true,
                path: 'images',
            }
        }
        launchImageLibrary(options, (response) => {
            console.log(response)
        });
    }, []);
    // State Infor
    const [fullName, setFullName] = useState('');
    const [nickName, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');



    return (
        <ScrollView style={styles.container}
            bounces={false} showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Image source={require('./../../../assets/avatar.png')} style={styles.avatar} resizeMode="cover" />
                    <Image source={require('./../../../assets/SQUARE.png')} style={styles.squareIcon} resizeMode="cover" />
                </View>
            </View>
            {/* Header */}
            <View style={{
                flexDirection: 'column', alignItems: 'center',
                width: wp(90)
            }}>


                {/* Fill Inpput */}
                <FillIP placeholder={'FullName'} value={fullName} onPress={setFullName} />
                <FillIP placeholder={'NickName'} value={nickName} onPress={setNickName} />
                <Pressable style={[styles.input, { marginBottom: hp(2), flexDirection: 'row', alignItems: 'center' }]} onPress={() => setOpen1(!open1)}>
                    <Calendar
                        size={FontSize.size_mini}
                        color={Color.colorDimgray_200}
                    />
                    <Text style={{ fontFamily: FontFamily.mulishBold, color: Color.colorDimgray_200, marginLeft: 10 }} >{date.toString()}</Text>
                </Pressable>
                <FillIP placeholder={'Email'} value={email} onPress={setEmail} />
                <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Image source={require('./../../../assets/vietnam.png')}
                        resizeMode='contain' style={{ width: wp(10), height: hp(6) }}
                    />
                    <FillIP placeholder={'( +84)  724-848-1225'} style={{ width: 'auto' }} value={phone} onPress={setPhone} />
                </View>

                {/* Gagrende */}
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={'Gender'}
                    style={[styles.input, { borderWidth: 0, marginTop: hp(2), alignSelf: 'center' }]}
                />
                <DatePicker
                    mode='date'
                    modal
                    open={open1}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            </View>
            {/* Button */}
            <Button title="Update" onPress={() => { }} />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(90),
        paddingVertical: hp(2),
        alignSelf: 'center'
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
    header: {
        alignItems: 'center',
        marginBottom: hp(2.5),
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: wp(25),
        height: wp(25),
        borderRadius: 50,
        backgroundColor: Color.colorGray_100,
        borderWidth: 5,
        borderColor: Color.globalApp,
    },
    squareIcon: {
        position: 'absolute',
        width: wp(10),
        height: wp(10),
        bottom: 0,
        right: -20,
    },
    fullName: {
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.headingH4_size,
        color: Color.colorGray_100,
        letterSpacing: 0.2,
        lineHeight: 30,
        marginVertical: hp(1),
    },
})
