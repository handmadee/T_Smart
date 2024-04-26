import React, { useCallback, useEffect, useState } from 'react'
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container } from '../../components/Container'
import { useTranslation } from 'react-i18next'
import { Color, FontFamily } from '../../../GlobalStyles'
import { Heart, Icon } from 'iconsax-react-native'
import { getNews } from '../../apis/newsApi'
import LoadingView from '../Auth/LoadingScreen'



export default function Notification12({ navigation }) {

    const { t } = useTranslation();
    const [tab, setTab] = useState(false);
    const handlerTab = useCallback(() => setTab(!tab), [tab]);
    const [more, setMore] = useState(false);
    const [Notification, setNotification] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await getNews();
                console.log(response)
                setNotification(response?.data?.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, [])

    const ItemNotification = ({ imagePost = '', contentNew = '', createDate }) => {
        return (
            <View style={[styles.itemNotification]}>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    {/* Head */}
                    <View style={[styles.row, { marginBottom: hp(2) }]}>
                        <View style={{
                            width: wp(15),
                            height: wp(15),
                            borderRadius: wp(5)
                        }}>
                            <Image source={require('./../../../assets/Logo.png')} style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: wp(5),
                            }} resizeMode='cover' />
                        </View>
                        <View style={[styles.column, { marginLeft: 10 }]}>
                            <Text style={{ fontFamily: FontFamily.jostBold, color: Color.colorGray_200, }}>
                                TSMART
                            </Text>
                            <Text style={{ fontFamily: FontFamily.jostBold, color: Color.colorDimgray_100 }}>
                                {createDate}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Heart
                            size={20}
                            color={'red'}
                        />
                    </View>
                </View>
                {/* Content */}
                <Text style={{
                    fontSize: 16,
                    fontFamily: FontFamily.mulishBold
                }}>
                    {more ? contentNew.slice(0, 100) + '...' : contentNew}
                </Text>
                {
                    contentNew.length > 100 && <Text style={{
                        fontSize: 16,
                        fontFamily: FontFamily.mulishBold,
                        color: Color.globalApp
                    }} onPress={() => setMore(!more)}>
                        {more ? "Xem thêm" : "Ẩn bớt"}
                    </Text>
                }
                {/* PostImage */}
                <View style={{
                    width: wp(88),
                    maxHeight: hp(35),
                    borderRadius: wp(5),
                    alignSelf: 'center'
                }}>
                    {imagePost && <Image source={{ uri: imagePost }} style={{
                        width: '100%',
                        height: '100%'
                    }} resizeMode='cover' />}
                </View>
            </View>
        )
    }
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
                    !tab
                        ?
                        <View style={{ marginTop: hp(2), height: hp(80), borderRadius: 10 }} >
                            {
                                loading
                                    ?
                                    <LoadingView />
                                    :
                                    <FlatList
                                        data={Notification}
                                        renderItem={({ item }) => {
                                            return <ItemNotification
                                                imagePost={item?.imagePost}
                                                contentNew={item?.contentNews}
                                                createDate={item?.createdAt}
                                            />
                                        }}
                                        keyExtractor={(item, index) => index.toString()}
                                        bounces={false}
                                        showsVerticalScrollIndicator={false}
                                        maxToRenderPerBatch={5}
                                    />
                            }
                        </View>
                        :
                        <Text
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
        padding: 15,
        marginBottom: 20,
        backgroundColor: Color.primaryWhite,
    }
})