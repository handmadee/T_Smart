/* eslint-disable prettier/prettier */
import React, { useCallback, useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from "../../../GlobalStyles";
import { Container } from "../../components/Container";
import { RowComponent } from "../../components/RowComponent";
import {
    EmptyWallet,
    User,
    Notification,
    SecurityUser,
    LanguageSquare,
    MessageQuestion,
    Logout,
    ArrowRight2,
    Colorfilter
} from "iconsax-react-native";
import { useTranslation } from 'react-i18next';
import SpecialOfferSwitch from '../../contanst/Switch';
import auth from '@react-native-firebase/auth';



const ProfileSetting = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const [vn, setVN] = useState(true);
    const [dark, setTheme] = useState(false);

    const VNN = require('./../../../assets/vietnam.png');
    const EV = require('./../../../assets/england.png');
    const mon = require('./../../../assets/mon.png');
    const sun = require('./../../../assets/sun.png');

    const settingsData = [
        { icon: <User size="17" color={Color.colorGray_100} />, text: t('edit'), onPress: "EditProfile1" },
        { icon: <EmptyWallet size="17" color={Color.colorGray_100} />, text: t('payment') },
        { icon: <SecurityUser size="17" color={Color.colorGray_100} />, text: t('security'), onPress: "Security" },
        { icon: <Notification size="17" color={Color.colorGray_100} />, text: t('Notification'), onPress: "EditProfile" },
        { icon: <MessageQuestion size="17" color={Color.colorGray_100} />, text: t('help'), onPress: "Help" },
        // { icon: <Notification size="17" color={Color.colorGray_100} />, text: t('notification'), onPress: "Notification" },
        // { icon: <Logout size="17" color={Color.colorGray_100} />, text: t('log') }
    ];
    const handlerSetLanguage = () => {
        setVN(!vn);
        i18n.changeLanguage(vn ? 'en' : 'vn');
    }
    const togglesetDarktheme = useCallback(() => {
        setTheme(!dark);
    })
    const navigateTo = useCallback((screen) => {
        navigation.navigate(screen);
    }, [navigation]);

    const logOut = useCallback(() => {
        auth()
            .signOut()
            .then(() => navigation.navigate('LetsAuth'));
    }, [])

    const Header = React.memo(() => {
        return (
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Image source={require('./../../../assets/avatar.png')} style={styles.avatar} resizeMode="cover" />
                    <Image source={require('./../../../assets/SQUARE.png')} style={styles.squareIcon} resizeMode="cover" />
                </View>
                <Text style={styles.fullName}>
                    Dat (FPT)
                </Text>
            </View>
        )
    });

    return (
        <SafeAreaView style={styles.container}>
            <Container style={styles.container}>
                <View style={styles.contentContainer}>
                    {/* Header */}
                    <Header />
                    {/* Settings */}
                    <View style={styles.settingsContainer}>
                        {settingsData.map((item, index) => (
                            <SettingsItem key={index} icon={item.icon} text={item.text} onPress={() => navigateTo(item.onPress)} />
                        ))}
                        {/* Switch  */}
                        <Pressable onPress={handlerSetLanguage} >
                            <RowComponent style={styles.item}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <LanguageSquare size="17" color={Color.colorGray_100} />
                                    <Text style={[styles.tIcon, { marginLeft: 15 }]}>{t('language')}</Text>
                                    {/* iMG */}
                                </View>
                                <Image source={vn ? VNN : EV} style={{ width: '10%', height: '100%' }} resizeMode="cover" />

                            </RowComponent>
                        </Pressable>
                        {/* Dark theme */}
                        <Pressable onPress={togglesetDarktheme}  >
                            <RowComponent style={styles.item}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Colorfilter size="17" color={Color.colorGray_100} />
                                    <Text style={[styles.tIcon, { marginLeft: 15 }]}>{t('Dark theme')}</Text>
                                </View>
                                <Image source={dark ? mon : sun} style={{ width: '10%', height: '100%' }} resizeMode="cover" />
                            </RowComponent>
                        </Pressable>



                        {/* Logout */}
                        <SettingsItem icon={<Logout size="17" color={Color.colorGray_100} />} text={t('log')} onPress={logOut} />
                    </View>
                </View>
            </Container>
        </SafeAreaView>
    );
};

const SettingsItem = ({ icon, text, onPress }) => (
    <Pressable onPress={onPress}>
        <RowComponent style={styles.item}>
            <View style={styles.itemContent}>
                {icon}
                <Text style={[styles.tIcon, { marginLeft: 15 }]}>{text}</Text>
            </View>
            <ArrowRight2 size="17" color={Color.colorGray_100} variant="Outline" />
        </RowComponent>
    </Pressable>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.colorGhostwhite,
        justifyContent: 'center',
    },
    contentContainer: {
        flexDirection: 'column',
        alignItems: 'center',

    },
    header: {
        alignItems: 'center',
        marginBottom: hp(2),
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
    settingsContainer: {
        width: wp(85),
        backgroundColor: Color.primaryWhite,
        padding: 10,
        borderRadius: 20,
    },
    item: {
        width: '100%',
        justifyContent: 'space-between',
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        color: Color.colorGray_100,
    },
    tIcon: {
        fontFamily: FontFamily.mulishBold,
        fontSize: FontSize.size_mini,
        color: Color.colorGray_100,
    }
});

export default ProfileSetting;
