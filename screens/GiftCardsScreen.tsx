import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { getNormalizedSizeWithPlatformOffset, getNormalizedVerticalSizeWithPlatformOffset } from '../utils'

export default function GiftCardsScreen() {
    return (
        <SafeAreaView>
            <View style={{ flexDirection: "row", gap: getNormalizedSizeWithPlatformOffset(16), justifyContent: "center", paddingTop: getNormalizedVerticalSizeWithPlatformOffset(24) }}>
                <View style={{ width: getNormalizedSizeWithPlatformOffset(165), borderRadius: getNormalizedSizeWithPlatformOffset(16), backgroundColor: "#fff2cf", paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(22), paddingHorizontal: getNormalizedSizeWithPlatformOffset(10), gap: getNormalizedSizeWithPlatformOffset(12) }}>
                    <View style={{ backgroundColor: "#A0A0A0", borderRadius: getNormalizedSizeWithPlatformOffset(50), paddingHorizontal: getNormalizedSizeWithPlatformOffset(4), paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(4), width: getNormalizedSizeWithPlatformOffset(32) }}>
                        <View style={{ backgroundColor: "#0D0D0D", borderRadius: getNormalizedSizeWithPlatformOffset(50), paddingHorizontal: getNormalizedSizeWithPlatformOffset(4), paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(7), width: getNormalizedSizeWithPlatformOffset(24) }}>
                            <Feather name='credit-card' size={16} color={"#fff"} />
                        </View>
                    </View>

                    <Text style={styles.head}>Sell Gift Card</Text>
                    <Text style={styles.body}>Sell local and international gift cards easily and instantly on aza.</Text>
                </View>

                <View style={{ width: getNormalizedSizeWithPlatformOffset(165), borderRadius: getNormalizedSizeWithPlatformOffset(16), backgroundColor: "#fcb3c5", paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(22), paddingHorizontal: getNormalizedSizeWithPlatformOffset(10), gap: getNormalizedSizeWithPlatformOffset(12) }}>
                    <View style={{ backgroundColor: "#A0A0A0", borderRadius: getNormalizedSizeWithPlatformOffset(50), paddingHorizontal: getNormalizedSizeWithPlatformOffset(4), paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(4), width: getNormalizedSizeWithPlatformOffset(32) }}>
                        <View style={{ backgroundColor: "#0D0D0D", borderRadius: getNormalizedSizeWithPlatformOffset(50), paddingHorizontal: getNormalizedSizeWithPlatformOffset(4), paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(7), width: getNormalizedSizeWithPlatformOffset(24) }}>
                            <Feather name='credit-card' size={16} color={"#fff"} />
                        </View>
                    </View>

                    <Text style={styles.head}>Check Pending </Text>
                    <Text style={styles.body}>Check Status of Pending gift card sale. </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    box: {
        width: getNormalizedSizeWithPlatformOffset(170),
        paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(25),
        borderRadius: getNormalizedSizeWithPlatformOffset(15),
        backgroundColor: "#fff2cf"
    },
    body: {
        fontFamily: "DMSans",
        fontSize: getNormalizedSizeWithPlatformOffset(14),
        lineHeight: getNormalizedVerticalSizeWithPlatformOffset(20),
        color: "#000"
    },
    head: {
        fontFamily: "DMSansBold",
        fontSize: getNormalizedSizeWithPlatformOffset(16),
        color: "#000"
    }
})