import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { Container } from '../../components/Container';
import { Rank } from './rank';
import { useSelector } from 'react-redux';

export default function LeaderBoard() {
    const { t } = useTranslation();
    const [tab, setTab] = useState(false);

    const handlerTab = useCallback(() => setTab(!tab), [tab]);

    const PlayerItem = ({ player, index }) => (
        <View style={styles.cardClient}>
            <View style={styles.playerInfo}>
                <View style={styles.rank}>
                    <Text style={styles.rankText}>{index + 1}</Text>
                </View>
                <View style={styles.playerDetails}>
                    <Image style={styles.avatar} source={{ uri: player.avatar }} />
                    <View>
                        <Text style={styles.playerName}>{player.fullName}</Text>
                        <Text style={styles.playerPoints}>{player.point} points</Text>
                    </View>
                </View>
            </View>
            {/* Rank */}
            {index < 3 && (
                <Image
                    source={index === 0 ? require('./../../../assets/gold.png') : index === 1 ? require('./../../../assets/sliver.png') : require('./../../../assets/Dong.png')}
                />
            )}
        </View>
    );

    const data = [
        { id: 1, fullName: 'Le Quoc', avatar: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQnOl2zL8M7VIA-bSYapskEpb3Jl2HGKN_3amICS5anZq8pMObRUeVxChkVQ4ZEN7JUdmhiNd44E9mNMjw', point: 3990 },
        { id: 2, fullName: 'Huu Thien', avatar: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQnOl2zL8M7VIA-bSYapskEpb3Jl2HGKN_3amICS5anZq8pMObRUeVxChkVQ4ZEN7JUdmhiNd44E9mNMjw', point: 3890 },
        { id: 3, fullName: 'Van Dung', avatar: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQnOl2zL8M7VIA-bSYapskEpb3Jl2HGKN_3amICS5anZq8pMObRUeVxChkVQ4ZEN7JUdmhiNd44E9mNMjw', point: 3290 },
        { id: 4, fullName: 'Anh Tuan', avatar: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQnOl2zL8M7VIA-bSYapskEpb3Jl2HGKN_3amICS5anZq8pMObRUeVxChkVQ4ZEN7JUdmhiNd44E9mNMjw', point: 3190 },
        { id: 5, fullName: 'Thinh Nguyen', avatar: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQnOl2zL8M7VIA-bSYapskEpb3Jl2HGKN_3amICS5anZq8pMObRUeVxChkVQ4ZEN7JUdmhiNd44E9mNMjw', point: 2990 }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerTab}>
                <TouchableOpacity style={[styles.btn, !tab && styles.btnSelect]} onPress={handlerTab}>
                    <Text style={[styles.txtTab, !tab && styles.textActive]}>{t('Badge')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, tab && styles.btnSelect]} onPress={handlerTab}>
                    <Text style={[styles.txtTab, tab && styles.textActive]}>{t('Weekly')}</Text>
                </TouchableOpacity>
            </View>
            {tab ? (
                <Container width={wp(97)} height={hp(85)} style={styles.content}>
                    {/* Ranking */}
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => <PlayerItem player={item} index={index} />}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </Container>
            ) : (
                <Rank />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.globalApp,
        justifyContent: 'flex-end',
        width: wp(100)
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
        top: hp(2)
    },
    content: {
        backgroundColor: Color.colorGhostwhite,
        marginBottom: hp(5),
        borderRadius: wp(5),
        bottom: -hp(10)
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
        backgroundColor: Color.primaryWhite
    },
    playerInfo: {
        flexDirection: 'row',
        alignItems: 'center'
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
        marginRight: 10
    },
    rankText: {
        fontSize: 20,
        fontWeight: '600'
    },
    playerDetails: {
        flexDirection: 'row'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10
    },
    playerName: {
        fontSize: 16,
        fontWeight: '600'
    },
    playerPoints: {
        color: Color.colorDimgray_100
    },
    btn: {
        width: '48%',
        padding: 10,
        borderRadius: 40
    },
    txtTab: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4c4b4b9e'
    },
    btnSelect: {
        backgroundColor: Color.primaryWhite
    },
    textActive: {
        color: Color.colorBlack
    }
});
