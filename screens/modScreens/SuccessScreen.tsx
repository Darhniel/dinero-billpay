import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { getNormalizedSizeWithPlatformOffset, getNormalizedVerticalSizeWithPlatformOffset } from '../../utils';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SuccessScreen({ navigation, route }: any) {
    const { responseMessage } = route.params;
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        async function checkLoginStatus() {
            try {
                const token = await AsyncStorage.getItem("accessToken");

                if (token) {
                    setAccessToken(token)
                } else {
                    console.log("No token found!")
                    return false
                    // navigation.replace("Login")
                }
            } catch (error) {

            }
        }

        checkLoginStatus();

    }, [])

    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
            <StatusBar style={'dark'} translucent={true} hidden={false} />

            <Image source={require('../../assets/images/shield.png')} style={styles.image} />

            <View>
                <Text style={styles.heading}>Successful</Text>
                <Text style={styles.text}>{responseMessage}</Text>
            </View>

            <TouchableOpacity style={styles.submit} onPress={() => { navigation.replace("Main", { screen: "Home", params: { accessToken: accessToken } }) }} >
                <Text style={[styles.submitText, { fontWeight: 500 }]}>Done</Text>
                <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    submit: {
        flexDirection: "row",
        width: getNormalizedSizeWithPlatformOffset(345),
        marginHorizontal: "auto",
        height: getNormalizedVerticalSizeWithPlatformOffset(56),
        borderRadius: getNormalizedSizeWithPlatformOffset(8),
        backgroundColor: "#0C6599",
        justifyContent: "center",
        alignItems: "center",
        gap: getNormalizedSizeWithPlatformOffset(12),
        paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(4),
        paddingHorizontal: getNormalizedSizeWithPlatformOffset(24),
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(48)
    },
    submitText: {
        fontFamily: "DMSans",
        fontSize: getNormalizedSizeWithPlatformOffset(16),
        color: "#fff"
    },
    image: {
        width: getNormalizedSizeWithPlatformOffset(240),
        height: getNormalizedSizeWithPlatformOffset(240),
        resizeMode: "contain",
        marginBottom: getNormalizedVerticalSizeWithPlatformOffset(48)
    },
    heading: {
        fontFamily: "DMSansBold",
        fontSize: getNormalizedSizeWithPlatformOffset(32),
        color: "#333",
        marginBottom: getNormalizedVerticalSizeWithPlatformOffset(4)
    },
    text: {
        fontFamily: "DMSans",
        fontSize: getNormalizedSizeWithPlatformOffset(14),
        color: "#6A6666",
        marginBottom: getNormalizedVerticalSizeWithPlatformOffset(16)
    }
})