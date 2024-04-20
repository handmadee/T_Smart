import React, { useCallback, useState } from 'react'
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container } from '../../components/Container'
import { useTranslation } from 'react-i18next'
import { Color } from '../../../GlobalStyles'
import { Heart, Icon } from 'iconsax-react-native'




export default function Notification12({ navigation }) {
    const { t } = useTranslation();
    const [tab, setTab] = useState(false);

    const handlerTab = useCallback(() => setTab(!tab), [tab])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorGhostwhite }}>
            <Container width={wp(90)}
                style={{
                    backgroundColor: Color.colorGhostwhite
                }}
            >
                <View style={styles.headerTab}>
                    <TouchableOpacity
                        style={[styles?.btn, !tab && styles.btnSelect]}
                        onPress={handlerTab}
                    >
                        <Text style={[styles.txtTab,
                        !tab && styles.textActive
                        ]} >{t('news')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles?.btn,
                        tab && styles.btnSelect]}
                        onPress={handlerTab}
                    >
                        <Text style={[styles.txtTab,
                        tab && styles.textActive
                        ]} >{t('notification')}</Text>
                    </TouchableOpacity>
                </View>
                {/* Select Notification */}
                {
                    !tab ? <ScrollView style={{ marginTop: hp(2), height: hp(80) }}
                        showsVerticalScrollIndicator={false}
                        bounces={false}

                    >
                        <View style={styles.itemNotification}>
                            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                                {/* Head */}
                                <View style={[styles.row]}>
                                    <View style={{
                                        width: wp(15),
                                        height: wp(15),
                                        borderRadius: wp(5)
                                    }}>
                                        <Image source={require('./../../../assets/Logo.png')} style={{
                                            width: '100%',
                                            height: '100%'
                                        }} resizeMode='cover' />
                                    </View>
                                    <View style={[styles.column]}>
                                        <Text>
                                            TSMART
                                        </Text>
                                        <Text>
                                            18/04/2024
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Heart
                                        size={20}
                                        color={Color.colorBlack}
                                    />
                                </View>
                            </View>
                            {/* Content */}
                            <Text>
                                💁👌🎍😍  Mùng 10/3 ai cũng được quà
                                Giỗ Tổ Hùng Vương 10/3 Âm lịch. Lễ hội Đền Hùng còn gọi là Giỗ Tổ Hùng Vương, là một lễ hội lớn nhằm tưởng nhớ và tỏ lòng biết ơn công lao lập nước của các vua Hùng, những vị vua đầu tiên của dân tộc
                            </Text>
                            {/* PostImage */}
                            <View style={{
                                width: wp(88),
                                maxHeight: hp(35),
                                borderRadius: wp(5),
                                alignSelf: 'center'
                            }}>
                                <Image source={require('./../../../assets/Post3.jpg')} style={{
                                    width: '100%',
                                    height: '100%'
                                }} resizeMode='cover' />
                            </View>
                        </View>
                        {/* Item 2 */}
                        <View style={styles.itemNotification}>
                            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                                {/* Head */}
                                <View style={[styles.row]}>
                                    <View style={{
                                        width: wp(15),
                                        height: wp(15),
                                        borderRadius: wp(5)
                                    }}>
                                        <Image source={require('./../../../assets/Logo.png')} style={{
                                            width: '100%',
                                            height: '100%'
                                        }} resizeMode='cover' />
                                    </View>
                                    <View style={[styles.column]}>
                                        <Text>
                                            TSMART
                                        </Text>
                                        <Text>
                                            16/04/2024
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Heart
                                        size={20}
                                        color={Color.colorBlack}
                                    />
                                </View>
                            </View>
                            {/* Content */}
                            <Text>
                                😍  Tay ải tay ai :3
                            </Text>
                            {/* PostImage */}
                            <View style={{
                                width: wp(88),
                                maxHeight: hp(35),
                                borderRadius: wp(5),
                                alignSelf: 'center'
                            }}>
                                <Image source={require('./../../../assets/Post2.jpg')} style={{
                                    width: '100%',
                                    height: '100%'
                                }} resizeMode='cover' />
                            </View>
                        </View>
                    </ScrollView> : <Text
                        style={{
                            marginTop: hp(2),
                            textAlign: 'center',
                        }}
                    >Chưa có thông báo nào gần đây </Text>
                }
                {/* Notification */}


            </Container>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        width: wp(90)
    },
    headerTab: {
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        padding: 5,
        backgroundColor: Color.colorSilver_100,
        borderRadius: 10
        , justifyContent: 'space-between'
    },
    btn: {
        width: '48%',
        padding: 10,
        borderRadius: 10
    },
    txtTab: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4c4b4b9e'
    },
    btnSelect: {
        backgroundColor: Color.primaryWhite,
    },
    textActive: {
        color: Color.colorBlack,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    itemNotification: {
        borderWidth: 0.5,
        borderColor: Color.colorSilver_100,
        padding: 10,
        marginBottom: 20
    }
})