import { SafeAreaView, Text, TouchableOpacity, View, Image, Linking, Alert } from 'react-native'
import React, { useState } from 'react'
import { Feather, FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function ContactUsScreen() {
    const handlePress = async () => {
        const url = `mailto:contact@dineropay.com`;

        // Check if the URL can be opened
        const canOpen = await Linking.canOpenURL(url);

        if (canOpen) {
            // Open the email app
            Linking.openURL(url);
        } else {
            // If the URL can't be opened, show an alert
            Alert.alert('Error', 'Unable to open email app');
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: "#F5F5F5", flex: 1 }}>
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <View style={{ borderTopLeftRadius: scale(10), borderTopRightRadius: scale(10), backgroundColor: "#fff", marginTop: verticalScale(24), width: scale(320), marginHorizontal: "auto" }}>
                <TouchableOpacity
                    style={{ width: scale(280), marginHorizontal: "auto", borderBottomWidth: scale(1.5), borderColor: "#B2AEB0", height: verticalScale(42), justifyContent: "center" }}>

                    <View style={{ flexDirection: "row", alignItems: "center", gap:scale(8) }}>
                        <View style={{ width: scale(34), height: verticalScale(24), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(9), paddingVertical: moderateVerticalScale(11), borderRadius: scale(50) }}>
                            <Feather name='phone-call' color={"#2D264B"} size={18} />
                        </View>
                        <Text style={{
                            fontFamily: "DMSansBold",
                            fontSize: scale(14),
                            color: "#333",
                        }}>+234 DINEROPAY</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flexDirection: "row", width: scale(320), marginHorizontal: "auto", justifyContent: "space-between", alignItems: "center", height: verticalScale(65) }}
                    onPress={() => { handlePress() }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
                        <View style={{ width: scale(34), height: verticalScale(40), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(9), paddingVertical: moderateVerticalScale(11), borderRadius: scale(50) }}>
                            <Feather name='mail' color={"#2D264B"} size={18} />
                        </View>
                        <Text style={{
                            fontFamily: "DMSansBold",
                            fontSize: scale(14),
                            color: "#333",
                        }}>contact@dineropay.com</Text>
                    </View>

                    <Feather name={'chevron-right'} color={"black"} size={24} style={{ marginRight: scale(15) }} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={{ width: scale(340), marginHorizontal: "auto", height: verticalScale(65), justifyContent: "center", borderTopLeftRadius: scale(10), borderTopRightRadius: scale(10), backgroundColor: "#fff", marginTop: verticalScale(64), paddingLeft: moderateScale(12) }}>

                <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
                    <View style={{ width: scale(34), height: verticalScale(40), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(9), paddingVertical: moderateVerticalScale(11), borderRadius: scale(50) }}>
                        <FontAwesome name='facebook' color={"#2D264B"} size={18} />
                    </View>
                    <Text style={{
                        fontFamily: "DMSansBold",
                        fontSize: scale(14),
                        color: "#333",
                    }}>Facebook</Text>
                </View>

            </TouchableOpacity>
            
            <TouchableOpacity
                style={{ width: scale(340), marginHorizontal: "auto", height: verticalScale(65), justifyContent: "center", borderTopLeftRadius: scale(10), borderTopRightRadius: scale(10), backgroundColor: "#fff", marginTop: verticalScale(8), paddingLeft: moderateScale(12) }}>

                <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
                    <View style={{ width: scale(34), height: verticalScale(40), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(9), paddingVertical: moderateVerticalScale(11), borderRadius: scale(50) }}>
                        <FontAwesome name='instagram' color={"#2D264B"} size={18} />
                    </View>
                    <Text style={{
                        fontFamily: "DMSansBold",
                        fontSize: scale(14),
                        color: "#333",
                    }}>Instagram</Text>
                </View>

            </TouchableOpacity>

            <TouchableOpacity
                style={{ width: scale(340), marginHorizontal: "auto", height: verticalScale(65), justifyContent: "center", borderTopLeftRadius: scale(10), borderTopRightRadius: scale(10), backgroundColor: "#fff", marginTop: verticalScale(8), paddingLeft: moderateScale(12) }}>

                <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
                    <View style={{ width: scale(34), height: verticalScale(40), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(9), paddingVertical: moderateVerticalScale(11), borderRadius: scale(50) }}>
                        <Image source={require('../assets/images/x.png')} />
                    </View>
                    <Text style={{
                        fontFamily: "DMSansBold",
                        fontSize: scale(14),
                        color: "#333",
                    }}>Twitter</Text>
                </View>

            </TouchableOpacity>

        </SafeAreaView>
    )
};