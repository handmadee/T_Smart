'use strict';

import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export function Tag({ title = '', status = false, onPress }) {
  const styles = StyleSheet.create({
    tag: {
      maxWidth: wp(35),
      height: hp(5),
      backgroundColor: status ? Color.globalApp : Color.colorAliceblue,
      borderRadius: 15,
      marginRight: 20,
      paddingHorizontal: 10,
    },
    textTag: {
      fontFamily: FontFamily.mulishBold,
      fontSize: FontSize.size_smi,
      color: status ? Color.primaryWhite : Color.colorGray_100,
      alignSelf: 'center',
      lineHeight: hp(5),
    },
  });
  return (
    <Pressable style={styles.tag} onPress={onPress}>
      <Text style={styles.textTag}>{title}</Text>
    </Pressable>
  );
}
