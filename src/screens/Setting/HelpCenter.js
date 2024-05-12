
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Container } from "../../components/Container";
import { Color, FontFamily, FontSize } from "../../../GlobalStyles";
import { Paperclip } from "iconsax-react-native";

export default function Help() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: Color.colorGhostwhite
        }}>
            <ScrollView bounces={false}
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                <View>
                    <Text style={styles.title}>Condition & Attending</Text>
                    <Text style={styles.p}>
                        At enim hic etiam dolore. Dulce amarum, leve asperum, prope longe, stare movere, quadratum rotundum. At certe gravius. Nullus est igitur cuiusquam dies natalis. Paulum, cum regem Persem captum adduceret, eodem flumine invectio?
                    </Text>
                    <Text style={styles.p}>
                        Quare hoc videndum est, possitne nobis hoc ratio philosophorum dare.
                        Sed finge non solum callidum eum, qui aliquid improbe faciat, verum etiam praepotentem, ut M.
                        Est autem officium, quod ita factum est, ut eius facti probabilis ratio reddi possit.
                    </Text>
                </View>
                {/* Terms & UseTerms */}
                <View>
                    <Text style={styles.title}>Terms & Use</Text>
                    <Text style={styles.p}>
                        Ut proverbia non nulla veriora sint quam vestra dogmata. Tamen aberramus a proposito, et, ne longius, prorsus, inquam, Piso, si ista mala sunt, placet. Omnes enim iucundum motum, quo sensus hilaretur. Cum id fugiunt, re eadem defendunt, quae Peripatetici, verba. Quibusnam praeteritis? Portenta haec esse dicit, quidem hactenus; Si id dicis, vicimus. Qui ita affectus, beatum esse numquam probabis; Igitur neque stultorum quisquam beatus neque sapientium non beatus.
                    </Text>
                    <Text style={styles.p}>
                        Dicam, inquam, et quidem discendi causa magis, quam quo te aut Epicurum reprehensum velim. Dolor ergo, id est summum malum, metuetur semper, etiamsi non ader.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: wp(90),
        backgroundColor: Color.colorGhostwhite,
        alignSelf: 'center',
    },
    title: {
        fontFamily: FontFamily.jostBold,
        color: Color.colorGray_100,
        fontSize: FontSize.size_xl,
        letterSpacing: .2,
        marginVertical: 10
    },
    p: {
        fontFamily: FontFamily.mulishBold,
        color: Color.colorDimgray_100,
        fontSize: FontSize.size_mini,
        letterSpacing: .2,
        marginVertical: 10,
        lineHeight: 20,
        textAlign: 'left'
    }
});