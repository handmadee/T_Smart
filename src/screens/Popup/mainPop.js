import { CloseCircle } from 'iconsax-react-native';
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PopupImage = ({ imageUri, isVisible, toggleModal }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={isVisible}
            onRequestClose={toggleModal}>
            <TouchableOpacity
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(92, 90, 90, 0.347)' }}
                activeOpacity={1}
                onPress={toggleModal}>
                <View style={{ width: wp(80), height: hp(60) }}>
                    <FastImage
                        style={{ flex: 1, borderRadius: 20 }}
                        source={{ uri: imageUri }}
                        resizeMode={FastImage.resizeMode.stretch} />
                    <TouchableOpacity
                        onPress={toggleModal}
                        style={{ position: 'absolute', top: -15, right: -15, backgroundColor: '#d8d0d0', borderRadius: 40 }}>
                        <CloseCircle size='40' color="#625e5e" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default PopupImage;
