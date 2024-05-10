import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../../../GlobalStyles';
import { Container } from '../../components/Container';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';
import { getQuizbyUser, getRankUser, getScoreUser } from '../../apis/trackingQuiz';
import LoadingView from '../Auth/LoadingScreen';

// Constants hoặc enums
const IMAGES = {
    POINS: require('./../../../assets/Poins.png'),
    LOCAL_RANK: require('./../../../assets/localRanks.png'),
    WORLD_RANK: require('./../../../assets/wordRank.png'),
    SHOW_RANK: require('./../../../assets/ShowRank.png'),
};

// Component nhỏ hơn
const UserInfo = ({ avatar, fullname }) => (
    <View style={styles.userInfoContainer}>
        <Image source={
            avatar ? { uri: avatar } : require('./../../../assets/avatar.png')
        } style={styles.avatar} />
        <Text style={styles.fullName}>{fullname}</Text>
    </View>
);

const RankItem = ({ icon, label, rank }) => (
    <View style={styles.item}>
        <Image source={icon} />
        <Text style={styles.txtScorce}>{label}</Text>
        <Text style={styles.txtRank}>{rank}</Text>
    </View>
);

const Badge = ({ game }) => (
    <View style={styles.badgeContainer}>
        <Image source={IMAGES.SHOW_RANK} style={styles.bgrImage} resizeMode='stretch' />
        <View style={styles.badgeContent}>
            <Text style={styles.badgeText}>
                Bạn đã chơi tổng cộng {game} / 30 trò chơi trong tháng này!
            </Text>
            <Progress.Circle
                progress={game / 30}
                size={wp(50)}
                borderWidth={10}
                borderColor={Color.colorGhostwhite}
                color={Color.globalApp}
                showsText={true}
                textStyle={styles.progressText}
                style={styles.progressBar}
            />
        </View>
    </View>
);

export const Rank = () => {
    const idUser = useSelector(state => state.authReducer?.authData?.id);
    const infor = useSelector(state => state.authReducer?.authData?.infor);
    const [loading, setLoading] = useState(false);
    const [poin, setPoin] = useState(0);
    const [localRank, setLocalRank] = useState(0);
    const [wordRank, setWorkRank] = useState(1473);
    const [game, setGame] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [localRankData, PoinUserData, gameData] = await Promise.all([
                    getRankUser(idUser),
                    getScoreUser(idUser),
                    getQuizbyUser(idUser)
                ]);
                setLocalRank(localRankData?.data?.data);
                setPoin(PoinUserData?.data?.data);
                setGame(gameData?.data?.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        loading ? <LoadingView /> : <Container width={wp(97)} height={hp(85)} style={styles.container}>
            <UserInfo avatar={infor?.avatar} fullname={infor?.fullname} />

            <View style={styles.cardView}>
                <RankItem icon={IMAGES.POINS} label="POINS" rank={poin} />
                <RankItem icon={IMAGES.WORLD_RANK} label="Play Rank" rank={game} />
                <RankItem icon={IMAGES.LOCAL_RANK} label="LOCAL RANK" rank={localRank} />
            </View>

            <Badge game={game} />
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.colorGhostwhite,
        borderRadius: wp(5),
        height: hp(80),
    },
    userInfoContainer: {
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: hp(25),
        top: -hp(5),
    },
    avatar: {
        width: wp(20),
        height: wp(20),
        alignSelf: 'center',
        borderRadius: wp(20),
        borderColor: Color.colorOrangered,
        borderWidth: 1,
    },
    fullName: {
        fontFamily: FontFamily.jostBold,
        fontSize: 25,
        color: Color.colorBlack,
        textAlign: 'center',
        marginTop: hp(2),
    },
    cardView: {
        backgroundColor: Color.globalApp,
        width: '95%',
        height: hp(15),
        alignSelf: 'center',
        marginTop: hp(13),
        borderRadius: wp(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        elevation: 4,
    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        width: '30%',
        paddingRight: 10,
        borderRightWidth: 0.5,
        borderRightColor: Color.colorGhostwhite,
    },
    txtScorce: {
        fontFamily: FontFamily.jostSemiBold,
        fontSize: FontSize.size_mini,
        color: Color.colorSilver_100,
        marginVertical: hp(1),
    },
    txtRank: {
        fontFamily: FontFamily.poppinsBold,
        fontSize: 20,
        color: Color.primaryWhite,
    },
    badgeContainer: {
        width: '95%',
        alignSelf: 'center',
        height: hp(50),
        borderRadius: 30,
        overflow: 'hidden',
        marginTop: hp(2),
    },
    bgrImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    badgeContent: {
        alignItems: 'center',
    },
    badgeText: {
        fontFamily: FontFamily.mulishBold,
        fontSize: 20,
        color: Color.colorGray_200,
        marginTop: hp(6),
        textAlign: 'center',
        width: '80%',
        letterSpacing: 1,
    },
    progressText: {
        color: Color.colorGray_200,
        fontSize: 20,
        fontFamily: FontFamily.mulishBold,
    },
    progressBar: {
        marginTop: hp(5),
        marginBottom: 20,
    },
});

export default Rank;
