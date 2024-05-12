import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { Container } from '../../components/Container';
import { Rank } from './rank';
import { useSelector } from 'react-redux';
import { getRankWeek } from '../../apis/trackingQuiz';
import LoadingView from '../Auth/LoadingScreen';

const LeaderBoard = () => {
    const { t } = useTranslation();
    const [tab, setTab] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const ranking = await getRankWeek();
                setData(ranking?.data?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [tab]);

    const toggleTab = useCallback(() => setTab(!tab), [tab]);

    const PlayerItem = ({ player, index }) => (
        <View style={styles.cardClient}>
            <View style={styles.playerInfo}>
                <View style={styles.rank}>
                    <Text style={styles.rankText}>{index + 1}</Text>
                </View>
                <View style={styles.playerDetails}>
                    <Image style={styles.avatar} source={{ uri: player?.avatar }} />
                    <View>
                        <Text style={styles.playerName}>{player?.name}</Text>
                        <Text style={styles.playerPoints}>{player?.Score} points</Text>
                    </View>
                </View>
            </View>
            {/* Render medal for top 3 players */}
            {index < 3 && (
                <Image
                    source={index === 0 ? require('./../../../assets/gold.png') : index === 1 ? require('./../../../assets/sliver.png') : require('./../../../assets/Dong.png')}
                />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerTab}>
                <TouchableOpacity style={[styles.tabButton, !tab && styles.tabButtonSelected]} onPress={toggleTab}>
                    <Text style={[styles.tabButtonText, !tab && styles.tabButtonTextActive]}>{t('Badge')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, tab && styles.tabButtonSelected]} onPress={toggleTab}>
                    <Text style={[styles.tabButtonText, tab && styles.tabButtonTextActive]}>{t('Weekly')}</Text>
                </TouchableOpacity>

            </View>
            {tab ? (
                loading ? <LoadingView /> : <Container width={wp(97)} height={Platform.OS === 'ios' ? hp(80) : hp(90)} style={styles.content}>
                    {/* Render ranking list */}
                    {
                        data && data.length > 0 ? (<FlatList
                            data={data}
                            renderItem={({ item, index }) => <PlayerItem player={item} index={index} />}
                            keyExtractor={(item) => item?.userID.toString()}
                        />) : <Text style={{ textAlign: 'center', marginTop: 20, fontFamily: FontFamily.Medium, fontSize: FontSize.size_mini }}>{"Nếu bạn là người làm bài kiểm tra bạn sẽ được top 1"}</Text>
                    }
                </Container>
            ) : (
                <Rank />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.globalApp,
        width: wp(100),
        justifyContent: 'flex-end',
    },
    headerTab: {
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#a3e7ca',
        borderRadius: 40,
        justifyContent: 'space-between',
        position: 'absolute',
        top: hp(2),
    },
    content: {
        backgroundColor: Color.colorGhostwhite,
        marginBottom: hp(5),
        borderRadius: wp(5),
        bottom: -hp(10),
    },
    cardClient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
        padding: 10,
        paddingVertical: 20,
        marginTop: 20,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: Color.primaryWhite,
    },
    playerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rank: {
        width: 40,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Color.globalApp,
        borderRadius: 40,
        marginRight: 10,
    },
    rankText: {
        fontSize: 20,
        fontWeight: '600',
    },
    playerDetails: {
        flexDirection: 'row',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    playerName: {
        fontSize: 16,
        fontWeight: '600',
    },
    playerPoints: {
        color: Color.colorDimgray_100,
    },
    tabButton: {
        width: '48%',
        padding: 10,
        borderRadius: 40,
    },
    tabButtonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4c4b4b9e',
    },
    tabButtonSelected: {
        backgroundColor: Color.primaryWhite,
    },
    tabButtonTextActive: {
        color: Color.colorBlack,
    },
});

export default LeaderBoard;
