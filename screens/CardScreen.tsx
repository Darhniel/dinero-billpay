import { TouchableOpacity, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import CardWebView from '../components/CardWebView';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CardScreen({ navigation }: any) {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const scrollRef = useRef<KeyboardAwareScrollView>(null);


    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ isConfirmError: false, isFundError: false, isProcessing: false, isSuccess: false, responseMessage: "" });

    const [paymentUrl, setPaymentUrl] = useState<string | null>();
    async function getCardPaymentUrl() {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/v1/auth/card/add`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
                },
                redirect: "follow"
            });

            const data = await response.json();

            if (response.ok) {
                setPaymentUrl(data.responseBody.url)
                setLoading(false)
                setIsVisible(true);
            } else {
                setPaymentUrl(null)
                setLoading(false)
            }
        } catch (error) {
            if (error == "TypeError: Network request failed") {
                setStatus(prevState => ({ ...prevState, isFundError: true, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        getCardPaymentUrl()
    }, []);

    if (paymentUrl) {
        return (
            <>
                <CardWebView url={paymentUrl} />
            </>
        )
    }

    return (
        <>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        fontFamily: "DMSansBold",
        fontSize: scale(16),
        color: "#333",
        marginTop: scale(24),
        marginLeft: scale(24)
    },
    verifyBox: {
        marginHorizontal: "auto",
        backgroundColor: "#B6DEF6",
        paddingVertical: moderateVerticalScale(8),
        paddingHorizontal: moderateScale(8),
        width: scale(320),
        marginTop: verticalScale(8)
    },
    label: {
        fontSize: scale(12),
        fontFamily: "DMSans",
        marginLeft: scale(24),
    },
    input: {
        borderStyle: "solid",
        borderWidth: scale(1),
        borderColor: "#D5D8DE",
        marginHorizontal: "auto",
        borderRadius: scale(8),
        marginTop: verticalScale(4),
        padding: moderateScale(8),
        fontFamily: "DMSans",
        width: scale(320),
        height: verticalScale(45),
    },
    submit: {
        flexDirection: "row",
        width: scale(320),
        marginHorizontal: "auto",
        height: verticalScale(45),
        borderRadius: scale(8),
        backgroundColor: "#0C6599",
        justifyContent: "center",
        alignItems: "center",
        gap: scale(12),
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(24),
        marginTop: verticalScale(12)
    },
    submitText: {
        fontFamily: "DMSans",
        fontSize: scale(16),
        color: "#fff"
    },
})