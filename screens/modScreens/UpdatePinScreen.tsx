import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons'
import SegmentedInput from '../../components/CodeInput'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Modal from 'react-native-modal'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function UpdatePinScreen({ navigation, route }: any) {
    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const scrollToInput = (reactNode: any) => {
        if (reactNode) {
            scrollRef.current?.scrollToFocusedInput(reactNode);
        }
    };

    const [disabled, setDisabled] = useState(true);
    const [code, setCode] = useState('');
    const [confirmCode, setConfirmCode] = useState('');
    const [isVisible, setIsVisible] = useState({ isSuccess: false, isError: false, loading: false, responseMessage: "" });

    const { isSuccess, isError, loading, responseMessage } = isVisible

    useEffect(() => {
        function validForm() {
            return (
                (code.length === 4 && confirmCode.length === 4) &&
                (code === confirmCode)
            )
        };

        setDisabled(!validForm());
    });

    async function updatePin() {
        setIsVisible({ isError: false, isSuccess: false, loading: true, responseMessage: "" });

        const userPin = {
            pin: code,
            pin_confirm: confirmCode
        };
        try {
            const response = await fetch('https://dinero-backend-production.up.railway.app/api/v1/auth/profile/pin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(userPin),
            });

            const data = await response.json();

            if (response.ok) {
                setIsVisible(prevState => ({ ...prevState, loading: false, isSuccess: true, responseMessage: data.responseMessage }));
            } else {
                setIsVisible(prevState => ({ ...prevState, isError: true, loading: false, responseMessage: data.responseMessage }));
            }
        } catch (error) {
            if (error == "TypeError: Network request failed") {
                setIsVisible(prevState => ({ ...prevState, isError: true, loading: false, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
            }
        }
    }

    return (
        <KeyboardAwareScrollView style={styles.container} ref={scrollRef} keyboardShouldPersistTaps="handled">
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <Text style={styles.heading}>Kindly set your transaction pin</Text>

            <View style={styles.verifyBox}>
                <Feather
                    name='info'
                    color={"#0C6599"}
                    style={{ marginBottom: verticalScale(8) }}
                />
                <Text style={{ color: "#0C6599", fontFamily: "DMSans" }}>
                    A transaction PIN helps keep your transaction safe and secure from fraud. Please do not share your PIN.
                </Text>
            </View>

            <View style={styles.codeBox}>
                <Text style={[styles.codeHeading, { fontWeight: 500 }]}>Transaction Pin</Text>
                <SegmentedInput length={4} onChange={setCode} />
            </View>
            <View style={styles.codeBox}>
                <Text style={[styles.codeHeading, { fontWeight: 500 }]}>Confirm Transaction Pin</Text>
                <SegmentedInput length={4} onChange={setConfirmCode} />
            </View>

            <TouchableOpacity style={[styles.submit, disabled ? { backgroundColor: "grey" } : {}]} onPress={() => { updatePin() }} disabled={disabled} >
                <Text style={[styles.submitText, { fontWeight: 500 }]}>Next</Text>
                <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>

            <Modal isVisible={loading} animationIn={'bounceInUp'} animationInTiming={1000}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={48} color={"#1734B9"} />
                </View>
            </Modal>

            <Modal isVisible={isError} animationIn={'bounceInUp'} animationInTiming={1000}>
                <View style={[styles.modal, { alignItems: "center", flex: 2 / 5, borderRadius: scale(20) }]}>
                    <Image source={require('../../assets/images/error-icon.png')} style={{ width: moderateScale(80), height: moderateVerticalScale(80) }} />
                    <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                        Error!
                    </Text>
                    <Text style={styles.modalText}>
                        {responseMessage}
                    </Text>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setIsVisible({ isError: false, isSuccess: false, loading: false, responseMessage: "" });
                        }}
                    >
                        <Text style={[styles.submitText, { fontWeight: 500 }]}>
                            Try Again
                        </Text>
                        <Feather name='arrow-right' size={24} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal isVisible={isSuccess} animationIn={'bounceInUp'} animationInTiming={1000}>
                <View style={[styles.modal, { alignItems: "center", flex: 2 / 5 }]}>
                    <Image source={require('../../assets/images/shield.png')} />
                    <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                        Success
                    </Text>
                    <Text style={styles.modalText}>
                        {responseMessage}
                    </Text>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setIsVisible({ isError: false, isSuccess: false, loading: false, responseMessage: "" });
                            navigation.reset({ index: 0, routes: [{ name: "Main", params: { screen: "Home" } }] })
                        }}
                    >
                        <Text style={[styles.submitText, { fontWeight: 500 }]}>
                            Go to home
                        </Text>
                        <Feather name='arrow-right' size={24} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        fontFamily: "DMSansBold",
        fontSize: scale(16),
        color: "#333",
        marginTop: scale(32),
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
    codeBox: {
        paddingVertical: moderateVerticalScale(8),
        paddingHorizontal: moderateScale(8),
        width: scale(320),
        marginHorizontal: "auto"
    },
    codeHeading: {
        fontSize: scale(16),
        fontFamily: "DMSansBold",
        color: "#333333",
        marginTop: scale(20)
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
        marginTop: verticalScale(24)
    },
    submitText: {
        fontFamily: "DMSans",
        fontSize: scale(16),
        color: "#fff"
    },
    modal: {
        flex: 1 / 4,
        backgroundColor: "#fff",
        paddingVertical: moderateVerticalScale(16),
        paddingHorizontal: moderateScale(16),
        justifyContent: "center",
    },
    modalHeading: {
        fontFamily: "DMSansBold",
        textAlign: "center",
        fontSize: scale(20),
        color: "#333333"
    },
    modalText: {
        fontSize: scale(12),
        fontFamily: "DMSans",
        color: "#6A6666",
        textAlign: "center"
    },
    modalButton: {
        flexDirection: "row",
        width: "auto",
        marginHorizontal: "auto",
        height: verticalScale(48),
        borderRadius: scale(8),
        backgroundColor: "#0C6599",
        justifyContent: "center",
        alignItems: "center",
        gap: scale(8),
        paddingVertical: moderateVerticalScale(4),
        paddingHorizontal: moderateScale(24),
        marginTop: verticalScale(24)
    },
})